import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// The Duck component
function Duck() {
  const { scene } = useGLTF('/3D-assets/duck.glb');
  scene.rotation.y = -Math.PI / 2;
  return <primitive object={scene} scale={2} />;
}

function Home() {
  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <Canvas camera={{ position: [0, 0.5, 0.5] }}> {/* Adjusted the camera position */}
        {/* Lighting */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 10]} />

        {/* OrbitControls with zoom and rotation restrictions */}
        <OrbitControls
          enableZoom={false} // Disables zooming
          maxPolarAngle={Math.PI / 2.2} // Restricts vertical rotation (looking down)
          minPolarAngle={Math.PI / 3} // Restricts upward rotation
        />

        {/* Duck model closer with adjusted scale */}
        <Duck />
      </Canvas>

      {/* Navigation buttons */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '10px',
        }}
      >
        {/* C# Button */}
        <Link to="/csharp">
          <button
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#0078D7',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) =>
              (e.target.style.transform = 'scale(1.05)')
            }
            onMouseLeave={(e) =>
              (e.target.style.transform = 'scale(1)')
            }
          >
            C#
          </button>
        </Link>

        {/* JavaScript Button */}
        <Link to="/javascript">
          <button
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#F7DF1E',
              color: 'black',
              border: 'none',
              borderRadius: '5px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) =>
              (e.target.style.transform = 'scale(1.05)')
            }
            onMouseLeave={(e) =>
              (e.target.style.transform = 'scale(1)')
            }
          >
            JS
          </button>
        </Link>
      </div>
    </div>
  );
}



// Example project pages
function CSharpProject() {
  return <div style={{ padding: '20px' }}>This is the C# project!</div>;
}

function JavaScriptProject() {
  return <div style={{ padding: '20px' }}>This is the JS project!</div>;
}

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />
        {/* Project-specific pages */}
        <Route path="/csharp" element={<CSharpProject />} />
        <Route path="/javascript" element={<JavaScriptProject />} />
        {/* Add more routes for other languages */}
      </Routes>
    </Router>
  );
}

export default App;
