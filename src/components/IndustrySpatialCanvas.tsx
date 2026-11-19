import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, Sparkles, Move3d, RotateCcw } from 'lucide-react';

export interface Industry3DNode {
  id: string;
  name: string;
  color: string;
  hexColor: number;
  geometryType: 'octahedron' | 'dodecahedron' | 'tetrahedron' | 'icosahedron' | 'box' | 'torus';
  subtitle: string;
}

interface IndustrySpatialCanvasProps {
  activeIndustryId: string | null;
  onSelectIndustry: (id: string) => void;
  className?: string;
}

export const INDUSTRY_NODES: Industry3DNode[] = [
  {
    id: 'airlines',
    name: 'Airlines',
    color: 'sky',
    hexColor: 0x38bdf8,
    geometryType: 'octahedron',
    subtitle: 'Global Miles Exchange & Alliance Liquidity',
  },
  {
    id: 'banking',
    name: 'Banking & Financial Services',
    color: 'purple',
    hexColor: 0xa855f7,
    geometryType: 'dodecahedron',
    subtitle: 'Liability Reduction & Card Spend Acceleration',
  },
  {
    id: 'retail',
    name: 'Retail & E-commerce',
    color: 'emerald',
    hexColor: 0x10b981,
    geometryType: 'icosahedron',
    subtitle: 'Instant Coalition & Daily Gamification',
  },
  {
    id: 'telecom',
    name: 'Telecom',
    color: 'amber',
    hexColor: 0xf59e0b,
    geometryType: 'tetrahedron',
    subtitle: 'Lifestyle Engagement & Partner Offers',
  },
  {
    id: 'shopping-malls',
    name: 'Shopping Malls',
    color: 'fuchsia',
    hexColor: 0xd946ef,
    geometryType: 'torus',
    subtitle: 'Tenant Interoperability & Footfall Drivers',
  },
  {
    id: 'smes',
    name: 'SMEs',
    color: 'blue',
    hexColor: 0x3b82f6,
    geometryType: 'box',
    subtitle: '24-Hour Zero-Code Global Rewards Hub',
  },
];

export const IndustrySpatialCanvas: React.FC<IndustrySpatialCanvasProps> = ({
  activeIndustryId,
  onSelectIndustry,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const nodeMeshesRef = useRef<Map<string, { mesh: THREE.Mesh; halo: THREE.LineSegments; initialPos: THREE.Vector3 }>>(new Map());
  const particleSystemRef = useRef<THREE.Points | null>(null);
  const lineGroupRef = useRef<THREE.Group | null>(null);
  const coreMeshRef = useRef<THREE.Mesh | null>(null);

  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14);
    cameraRef.current = camera;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x38bdf8, 2, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 2, 50);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    // 5. Central Loyyal Core
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
      roughness: 0.2,
      metalness: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);
    coreMeshRef.current = coreMesh;

    // Inner glowing sphere
    const innerGeo = new THREE.SphereGeometry(1.0, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    coreMesh.add(innerSphere);

    // Outer orbiting ring for Core
    const ringGeo = new THREE.TorusGeometry(2.4, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.4 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    coreMesh.add(ringMesh);

    // 6. Create Industry Orbiting Nodes
    const radius = 5.2;
    const nodeMap = new Map<string, { mesh: THREE.Mesh; halo: THREE.LineSegments; initialPos: THREE.Vector3 }>();
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);
    lineGroupRef.current = lineGroup;

    INDUSTRY_NODES.forEach((node, i) => {
      const angle = (i / INDUSTRY_NODES.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.55;
      const z = Math.sin(angle * 2) * 1.2;
      const pos = new THREE.Vector3(x, y, z);

      // Node Geometry based on type
      let geom: THREE.BufferGeometry;
      switch (node.geometryType) {
        case 'octahedron':
          geom = new THREE.OctahedronGeometry(0.55);
          break;
        case 'dodecahedron':
          geom = new THREE.DodecahedronGeometry(0.52);
          break;
        case 'icosahedron':
          geom = new THREE.IcosahedronGeometry(0.55);
          break;
        case 'tetrahedron':
          geom = new THREE.TetrahedronGeometry(0.6);
          break;
        case 'torus':
          geom = new THREE.TorusGeometry(0.4, 0.18, 16, 32);
          break;
        case 'box':
        default:
          geom = new THREE.BoxGeometry(0.7, 0.7, 0.7);
          break;
      }

      const mat = new THREE.MeshStandardMaterial({
        color: node.hexColor,
        roughness: 0.3,
        metalness: 0.7,
        emissive: node.hexColor,
        emissiveIntensity: 0.25,
      });

      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.copy(pos);
      mesh.userData = { id: node.id, name: node.name };
      scene.add(mesh);

      // Wireframe Halo around node
      const wireGeo = new THREE.WireframeGeometry(geom);
      const wireMat = new THREE.LineBasicMaterial({ color: node.hexColor, transparent: true, opacity: 0.5 });
      const wireframeHalo = new THREE.LineSegments(wireGeo, wireMat);
      wireframeHalo.scale.set(1.25, 1.25, 1.25);
      mesh.add(wireframeHalo);

      nodeMap.set(node.id, { mesh, halo: wireframeHalo, initialPos: pos.clone() });

      // Connection Line to Core
      const points = [new THREE.Vector3(0, 0, 0), pos];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineDashedMaterial({
        color: node.hexColor,
        dashSize: 0.2,
        gapSize: 0.15,
        transparent: true,
        opacity: 0.35,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      line.computeLineDistances();
      lineGroup.add(line);
    });

    nodeMeshesRef.current = nodeMap;

    // 7. Ambient Particle Dust Cloud
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount; p++) {
      particlePositions[p * 3] = (Math.random() - 0.5) * 22;
      particlePositions[p * 3 + 1] = (Math.random() - 0.5) * 14;
      particlePositions[p * 3 + 2] = (Math.random() - 0.5) * 12;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.45,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);
    particleSystemRef.current = particleSystem;

    // 8. Raycaster for Interactive Node Clicking
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshes = Array.from(nodeMap.values()).map((n) => n.mesh);
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const id = intersects[0].object.userData.id;
        setHoveredNodeId(id);
        container.style.cursor = 'pointer';
      } else {
        setHoveredNodeId(null);
        container.style.cursor = 'default';
      }
    };

    const handlePointerClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshes = Array.from(nodeMap.values()).map((n) => n.mesh);
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const id = intersects[0].object.userData.id;
        onSelectIndustry(id);
      }
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('click', handlePointerClick);

    // 9. Animation Loop
    let animFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate central core
      if (coreMeshRef.current) {
        coreMeshRef.current.rotation.y = elapsedTime * 0.25;
        coreMeshRef.current.rotation.x = Math.sin(elapsedTime * 0.15) * 0.1;
      }

      // Rotate particle cloud
      if (particleSystemRef.current) {
        particleSystemRef.current.rotation.y = elapsedTime * 0.05;
      }

      // Animate industry nodes
      nodeMap.forEach(({ mesh, halo, initialPos }, id) => {
        const isActive = id === activeIndustryId;
        const isHovered = id === hoveredNodeId;

        // Self rotation
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.015;

        // Floating hover motion
        const floatOffset = Math.sin(elapsedTime * 2 + initialPos.x) * 0.15;
        mesh.position.y = initialPos.y + floatOffset;

        // Scale & glow amplification when active or hovered
        const targetScale = isActive ? 1.45 : isHovered ? 1.25 : 1.0;
        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat) {
          mat.emissiveIntensity = THREE.MathUtils.lerp(
            mat.emissiveIntensity,
            isActive ? 0.8 : isHovered ? 0.5 : 0.25,
            0.1
          );
        }

        if (halo) {
          halo.rotation.y -= 0.02;
          (halo.material as THREE.LineBasicMaterial).opacity = isActive ? 0.9 : 0.4;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // 10. Resize handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('click', handlePointerClick);

      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
      }
      scene.clear();
    };
  }, [activeIndustryId, hoveredNodeId]);

  const activeNode = INDUSTRY_NODES.find((n) => n.id === activeIndustryId);

  return (
    <div className={`relative w-full h-[320px] sm:h-[400px] bg-slate-950/90 rounded-none border border-slate-800 overflow-hidden ${className}`}>
      {/* Background 3D Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      {/* WebGL Canvas */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Floating HUD Label */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white rounded-none shadow-lg">
        <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
        <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
          LOYYAL 3D SECTOR MATRIX
        </span>
      </div>

      {/* Quick Interactive Sector Selector Tabs */}
      <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-1.5 p-1 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-none">
        {INDUSTRY_NODES.map((node) => (
          <button
            key={node.id}
            onClick={() => onSelectIndustry(node.id)}
            className={`px-2.5 py-1 text-[11px] font-mono font-semibold transition-colors cursor-pointer rounded-none ${
              activeIndustryId === node.id
                ? 'bg-sky-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {node.name.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Bottom Floating Active Sector Detail Badge */}
      {activeNode && (
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 text-white rounded-none shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-sky-400 animate-ping" />
            <div>
              <div className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider">
                Active Industry Node
              </div>
              <div className="text-sm sm:text-base font-extrabold text-white">
                {activeNode.name}
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-300 font-medium italic border-t sm:border-t-0 sm:border-l border-slate-700 pt-2 sm:pt-0 pl-0 sm:pl-3">
            {activeNode.subtitle}
          </div>
        </div>
      )}
    </div>
  );
};
