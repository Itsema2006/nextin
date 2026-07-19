import { useEffect, useRef, useState } from 'react';

// Helper to normalize a 3D vertex
const normalize = ([x, y, z]) => {
  const d = Math.sqrt(x * x + y * y + z * z);
  return d === 0 ? [0, 0, 0] : [x / d, y / d, z / d];
};

// Generates 24 vertices for a Cube
const getCubeVertices = () => {
  const base = [];
  for (const x of [-1, 1]) {
    for (const y of [-1, 1]) {
      for (const z of [-1, 1]) {
        base.push([x * 0.6, y * 0.6, z * 0.6]);
      }
    }
  }
  // Repeat to fill 24 vertices
  const vertices = [];
  for (let i = 0; i < 24; i++) {
    vertices.push([...base[i % 8]]);
  }
  return vertices;
};

// Cube Edges (indices out of 24)
const getCubeEdges = () => {
  const edges = [];
  const baseEdges = [
    [0, 1], [1, 3], [3, 2], [2, 0], // Back face
    [4, 5], [5, 7], [7, 6], [6, 4], // Front face
    [0, 4], [1, 5], [2, 6], [3, 7]  // Connectors
  ];
  return baseEdges;
};

// Generates 24 vertices for an Octahedron
const getOctahedronVertices = () => {
  const base = [
    [1, 0, 0], [-1, 0, 0],
    [0, 1, 0], [0, -1, 0],
    [0, 0, 1], [0, 0, -1]
  ].map(v => v.map(c => c * 0.75));

  const vertices = [];
  for (let i = 0; i < 24; i++) {
    vertices.push([...base[i % 6]]);
  }
  return vertices;
};

const getOctahedronEdges = () => {
  return [
    [0, 2], [2, 1], [1, 3], [3, 0], // Middle ring
    [4, 0], [4, 1], [4, 2], [4, 3], // Top pyramid
    [5, 0], [5, 1], [5, 2], [5, 3]  // Bottom pyramid
  ];
};

// Generates 24 vertices for an Icosahedron
const getIcosahedronVertices = () => {
  const phi = (1 + Math.sqrt(5)) / 2;
  const base = [
    [0, 1, phi], [0, 1, -phi], [0, -1, phi], [0, -1, -phi],
    [1, phi, 0], [1, -phi, 0], [-1, phi, 0], [-1, -phi, 0],
    [phi, 0, 1], [phi, 0, -1], [-phi, 0, 1], [-phi, 0, -1]
  ].map(v => normalize(v).map(c => c * 0.75));

  const vertices = [];
  for (let i = 0; i < 24; i++) {
    vertices.push([...base[i % 12]]);
  }
  return vertices;
};

const getIcosahedronEdges = () => {
  return [
    [0, 8], [0, 10], [0, 4], [0, 6], [0, 2],
    [1, 9], [1, 11], [1, 4], [1, 6], [1, 3],
    [2, 8], [2, 10], [2, 5], [2, 7], [2, 3],
    [3, 9], [3, 11], [3, 5], [3, 7],
    [4, 8], [4, 9], [4, 6],
    [5, 8], [5, 9], [5, 7],
    [6, 10], [6, 11],
    [7, 10], [7, 11],
    [8, 9], [10, 11]
  ];
};

// Generates 24 vertices along a Torus Knot (Trefoil Knot)
const getTorusKnotVertices = () => {
  const vertices = [];
  for (let i = 0; i < 24; i++) {
    const t = (i / 24) * Math.PI * 2;
    // p=2, q=3 torus knot formula
    const r = (Math.cos(3 * t) + 2.0) * 0.28;
    const x = r * Math.cos(2 * t);
    const y = r * Math.sin(2 * t);
    const z = -Math.sin(3 * t) * 0.28;
    vertices.push([x, y, z]);
  }
  return vertices;
};

const getTorusKnotEdges = () => {
  const edges = [];
  for (let i = 0; i < 24; i++) {
    edges.push([i, (i + 1) % 24]);
  }
  return edges;
};

// Map service ID to geometric definitions
const SHAPES = {
  'ui-ux': {
    vertices: getCubeVertices(),
    edges: getCubeEdges()
  },
  'web-dev': {
    vertices: getOctahedronVertices(),
    edges: getOctahedronEdges()
  },
  'branding': {
    vertices: getIcosahedronVertices(),
    edges: getIcosahedronEdges()
  },
  'motion-3d': {
    vertices: getTorusKnotVertices(),
    edges: getTorusKnotEdges()
  }
};

export default function Service3DShowcase({ activeTab }) {
  const canvasRef = useRef(null);
  
  // Animation states
  const rotationRef = useRef({ x: 0.5, y: 0.5, speedX: 0.005, speedY: 0.008 });
  const mouseRef = useRef({ x: 0, y: 0, isHovered: false });
  const morphRef = useRef({
    progress: 1.0,
    startVertices: SHAPES[activeTab]?.vertices || getCubeVertices(),
    endVertices: SHAPES[activeTab]?.vertices || getCubeVertices(),
    startEdges: SHAPES[activeTab]?.edges || getCubeEdges(),
    endEdges: SHAPES[activeTab]?.edges || getCubeEdges(),
    oldTab: activeTab
  });

  // Track activeTab changes to trigger morph animations
  useEffect(() => {
    const currentShape = SHAPES[activeTab] || SHAPES['ui-ux'];
    const prevShape = SHAPES[morphRef.current.oldTab] || currentShape;
    
    // Linearly interpolate vertices from current state
    const currentVerticesState = [];
    const p = morphRef.current.progress;
    for (let i = 0; i < 24; i++) {
      const start = morphRef.current.startVertices[i];
      const end = morphRef.current.endVertices[i];
      const current = [
        start[0] + (end[0] - start[0]) * p,
        start[1] + (end[1] - start[1]) * p,
        start[2] + (end[2] - start[2]) * p
      ];
      currentVerticesState.push(current);
    }

    morphRef.current = {
      progress: 0.0,
      startVertices: currentVerticesState,
      endVertices: currentShape.vertices,
      startEdges: prevShape.edges,
      endEdges: currentShape.edges,
      oldTab: activeTab
    };
  }, [activeTab]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    // Handle resizing dynamically
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      // Use higher pixel ratio for crisp wireframes
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix projection and drawing loop
    const render = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, width, height);

      // 1. Advance morph animation progress
      if (morphRef.current.progress < 1.0) {
        morphRef.current.progress = Math.min(1.0, morphRef.current.progress + 0.04);
      }
      const morphP = morphRef.current.progress;

      // 2. Advance rotation angles
      const rot = rotationRef.current;
      const mouse = mouseRef.current;
      
      // Auto-rotation + mouse-influenced physics
      if (mouse.isHovered) {
        const targetSpeedX = (mouse.y - height / 2) * 0.0001;
        const targetSpeedY = (mouse.x - width / 2) * 0.0001;
        rot.speedX += (targetSpeedX - rot.speedX) * 0.1;
        rot.speedY += (targetSpeedY - rot.speedY) * 0.1;
      } else {
        // Slow down back to baseline speed
        rot.speedX += (0.003 - rot.speedX) * 0.05;
        rot.speedY += (0.005 - rot.speedY) * 0.05;
      }

      rot.x += rot.speedX;
      rot.y += rot.speedY;

      // Trigonometric cache
      const cx = Math.cos(rot.x);
      const sx = Math.sin(rot.x);
      const cy = Math.cos(rot.y);
      const sy = Math.sin(rot.y);

      // 3. Interpolate vertices (morph progress)
      const morphedVertices = [];
      for (let i = 0; i < 24; i++) {
        const start = morphRef.current.startVertices[i];
        const end = morphRef.current.endVertices[i];
        morphedVertices.push([
          start[0] + (end[0] - start[0]) * morphP,
          start[1] + (end[1] - start[1]) * morphP,
          start[2] + (end[2] - start[2]) * morphP
        ]);
      }

      // 4. Transform and project vertices
      const size = Math.min(width, height) * 0.42;
      const projected = morphedVertices.map(([x, y, z]) => {
        // Y-axis rotation
        let x1 = x * cy - z * sy;
        let z1 = x * sy + z * cy;
        // X-axis rotation
        let y2 = y * cx - z1 * sx;
        let z2 = y * sx + z1 * cx;

        // Simple perspective projection
        const depth = 2.0;
        const factor = depth / (depth + z2);
        
        return {
          x: width / 2 + x1 * factor * size,
          y: height / 2 + y2 * factor * size,
          z: z2 // Keep depth for z-sorting
        };
      });

      // 5. Draw Edges
      // To create morphing edges, we draw both start edges (fading out) and end edges (fading in)
      const drawEdge = (edge, alpha) => {
        const p1 = projected[edge[0]];
        const p2 = projected[edge[1]];
        if (!p1 || !p2) return;

        // Depth-based lighting/thickness
        const avgZ = (p1.z + p2.z) / 2;
        const depthAlpha = Math.max(0.1, Math.min(1.0, 1.0 - (avgZ + 0.5) / 1.5));
        
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * depthAlpha * 0.28})`;
        ctx.lineWidth = mouse.isHovered ? 1.5 : 1.0;
        ctx.stroke();
      };

      if (morphP < 1.0) {
        // Fade out old edges
        morphRef.current.startEdges.forEach(edge => drawEdge(edge, 1.0 - morphP));
        // Fade in new edges
        morphRef.current.endEdges.forEach(edge => drawEdge(edge, morphP));
      } else {
        // Fully transitioned
        morphRef.current.endEdges.forEach(edge => drawEdge(edge, 1.0));
      }

      // 6. Draw Vertices
      projected.forEach((p) => {
        const depthAlpha = Math.max(0.1, Math.min(1.0, 1.0 - (p.z + 0.5) / 1.5));
        const radius = (mouse.isHovered ? 3.5 : 2.5) * depthAlpha;

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha * 0.85})`;
        
        if (mouse.isHovered) {
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 10;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Mouse interactivity hooks
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  };

  const handleMouseEnter = () => {
    mouseRef.current.isHovered = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.isHovered = false;
  };

  return (
    <div className="showcase-3d-wrapper">
      <div className="canvas-instruction">Move mouse to interact</div>
      <canvas
        ref={canvasRef}
        className="showcase-3d-canvas"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}
