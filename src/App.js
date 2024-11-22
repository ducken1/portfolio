import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import Confetti from 'react-confetti';

function Duck({ color, resetKey }) {
  const { scene } = useGLTF('/3D-assets/duck.glb'); // Load the duck model
  const duckRef = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const initialColor = useRef({});

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
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (duckRef.current) {
      // Rotate duck based on mouse position
      const { x, y } = mouse;
      duckRef.current.rotation.y = -Math.PI / 2 + x * Math.PI / 4;
      duckRef.current.rotation.x = -y * Math.PI / 8;
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

  scene.position.y = -0.15;

  return <primitive ref={duckRef} object={scene} scale={3} />;
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

  useEffect(() => {
    const resetProgressBar = () => {
      setQuackCount(0);
      setProgress(0);
      setResetKey((prev) => prev + 1);
    };

    const timer = setInterval(() => {
      if (Date.now() - lastClickTime > 3000) {
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
      <Canvas camera={{ position: [0, 0.35, 0.8] }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 10]} />
        <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
        <Duck color={duckColor} resetKey={resetKey} />
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
          top: '42%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          gap: '500px',
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
              transform: 'rotate(-15deg)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05) rotate(-15deg)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1) rotate(-15deg)')}
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
              transform: 'rotate(15deg)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05) rotate(15deg)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1) rotate(15deg)')}
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
