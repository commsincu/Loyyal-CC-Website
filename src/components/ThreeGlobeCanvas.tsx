import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface ThreeGlobeCanvasProps {
  themeColor?: 'sapphire' | 'cyan' | 'navy' | 'cobalt';
  autoRotate?: boolean;
  rotationSpeed?: number;
  activeCoordinates?: { lat: number; lng: number } | null;
  onHotspotClick?: (name: string, lat: number, lng: number) => void;
  className?: string;
}

// Convert Lat/Lng to Vector3 on sphere of given radius
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Generate 3D curved arc points between two lat/lng points
function createCurvedArcPoints(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
  radius: number,
  maxElevation = 1.25
): THREE.Vector3[] {
  const startVec = latLngToVector3(startLat, startLng, radius);
  const endVec = latLngToVector3(endLat, endLng, radius);
  
  // Midpoint between start and end
  const midVec = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
  // Scale midpoint out away from center for 3D arch height
  const distance = startVec.distanceTo(endVec);
  const midLength = radius + (distance * 0.25) * maxElevation;
  midVec.normalize().multiplyScalar(midLength);

  const curve = new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);
  return curve.getPoints(50);
}

export const ThreeGlobeCanvas: React.FC<ThreeGlobeCanvasProps> = ({
  themeColor = 'sapphire',
  autoRotate = true,
  rotationSpeed = 0.6,
  activeCoordinates,
  onHotspotClick,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  
  // Drag State
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const reqAnimFrameRef = useRef<number | null>(null);

  // Color schemes based on props
  const colorPalettes = {
    sapphire: {
      core: 0x1d4ed8, // Vibrant royal blue
      dots: 0x60a5fa, // Bright light blue
      atmosphere: 0x3b82f6,
      arcs: 0x38bdf8,
      pin: 0x38bdf8,
    },
    cyan: {
      core: 0x0284c7, // Sky/Cyan blue
      dots: 0x38bdf8,
      atmosphere: 0x0ea5e9,
      arcs: 0x67e8f9,
      pin: 0x22d3ee,
    },
    navy: {
      core: 0x0f172a, // Deep midnight navy
      dots: 0x3b82f6,
      atmosphere: 0x1e3a8a,
      arcs: 0x60a5fa,
      pin: 0x60a5fa,
    },
    cobalt: {
      core: 0x1e40af, // Deep cobalt
      dots: 0x93c5fd,
      atmosphere: 0x2563eb,
      arcs: 0x60a5fa,
      pin: 0xf43f5e,
    },
  };

  const palette = colorPalettes[themeColor] || colorPalettes.sapphire;

  // Rotate globe smoothly towards specific coordinates
  const rotateToCoordinates = useCallback((lat: number, lng: number) => {
    if (!globeGroupRef.current) return;

    // Target rotation angles in radians
    const targetY = -(lng + 90) * (Math.PI / 180);
    const targetX = lat * (Math.PI / 180) * 0.5; // Slight tilt

    gsap.to(globeGroupRef.current.rotation, {
      y: targetY,
      x: targetX,
      duration: 1.5,
      ease: 'power3.out',
    });
  }, []);

  useEffect(() => {
    if (activeCoordinates) {
      rotateToCoordinates(activeCoordinates.lat, activeCoordinates.lng);
    }
  }, [activeCoordinates, rotateToCoordinates]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.debug.checkShaderErrors = false;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(10, 15, 20);
    scene.add(dirLight1);

    const blueLight = new THREE.PointLight(palette.dots, 2.5, 30);
    blueLight.position.set(-10, -10, 10);
    scene.add(blueLight);

    // 5. Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    const GLOBE_RADIUS = 5.5;

    // 5a. Core Globe Sphere
    const globeGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const globeMat = new THREE.MeshPhongMaterial({
      color: palette.core,
      emissive: palette.core,
      emissiveIntensity: 0.15,
      shininess: 30,
      specular: 0xffffff,
      transparent: true,
      opacity: 0.94,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    // 5b. Atmospheric Outer Glow
    const atmosGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.08, 48, 48);
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.2);
          gl_FragColor = vec4(${new THREE.Color(palette.atmosphere).r}, ${new THREE.Color(palette.atmosphere).g}, ${new THREE.Color(palette.atmosphere).b}, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    globeGroup.add(atmosMesh);

    // 5c. Dot Matrix World Map Generation
    const dotCount = 4500;
    const dotPositions: number[] = [];
    const dotSizes: number[] = [];

    // Dense Fibonnaci Spiral point distribution on sphere surface
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < dotCount; i++) {
      const y = 1 - (i / (dotCount - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // Radius at y
      const theta = phi * i; // Golden angle increment

      const lat = Math.asin(y) * (180 / Math.PI);
      const lng = (theta % (2 * Math.PI)) * (180 / Math.PI) - 180;

      // Filter points rough landmass mask (simulated continents logic for fast crisp WebGL without image assets)
      const isLand = checkLandmass(lat, lng);

      if (isLand) {
        const vec = latLngToVector3(lat, lng, GLOBE_RADIUS * 1.015);
        dotPositions.push(vec.x, vec.y, vec.z);
        dotSizes.push(Math.random() > 0.85 ? 0.08 : 0.045);
      }
    }

    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));
    
    // Points material for landmass dots
    const dotMat = new THREE.PointsMaterial({
      color: palette.dots,
      size: 0.12,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });
    const dotsMesh = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(dotsMesh);

    // 5d. Grid Ring Wireframes (Latitude & Longitude)
    const gridGeo = new THREE.WireframeGeometry(new THREE.SphereGeometry(GLOBE_RADIUS * 1.008, 18, 12));
    const gridMat = new THREE.LineBasicMaterial({
      color: palette.dots,
      transparent: true,
      opacity: 0.08,
    });
    const gridMesh = new THREE.LineSegments(gridGeo, gridMat);
    globeGroup.add(gridMesh);

    // 5e. Global Hotspot Pins & Arcs
    const hotspots = [
      { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
      { name: 'Abu Dhabi', lat: 24.4539, lng: 54.3773 },
      { name: 'London', lat: 51.5074, lng: -0.1278 },
      { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
      { name: 'New Delhi', lat: 28.6139, lng: 77.2090 },
      { name: 'New York', lat: 40.7128, lng: -74.0060 },
      { name: 'Riyadh', lat: 24.7136, lng: 46.6753 },
      { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
    ];

    const pinGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const pinMat = new THREE.MeshBasicMaterial({ color: palette.pin });

    const ringGeo = new THREE.RingGeometry(0.15, 0.22, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: palette.pin,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });

    const pulsingRings: THREE.Mesh[] = [];

    hotspots.forEach((spot) => {
      const pos = latLngToVector3(spot.lat, spot.lng, GLOBE_RADIUS * 1.025);
      
      // Marker Pin
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      pinMesh.userData = spot;
      globeGroup.add(pinMesh);

      // Pulsing Ring
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos);
      ringMesh.lookAt(new THREE.Vector3(0, 0, 0)); // Align with globe surface
      globeGroup.add(ringMesh);
      pulsingRings.push(ringMesh);
    });

    // Connecting Arcs (Dubai -> London, Dubai -> Singapore, London -> NY, Dubai -> New Delhi)
    const arcConnections = [
      { from: hotspots[0], to: hotspots[2] }, // Dubai -> London
      { from: hotspots[0], to: hotspots[3] }, // Dubai -> Singapore
      { from: hotspots[0], to: hotspots[4] }, // Dubai -> New Delhi
      { from: hotspots[2], to: hotspots[5] }, // London -> New York
      { from: hotspots[0], to: hotspots[6] }, // Dubai -> Riyadh
    ];

    arcConnections.forEach((conn) => {
      const points = createCurvedArcPoints(
        conn.from.lat,
        conn.from.lng,
        conn.to.lat,
        conn.to.lng,
        GLOBE_RADIUS * 1.02
      );
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: palette.arcs,
        transparent: true,
        opacity: 0.6,
        linewidth: 2,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(arcLine);
    });

    // 6. Mouse/Touch Drag Controls
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !globeGroupRef.current) return;

      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      velocityRef.current = { x: deltaY * 0.005, y: deltaX * 0.005 };

      globeGroupRef.current.rotation.y += velocityRef.current.y;
      globeGroupRef.current.rotation.x += velocityRef.current.x;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !globeGroupRef.current || e.touches.length !== 1) return;

      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      velocityRef.current = { x: deltaY * 0.005, y: deltaX * 0.005 };

      globeGroupRef.current.rotation.y += velocityRef.current.y;
      globeGroupRef.current.rotation.x += velocityRef.current.x;

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const domEl = container;
    domEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domEl.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // 7. Render Loop
    let clock = new THREE.Clock();

    const animate = () => {
      reqAnimFrameRef.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      if (globeGroupRef.current) {
        if (!isDraggingRef.current) {
          // Damping inertia
          velocityRef.current.x *= 0.95;
          velocityRef.current.y *= 0.95;

          globeGroupRef.current.rotation.y += velocityRef.current.y;
          globeGroupRef.current.rotation.x += velocityRef.current.x;

          // Auto-rotation if enabled and not currently dragging
          if (autoRotate && Math.abs(velocityRef.current.y) < 0.001) {
            globeGroupRef.current.rotation.y += 0.0015 * rotationSpeed;
          }
        }

        // Animate pulsing rings
        const time = clock.getElapsedTime();
        pulsingRings.forEach((ring, i) => {
          const scale = 1 + Math.sin(time * 3 + i) * 0.35;
          ring.scale.set(scale, scale, 1);
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;

      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();

      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (reqAnimFrameRef.current) cancelAnimationFrame(reqAnimFrameRef.current);
      window.removeEventListener('resize', handleResize);

      domEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domEl.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
      }
      scene.clear();
    };
  }, [themeColor, autoRotate, rotationSpeed, palette]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
    />
  );
};

// Simplified landmass checking function for realistic continent distribution
function checkLandmass(lat: number, lng: number): boolean {
  // North America
  if (lat > 15 && lat < 70 && lng > -165 && lng < -50) return Math.random() < 0.65;
  // South America
  if (lat > -55 && lat < 12 && lng > -80 && lng < -35) return Math.random() < 0.6;
  // Europe
  if (lat > 35 && lat < 70 && lng > -10 && lng < 40) return Math.random() < 0.75;
  // Africa
  if (lat > -35 && lat < 37 && lng > -18 && lng < 52) return Math.random() < 0.7;
  // Asia / Middle East
  if (lat > 5 && lat < 70 && lng > 35 && lng < 145) return Math.random() < 0.72;
  // Australia
  if (lat > -42 && lat < -10 && lng > 110 && lng < 155) return Math.random() < 0.6;
  // UK / Islands
  if (lat > 50 && lat < 60 && lng > -10 && lng < 2) return Math.random() < 0.8;
  
  return false;
}
