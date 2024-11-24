import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import Confetti from 'react-confetti';
import * as THREE from 'three';
import CLOUDS from "vanta/dist/vanta.clouds.min";

const useVantaEffect = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = CLOUDS({
      el: vantaRef.current, // Apply the effect to this element
      THREE, // Pass Three.js
      skyColor: 0x87CEEB     , // Adjust sky color if needed
      cloudColor: 0xF0F8FF  , // Cloud color
      speed: 1.1, // Cloud movement speed
    });
    return () => {
      if (vantaEffect) vantaEffect.destroy(); // Cleanup Vanta.js effect on unmount
    };
  }, []);

  return vantaRef;
};

// Custom Shader Material for Rainbow Effect
const RainbowShaderMaterial = {
  uniforms: {
    time: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform float time;

    void main() {
      // Speed up the color transition by multiplying time
      float speedFactor = 6.0;  // Increase this value to make the transition faster
      float frequency = 10.0;   // More frequency components for more segments

      // Red, Green, Blue components with faster transitions
      float r = abs(sin(vUv.y * frequency - time * 0.5 * speedFactor));  // Red component
      float g = abs(sin(vUv.y * frequency - time * 0.5 * speedFactor + 2.0));  // Green component
      float b = abs(sin(vUv.y * frequency - time * 0.5 * speedFactor + 4.0));  // Blue component

      // Smooth the transitions
      float smoothR = smoothstep(0.0, 1.0, r);
      float smoothG = smoothstep(0.0, 1.0, g);
      float smoothB = smoothstep(0.0, 1.0, b);

      // Output the final color with smooth transitions
      gl_FragColor = vec4(smoothR, smoothG, smoothB, 1.0);
    }
  `,
};


function RainbowTrail() {
  const trailRef = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Track cursor position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      setMouse({
        x: (touch.clientX / window.innerWidth) * 2 - 1,
        y: -(touch.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    }
  }, []);

  // Animate the beam
  useFrame(({ camera, clock }) => {
    if (trailRef.current) {
      // Convert cursor position to 3D world coordinates
      const vector = new THREE.Vector3(mouse.x, mouse.y, 0.99);
      vector.unproject(camera);

      const distance = vector.distanceTo(camera.position);
      
      
      vector.z += distance;

      //const offset = new THREE.Vector3(0, distance / 100, 0.25);
      trailRef.current.position.copy(vector);
    
      trailRef.current.rotation.x = Math.PI / 2; 
      trailRef.current.rotation.y = 0;  // Rotate around Y-axis

      const taperFactor = Math.min(2.5, Math.max(0.5, distance * 0.1));
      // Adjust the beam's length dynamically
      trailRef.current.scale.set(taperFactor, distance , taperFactor); // Scale in Y-axis matches half the distance

      // Update shader time for rainbow effect
      trailRef.current.material.uniforms.time.value = clock.getElapsedTime();

    }
  });


  return (
    <mesh ref={trailRef} >
      {/* Cylinder geometry with dynamic length */}
      <cylinderGeometry args={[0.02, 0.02, 2, 32]} />
      <shaderMaterial attach="material" {...RainbowShaderMaterial}/>
      
    </mesh>
  );
}



function Duck({ color, resetKey }) {
  const { scene } = useGLTF('/3D-assets/duck.glb'); // Load the duck model
  const duckRef = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const initialColor = useRef({});

  useEffect(() => {
    if (duckRef.current) {
      duckRef.current.position.y = -0.4


    }
  }, []);

  useEffect(() => {
    if (scene && Object.keys(initialColor.current).length === 0) {
      // Store initial colors for all meshes only once
      scene.traverse((child) => {
        if (child.isMesh && child.material?.color) {
          initialColor.current[child.uuid] = child.material.color.clone();
        }
      });
    }
  }, [scene]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      setMouse({
        x: (touch.clientX / window.innerWidth) * 2 - 1,
        y: -(touch.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () =>  {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    }
  }, []);

  useEffect(() => {
    if (duckRef.current) {
      // Rotate duck based on mouse position
      const { x, y } = mouse;
      duckRef.current.rotation.y = -Math.PI / 2 + x * Math.PI / 4;
      duckRef.current.rotation.x = (-y * Math.PI / 8) - 0.3;

    }
  }, [mouse]);

  useEffect(() => {
    if (scene && color) {
      scene.traverse((child) => {
        if (child.isMesh && child.material?.color) {
          const currentColor = child.material.color;
          const r = Math.min(255, currentColor.r * 255 + (color ? 25 : 0));
          currentColor.setRGB(r / 255, currentColor.g, currentColor.b); 
        }
      });
    }
  }, [color, scene]);

  useEffect(() => {
    if (resetKey && scene) {
      // Reset colors to initial state on resetKey change
      scene.traverse((child) => {
        if (child.isMesh && child.material?.color) {
          const originalColor = initialColor.current[child.uuid];
          if (originalColor) {
            child.material.color.copy(originalColor);
          }
          child.material.needsUpdate = true;
        }
      });
    }
  }, [resetKey, scene]);


 // scene.position.y = -0.05;

  return <primitive ref={duckRef} object={scene} scale={0.7} />;
}

function Home() {
  const [quackText, setQuackText] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPosition, setConfettiPosition] = useState({ x: 0, y: 0 });
  const [quackCount, setQuackCount] = useState(0);
  const [duckColor, setDuckColor] = useState(null);
  const [progress, setProgress] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(Date.now());
  const [resetKey, setResetKey] = useState(0);

  const vantaRef = useVantaEffect(); // Hook to initialize Vanta.js effect

  useEffect(() => {
    const resetProgressBar = () => {
      setQuackCount(0);
      setProgress(0);
      setResetKey((prev) => prev + 1);
    };

    const timer = setInterval(() => {
      if (Date.now() - lastClickTime > 1850) {
        resetProgressBar();
      }
    }, 500);

    return () => clearInterval(timer);
  }, [lastClickTime]);

  const handleClick = (e) => {
    if (e.target.tagName === 'BUTTON') return;

    const position = { x: e.clientX, y: e.clientY };
    setQuackText((prev) => [...prev, { id: Date.now(), position, offsetY: 0 }]);

    const newCount = quackCount + 1;
    setQuackCount(newCount);

    const redValue = Math.min(100, (newCount / 10) * 100);
    setDuckColor(`rgb(${redValue}, 0, 0)`);

    const newProgress = Math.min(100, (newCount / 10) * 100);
    setProgress(newProgress);

    setConfettiPosition(position);
    setTimeout(() => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }, 500);

    setLastClickTime(Date.now());
  };

  return (


    <div
      style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #2b2b2b, #1a1a1a)',
      }}
      onClick={handleClick}
    >

      {/* Vanta.js Background */}
      <div
        ref={vantaRef} // Vanta.js effect is applied to this div
        style={{
          height: '100vh',
          width: '100vw',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0, // Keep background behind other content
        }}
      />

            {/* Cool Animated Text: Luka Lašič */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '50px',
          fontWeight: 'bold',
          color: '#fffff', // Softer yellow-orange color
          textShadow: '0 0 5px #32a852, 0 0 30px #32a852', // Adjust shadow to match new color
          animation: 'glow 1.5s ease-in-out infinite alternate',
        }}
      >
        duckeN
      </div>

      {/* GitHub Button */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          zIndex: 1,
        }}
      >
        <a href="https://github.com/ducken1" target="_blank" rel="noopener noreferrer">
          <button
            style={{
              padding: '15px 30px',
              fontSize: '18px',
              cursor: 'pointer',
              backgroundColor: '#24292F',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.2)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1) ')}
          >
            GitHub
          </button>
        </a>
      </div>

      <Canvas camera={{ position: [0, 0.35, 0.8] }} >

       {/*<Background /> */}

        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 10]} />
        <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
        <Duck color={duckColor} resetKey={resetKey} />
      </Canvas>

      {/* RainbowTrail Canvas */}

      <Canvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none', // Ensure this canvas does not block interactions
          zIndex: 1, // Place above buttons
        }}
        camera={{ position: [0, 0.35, 0.8] }}
      >
        <RainbowTrail />
      </Canvas>





      {quackText.map(({ id, position, offsetY }) => (
        <div
          key={id}
          style={{
            position: 'absolute',
            top: position.y - offsetY,
            left: position.x,
            fontSize: '24px',
            color: '#F7DF1E',
            fontWeight: 'bold',
            animation: `flyUp 2s forwards`,
          }}
        >
          Quack
        </div>
      ))}

      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={50}
          recycle={false}
          gravity={0.2}
          confettiSource={{
            x: confettiPosition.x,
            y: confettiPosition.y - 160,
            w: 100,
            h: 100,
          }}
        />
      )}

      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '20px',
          backgroundColor: '#ddd',
          borderRadius: '10px',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: '#F7DF1E',
            borderRadius: '10px',
            transition: 'width 0.3s ease-in-out',
          }}
        />
      </div>

      <div
  style={{
    position: 'absolute',
    top: '30%',  // Adjusted for proper spacing under GitHub button
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',  // Space between buttons
    zIndex: 0,
  }}
      >
  <Link to="/csharp">
    <button
      style={{
        padding: '15px 30px',
        fontSize: '18px',
        cursor: 'pointer',
        backgroundColor: '#0078D7',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => (e.target.style.transform = 'scale(1.2)')}
      onMouseLeave={(e) => (e.target.style.transform = 'scale(1) ')}
    >
      C#
    </button>
  </Link>

  <Link to="/javascript">
    <button
      style={{
        padding: '15px 30px',
        fontSize: '18px',
        cursor: 'pointer',
        backgroundColor: '#F7DF1E',
        color: 'black',
        border: 'none',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => (e.target.style.transform = 'scale(1.2) ')}
      onMouseLeave={(e) => (e.target.style.transform = 'scale(1) ')}
    >
      JS
    </button>
  </Link>
      </div>

      <style>
        {`

          * {
            user-select: none;
          }

          @keyframes flyUp {
            0% {
              transform: translateY(0);
              opacity: 1;
            }
            100% {
              transform: translateY(-200px);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
}

function CSharpProject() {
  return <div style={{ padding: '20px' }}>This is the C# project!</div>;
}

function JavaScriptProject() {
  return <div style={{ padding: '20px' }}>This is the JS project!</div>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/csharp" element={<CSharpProject />} />
        <Route path="/javascript" element={<JavaScriptProject />} />
      </Routes>
    </Router>
  );
}

export default App;
