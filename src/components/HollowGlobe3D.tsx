import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ZoomIn, ZoomOut, RotateCcw, Sparkles, Globe, Loader2 } from 'lucide-react';

interface HollowGlobe3DProps {
  autoRotate?: boolean;
  rotationSpeed?: number;
  focusedCoordinates?: { lat: number; lng: number } | null;
}

// Convert Lat/Lng to Vector3 on a sphere of radius R
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Precise Continent Polygons for World Landmasses
const CONTINENTS_POLYGONS: [number, number][][] = [
  // North America & Canada
  [
    [-168, 65], [-165, 72], [-140, 70], [-120, 75], [-80, 74], [-60, 60],
    [-55, 48], [-65, 44], [-70, 41], [-75, 35], [-80, 25], [-90, 16],
    [-97, 26], [-105, 20], [-117, 32], [-124, 48], [-135, 57], [-150, 60]
  ],
  // Greenland
  [
    [-55, 60], [-45, 60], [-20, 78], [-30, 83], [-55, 82], [-70, 76]
  ],
  // Central America
  [
    [-117, 32], [-105, 20], [-90, 16], [-83, 8], [-77, 8], [-88, 15], [-105, 22]
  ],
  // South America
  [
    [-77, 8], [-60, 10], [-50, 0], [-35, -5], [-35, -18], [-42, -23],
    [-50, -34], [-68, -55], [-75, -48], [-72, -38], [-70, -18], [-80, -2], [-77, 8]
  ],
  // Africa
  [
    [-17, 35], [-5, 36], [10, 37], [25, 32], [32, 31], [33, 28], [43, 12],
    [51, 11], [42, 0], [40, -12], [35, -25], [20, -35], [15, -35], [12, -15],
    [8, 4], [-15, 12], [-17, 35]
  ],
  // Madagascar
  [
    [43, -12], [50, -12], [47, -25], [43, -25]
  ],
  // Europe
  [
    [-10, 36], [0, 38], [10, 44], [15, 38], [25, 35], [30, 41], [30, 46],
    [40, 43], [40, 55], [30, 60], [20, 55], [5, 48], [-5, 44], [-10, 36]
  ],
  // Scandinavia
  [
    [5, 58], [10, 55], [20, 55], [30, 70], [20, 71], [10, 63], [5, 58]
  ],
  // UK & Ireland
  [
    [-10, 50], [-2, 50], [-1, 59], [-6, 59], [-10, 54]
  ],
  // Arabian Peninsula & Middle East
  [
    [34, 28], [45, 30], [55, 25], [60, 22], [55, 16], [45, 12], [43, 12], [35, 20], [34, 28]
  ],
  // Anatolia & Levant
  [
    [26, 41], [36, 41], [44, 38], [48, 30], [35, 30], [26, 40]
  ],
  // India & South Asia
  [
    [68, 24], [78, 31], [88, 22], [80, 8], [73, 15], [68, 24]
  ],
  // East & North Asia (China, Russia/Siberia, Mongolia)
  [
    [48, 30], [60, 30], [70, 20], [100, 20], [120, 25], [120, 40], [140, 50],
    [170, 65], [180, 70], [100, 78], [60, 70], [40, 55], [48, 30]
  ],
  // SE Asia (Indochina, Thailand, Vietnam)
  [
    [98, 20], [108, 22], [108, 10], [100, 6], [98, 20]
  ],
  // Japan
  [
    [130, 31], [142, 44], [145, 44], [132, 32], [130, 31]
  ],
  // Indonesia, Malaysia & Philippines
  [
    [95, -5], [118, -8], [125, 5], [125, 18], [115, 15], [105, 0], [95, -5]
  ],
  // Australia
  [
    [113, -22], [130, -12], [142, -11], [153, -28], [150, -38], [138, -35], [115, -35], [113, -22]
  ],
  // New Zealand
  [
    [166, -47], [178, -34], [175, -41], [166, -47]
  ],
  // Iceland
  [
    [-24, 63], [-13, 65], [-14, 66], [-22, 66]
  ],
  // Sri Lanka
  [
    [79, 10], [82, 10], [81, 6], [79, 6]
  ]
];

// Create an offscreen landmask raster function
function createLandMask(): (lat: number, lng: number) => boolean {
  if (typeof document === 'undefined') return () => false;

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => false;

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 1024, 512);

  ctx.fillStyle = '#FFFFFF';

  CONTINENTS_POLYGONS.forEach((polygon) => {
    ctx.beginPath();
    polygon.forEach(([lng, lat], idx) => {
      const x = ((lng + 180) / 360) * 1024;
      const y = ((90 - lat) / 180) * 512;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
  });

  const imgData = ctx.getImageData(0, 0, 1024, 512);
  const data = imgData.data;

  return (lat: number, lng: number) => {
    const x = Math.floor(((lng + 180) / 360) * 1024);
    const y = Math.floor(((90 - lat) / 180) * 512);
    if (x < 0 || x >= 1024 || y < 0 || y >= 512) return false;

    const idx = (y * 1024 + x) * 4;
    return data[idx] > 128; // White pixel = landmass
  };
}

// Get vibrant continent color based on lat/lng geographic regions
function getContinentColor(lat: number, lng: number): THREE.Color {
  // 1. North America & Greenland (Yellow / Gold)
  if (lat >= 12 && lng >= -170 && lng <= -30) {
    return new THREE.Color(0xfacc15);
  }
  // 2. South America (Coral Red)
  if (lat < 12 && lng >= -100 && lng <= -30) {
    return new THREE.Color(0xf43f5e);
  }
  // 3. Europe, Scandinavia, UK, Iceland (Royal Purple)
  if (lat >= 35 && lng >= -25 && lng <= 42) {
    return new THREE.Color(0xa855f7);
  }
  // 4. Africa & Madagascar (Emerald Green)
  if (lat < 35 && lat >= -38 && lng >= -25 && lng <= 52) {
    return new THREE.Color(0x10b981);
  }
  // 5. Middle East & Arabian Peninsula (Electric Cyan)
  if (lat >= 12 && lat < 42 && lng >= 34 && lng <= 62) {
    return new THREE.Color(0x06b6d4);
  }
  // 6. South Asia / India & Sri Lanka (Electric Orange)
  if (lat >= 5 && lat < 35 && lng >= 65 && lng <= 90) {
    return new THREE.Color(0xf97316);
  }
  // 7. Australia & New Zealand / Oceania (Neon Lime Green)
  if (lat <= -11 && lng >= 110 && lng <= 180) {
    return new THREE.Color(0x84cc16);
  }
  // 8. Southeast Asia (Hot Pink / Magenta)
  if (lat < 22 && lat >= -11 && lng >= 90 && lng <= 150) {
    return new THREE.Color(0xec4899);
  }
  // 9. East Asia & North Asia / China, Japan, Korea, Russia (Sapphire Blue)
  if (lng >= 60 && lng <= 180) {
    return new THREE.Color(0x3b82f6);
  }

  // Fallback for islands/edges
  return new THREE.Color(0x38bdf8);
}

// Generate smooth anti-aliased glowing circular dot texture (white base for vertex colors)
function createSmoothDotTexture(): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');     // Pure white core center
  grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.95)'); // Bright white inner ring
  grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.4)');  // Soft outer white glow
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');      // Transparent edge

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(32, 32, 30, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Generate radial glow halo texture for high transaction density hubs
function createGlowHaloTexture(): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 60);
  grad.addColorStop(0, 'rgba(0, 210, 255, 1)');      // Vibrant Electric Cyan Core
  grad.addColorStop(0.25, 'rgba(0, 102, 255, 0.85)'); // Electric Blue Inner Ring
  grad.addColorStop(0.55, 'rgba(56, 189, 248, 0.4)'); // Sky Blue Soft Glow
  grad.addColorStop(1, 'rgba(56, 189, 248, 0)');     // Faded Edge

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(64, 64, 60, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Create 3D arc curve connecting two points on the sphere
function createNetworkArc(
  startLat: number, startLng: number,
  endLat: number, endLng: number,
  radius: number
): THREE.Line {
  const p1 = latLngToVector3(startLat, startLng, radius * 1.01);
  const p2 = latLngToVector3(endLat, endLng, radius * 1.01);

  const distance = p1.distanceTo(p2);
  const mid = p1.clone().add(p2).multiplyScalar(0.5);
  // Lift the arc curve based on distance
  mid.normalize().multiplyScalar(radius * (1.02 + distance * 0.05));

  const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
  const points = curve.getPoints(60);
  const geo = new THREE.BufferGeometry().setFromPoints(points);

  const mat = new THREE.LineDashedMaterial({
    color: 0x38bdf8, // Bright sky blue arc
    dashSize: 0.25,
    gapSize: 0.15,
    transparent: true,
    opacity: 0.8,
  });

  const line = new THREE.Line(geo, mat);
  line.computeLineDistances();
  return line;
}

export const HollowGlobe3D: React.FC<HollowGlobe3DProps> = ({
  autoRotate = true,
  rotationSpeed = 0.5,
  focusedCoordinates,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Camera Zoom State
  const MIN_CAMERA_Z = 9.5;
  const DEFAULT_CAMERA_Z = 16.5;
  const MAX_CAMERA_Z = 26.0;
  const targetCameraZRef = useRef<number>(DEFAULT_CAMERA_Z);
  const [currentZoomPercent, setCurrentZoomPercent] = React.useState<number>(100);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const initialTouchDistanceRef = useRef<number | null>(null);

  // Rotate globe to face specified coordinates
  useEffect(() => {
    if (focusedCoordinates && globeGroupRef.current) {
      const targetY = -(focusedCoordinates.lng + 90) * (Math.PI / 180);
      const targetX = focusedCoordinates.lat * (Math.PI / 180) * 0.4;

      const currentY = globeGroupRef.current.rotation.y;
      const currentX = globeGroupRef.current.rotation.x;

      let step = 0;
      const totalSteps = 45;

      const animateFocus = () => {
        if (step < totalSteps && globeGroupRef.current) {
          step++;
          const t = step / totalSteps;
          const easeT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOutQuad
          globeGroupRef.current.rotation.y = currentY + (targetY - currentY) * easeT;
          globeGroupRef.current.rotation.x = currentX + (targetX - currentX) * easeT;
          requestAnimationFrame(animateFocus);
        }
      };
      animateFocus();
    }
  }, [focusedCoordinates]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = DEFAULT_CAMERA_Z;
    cameraRef.current = camera;

    // 3. Renderer with high DPR and transparent background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.debug.checkShaderErrors = false;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const blueDirLight = new THREE.DirectionalLight(0x3b82f6, 3.0);
    blueDirLight.position.set(12, 18, 20);
    scene.add(blueDirLight);

    const cyanPointLight = new THREE.PointLight(0x38bdf8, 3.5, 35);
    cyanPointLight.position.set(-12, -12, 18);
    scene.add(cyanPointLight);

    // 5. Globe Group (Parent for hollow elements)
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    const GLOBE_RADIUS = 5.2;

    // 5a. Translucent Glass Shell & Inner Core
    const glassGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 0.985, 64, 64);
    const glassMat = new THREE.MeshPhongMaterial({
      color: 0x0284c7, // Luminous electric blue
      emissive: 0x0369a1, // Deep sky blue
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0.15, // Luminous glass refraction
      shininess: 140,
      specular: 0x38bdf8,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    globeGroup.add(glassMesh);

    // 5a2. Inner Holographic Blockchain Core (Crystalline Core)
    const coreGroup = new THREE.Group();
    const coreGeo = new THREE.IcosahedronGeometry(GLOBE_RADIUS * 0.35, 1);
    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreWireMat);
    coreGroup.add(coreMesh);

    // Inner Glowing Core Light Point
    const coreLight = new THREE.PointLight(0x00d2ff, 2.5, 12);
    coreGroup.add(coreLight);
    globeGroup.add(coreGroup);

    // 5b. Outer Atmospheric Glow Aura (Multi-Layer)
    const auraGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.04, 48, 48);
    const auraMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, // Bright sky blue aura
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
    });
    const auraMesh = new THREE.Mesh(auraGeo, auraMat);
    globeGroup.add(auraMesh);

    const outerAuraGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.08, 36, 36);
    const outerAuraMat = new THREE.MeshBasicMaterial({
      color: 0x0066ff, // Deep electric blue rim
      transparent: true,
      opacity: 0.05,
      side: THREE.BackSide,
    });
    const outerAuraMesh = new THREE.Mesh(outerAuraGeo, outerAuraMat);
    globeGroup.add(outerAuraMesh);

    // 5c. ELEGANT PARALLELS & MERIDIANS (Architectural Lat/Lng Rings)
    const gridGroup = new THREE.Group();
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8, // Vibrant bright sky blue grid lines
      transparent: true,
      opacity: 0.28,
    });

    // 1) Parallels (Latitudes) at distinct angles
    const latitudeAngles = [-60, -40, -20, 0, 20, 40, 60];
    latitudeAngles.forEach((lat) => {
      const rad = (lat * Math.PI) / 180;
      const radiusAtLat = GLOBE_RADIUS * Math.cos(rad);
      const y = GLOBE_RADIUS * Math.sin(rad);

      const points: THREE.Vector3[] = [];
      const segments = 120;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(
          radiusAtLat * Math.cos(theta),
          y,
          radiusAtLat * Math.sin(theta)
        ));
      }
      const latGeo = new THREE.BufferGeometry().setFromPoints(points);
      const latLine = new THREE.LineLoop(latGeo, lineMat);
      gridGroup.add(latLine);
    });

    // 2) Meridians (Longitudes) - 12 sleek full longitude circles
    const longitudeCount = 12;
    for (let i = 0; i < longitudeCount; i++) {
      const lngAngle = (i / longitudeCount) * Math.PI * 2;
      const points: THREE.Vector3[] = [];
      const segments = 120;
      for (let j = 0; j <= segments; j++) {
        const phi = (j / segments) * Math.PI; // 0 to PI
        const x = GLOBE_RADIUS * Math.sin(phi) * Math.cos(lngAngle);
        const y = GLOBE_RADIUS * Math.cos(phi);
        const z = GLOBE_RADIUS * Math.sin(phi) * Math.sin(lngAngle);
        points.push(new THREE.Vector3(x, y, z));
      }
      const lngGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lngLine = new THREE.Line(lngGeo, lineMat);
      gridGroup.add(lngLine);
    }
    globeGroup.add(gridGroup);

    // 5d. MULTI-COLOR CONTINENTS DOT MATRIX (Sampled against landmask & assigned distinct continent colors)
    const isLand = createLandMask();
    const dotTexture = createSmoothDotTexture();
    const totalPointsToSample = 22000;
    const dotPositions: number[] = [];
    const dotColors: number[] = [];

    const phiAngle = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < totalPointsToSample; i++) {
      const y = 1 - (i / (totalPointsToSample - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phiAngle * i;

      const lat = Math.asin(y) * (180 / Math.PI);
      const lng = (theta % (2 * Math.PI)) * (180 / Math.PI) - 180;

      if (isLand(lat, lng)) {
        const vec = latLngToVector3(lat, lng, GLOBE_RADIUS * 1.008);
        dotPositions.push(vec.x, vec.y, vec.z);

        const color = getContinentColor(lat, lng);
        dotColors.push(color.r, color.g, color.b);
      }
    }

    const dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));
    dotGeometry.setAttribute('color', new THREE.Float32BufferAttribute(dotColors, 3));

    // Vibrant Glowing Multi-Color Continents Material
    const dotMaterial = new THREE.PointsMaterial({
      size: 0.24,
      vertexColors: true,
      map: dotTexture || undefined,
      transparent: true,
      opacity: 0.98,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const continentPoints = new THREE.Points(dotGeometry, dotMaterial);
    globeGroup.add(continentPoints);

    // 5e. GLOBAL CONNECTIVITY ARCS
    const arcsGroup = new THREE.Group();
    const networkConnections = [
      { from: { lat: 51.5074, lng: -0.1278 }, to: { lat: 25.2048, lng: 55.2708 } }, // London -> Dubai
      { from: { lat: 25.2048, lng: 55.2708 }, to: { lat: 1.3521, lng: 103.8198 } }, // Dubai -> Singapore
      { from: { lat: 1.3521, lng: 103.8198 }, to: { lat: 35.6762, lng: 139.6503 } }, // Singapore -> Tokyo
      { from: { lat: 51.5074, lng: -0.1278 }, to: { lat: 40.7128, lng: -74.0060 } }, // London -> New York
    ];

    const arcLines: THREE.Line[] = [];
    networkConnections.forEach((conn) => {
      const arc = createNetworkArc(conn.from.lat, conn.from.lng, conn.to.lat, conn.to.lng, GLOBE_RADIUS);
      arcsGroup.add(arc);
      arcLines.push(arc);
    });
    globeGroup.add(arcsGroup);

    // 5f. HIGH TRANSACTION DENSITY LOYYAL NETWORK HUBS & PULSING GLOWS
    const hubs = [
      { lat: 25.2048, lng: 55.2708, name: 'Dubai', density: 'Ultra High' },
      { lat: 24.4539, lng: 54.3773, name: 'Abu Dhabi', density: 'High' },
      { lat: 51.5074, lng: -0.1278, name: 'London', density: 'Ultra High' },
      { lat: 1.3521, lng: 103.8198, name: 'Singapore', density: 'High' },
      { lat: 35.6762, lng: 139.6503, name: 'Tokyo', density: 'Ultra High' },
      { lat: 40.7128, lng: -74.0060, name: 'New York', density: 'Ultra High' },
      { lat: 37.7749, lng: -122.4194, name: 'San Francisco', density: 'High' },
      { lat: 50.1109, lng: 8.6821, name: 'Frankfurt', density: 'High' },
      { lat: -33.8688, lng: 151.2093, name: 'Sydney', density: 'High' },
      { lat: 24.7136, lng: 46.6753, name: 'Riyadh', density: 'High' },
    ];

    const haloTexture = createGlowHaloTexture();

    const pinGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const pinMat = new THREE.MeshBasicMaterial({ color: 0x00d2ff }); // Electric Cyan beacon core

    const ringGeo = new THREE.RingGeometry(0.12, 0.28, 32);

    const pulsingHalos: { sprite: THREE.Sprite; baseScale: number; phase: number }[] = [];
    const pulsingRings: { mesh: THREE.Mesh; material: THREE.MeshBasicMaterial; phase: number }[] = [];

    hubs.forEach((hub, index) => {
      const pos = latLngToVector3(hub.lat, hub.lng, GLOBE_RADIUS * 1.018);

      // Core Beacon Sphere
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.copy(pos);
      globeGroup.add(pin);

      // Subtle Pulsing Radial Glow Halo Sprite
      if (haloTexture) {
        const spriteMat = new THREE.SpriteMaterial({
          map: haloTexture,
          transparent: true,
          opacity: 0.75,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.position.copy(pos);
        const baseScale = hub.density === 'Ultra High' ? 1.35 : 1.0;
        sprite.scale.set(baseScale, baseScale, 1);
        globeGroup.add(sprite);

        pulsingHalos.push({ sprite, baseScale, phase: index * 0.7 });
      }

      // Vertical Micro Data Ray (pointing outward from globe core)
      const normal = pos.clone().normalize();
      const rayStart = pos.clone();
      const rayEnd = pos.clone().add(normal.clone().multiplyScalar(0.35));
      const rayGeo = new THREE.BufferGeometry().setFromPoints([rayStart, rayEnd]);
      const rayMat = new THREE.LineBasicMaterial({
        color: 0x00d2ff,
        transparent: true,
        opacity: 0.65,
      });
      const rayLine = new THREE.Line(rayGeo, rayMat);
      globeGroup.add(rayLine);

      // Dual Expanding Ripple Rings
      for (let r = 0; r < 2; r++) {
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x00d2ff,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6,
          depthWrite: false,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(pos);
        ring.lookAt(new THREE.Vector3(0, 0, 0)); // Align with globe curvature
        globeGroup.add(ring);

        pulsingRings.push({
          mesh: ring,
          material: ringMat,
          phase: index * 0.6 + r * 0.5,
        });
      }
    });

    // 6. Interactive Drag & Zoom Controls
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !globeGroupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      velocityRef.current = { x: deltaY * 0.004, y: deltaX * 0.004 };

      globeGroupRef.current.rotation.y += velocityRef.current.y;
      globeGroupRef.current.rotation.x += velocityRef.current.x;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      // Uninterrupted page scroll flow: only intercept zoom if Ctrl/Cmd is held
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const zoomSensitivity = 0.012;
        const delta = e.deltaY * zoomSensitivity;
        targetCameraZRef.current = Math.max(
          MIN_CAMERA_Z,
          Math.min(MAX_CAMERA_Z, targetCameraZRef.current + delta)
        );
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        isDraggingRef.current = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialTouchDistanceRef.current = Math.hypot(dx, dy);
      } else if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && initialTouchDistanceRef.current !== null) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const delta = (initialTouchDistanceRef.current - dist) * 0.025;
        targetCameraZRef.current = Math.max(
          MIN_CAMERA_Z,
          Math.min(MAX_CAMERA_Z, targetCameraZRef.current + delta)
        );
        initialTouchDistanceRef.current = dist;
      } else if (e.touches.length === 1 && isDraggingRef.current && globeGroupRef.current) {
        const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
        const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

        velocityRef.current = { x: deltaY * 0.004, y: deltaX * 0.004 };

        globeGroupRef.current.rotation.y += velocityRef.current.y;
        globeGroupRef.current.rotation.x += velocityRef.current.x;

        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        initialTouchDistanceRef.current = null;
      }
      if (e.touches.length === 0) {
        isDraggingRef.current = false;
      }
    };

    const dom = container;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('wheel', onWheel, { passive: false });
    dom.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    // 7. Animation Loop
    let clock = new THREE.Clock();
    let animFrameId: number;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      // Smooth Camera Z Zoom Interpolation
      if (cameraRef.current) {
        const currentZ = cameraRef.current.position.z;
        const targetZ = targetCameraZRef.current;
        const newZ = THREE.MathUtils.lerp(currentZ, targetZ, 0.08);
        cameraRef.current.position.z = newZ;

        // Calculate visual zoom percentage
        const zoomPct = Math.round((DEFAULT_CAMERA_Z / newZ) * 100);
        setCurrentZoomPercent((prev) => (Math.abs(prev - zoomPct) >= 1 ? zoomPct : prev));
      }

      if (globeGroupRef.current) {
        if (!isDraggingRef.current) {
          // Friction damping
          velocityRef.current.x *= 0.94;
          velocityRef.current.y *= 0.94;

          globeGroupRef.current.rotation.y += velocityRef.current.y;
          globeGroupRef.current.rotation.x += velocityRef.current.x;

          // Continuous subtle auto-rotation
          if (autoRotate && Math.abs(velocityRef.current.y) < 0.001) {
            globeGroupRef.current.rotation.y += 0.002 * rotationSpeed;
          }
        }

        const t = clock.getElapsedTime();

        // Animate Inner Holographic Core
        coreGroup.rotation.y = -t * 0.4;
        coreGroup.rotation.x = Math.sin(t * 0.3) * 0.2;

        // Animate subtle pulsing transaction density glow halos
        pulsingHalos.forEach((halo) => {
          const s = halo.baseScale * (1 + Math.sin(t * 2.8 + halo.phase) * 0.22);
          halo.sprite.scale.set(s, s, 1);
          (halo.sprite.material as THREE.SpriteMaterial).opacity =
            0.55 + Math.sin(t * 2.8 + halo.phase) * 0.25;
        });

        // Animate expanding concentric transaction ripple rings
        pulsingRings.forEach((ring) => {
          const progress = (t * 1.4 + ring.phase) % 1.0;
          const scale = 0.8 + progress * 1.8;
          ring.mesh.scale.set(scale, scale, 1);
          ring.material.opacity = (1 - progress) * 0.75;
        });

        // Animate dashed arc flow offset
        arcLines.forEach((arc) => {
          const mat = arc.material as THREE.LineDashedMaterial;
          if (mat) {
            mat.dashSize = 0.25 + Math.sin(t * 2) * 0.05;
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Trigger smooth fade-out once initial frame render is ready
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 280);

    // Resize handling
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(loadTimer);
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);

      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('wheel', onWheel);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
      }
      scene.clear();
    };
  }, [autoRotate, rotationSpeed]);

  // Zoom Control Handlers
  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    targetCameraZRef.current = Math.max(MIN_CAMERA_Z, targetCameraZRef.current - 2.5);
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    targetCameraZRef.current = Math.min(MAX_CAMERA_Z, targetCameraZRef.current + 2.5);
  };

  const handleResetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    targetCameraZRef.current = DEFAULT_CAMERA_Z;
  };

  return (
    <div className="relative w-full h-full group/globe overflow-hidden rounded-full">
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
      />

      {/* Floating Glassmorphic Interactive Globe Controls (Bottom Center) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 opacity-0 group-hover/globe:opacity-100 focus-within:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/globe:translate-y-0 flex items-center gap-1.5 p-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 shadow-xl text-white">
        <button
          onClick={handleZoomIn}
          className="p-1.5 rounded-full hover:bg-slate-700/80 text-sky-400 hover:text-cyan-300 transition-colors cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        <span className="text-[10px] font-mono font-semibold px-1 text-slate-300 select-none">
          {currentZoomPercent}%
        </span>

        <button
          onClick={handleZoomOut}
          className="p-1.5 rounded-full hover:bg-slate-700/80 text-sky-400 hover:text-cyan-300 transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-3 bg-slate-700/80 mx-0.5" />

        <button
          onClick={handleResetZoom}
          className="p-1.5 rounded-full hover:bg-slate-700/80 text-sky-400 hover:text-cyan-300 transition-colors cursor-pointer"
          title="Reset Camera View"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Graceful Transition & Loading Overlay */}
      <div
        className={`absolute inset-0 z-40 flex flex-col items-center justify-center rounded-full bg-white/85 backdrop-blur-md transition-all duration-700 ease-out pointer-events-none ${
          isLoading ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="relative flex items-center justify-center">
            {/* Glowing spinning ring */}
            <div className="w-12 h-12 rounded-full border-2 border-sky-200/60 border-t-cyan-500 border-r-blue-600 animate-spin" />
            <Globe className="w-5 h-5 text-sky-500 absolute animate-pulse" />
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <span className="text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 bg-clip-text text-transparent">
              Initializing 3D Globe
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">Building spatial network...</span>
          </div>
        </div>
      </div>
    </div>
  );
};
