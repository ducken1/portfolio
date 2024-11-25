import React from 'react';
import VantaBackground from './VantaBackground';
import RainbowTrail from './RainbowTrail';
import Duck from './Duck';
import QuackHandler from './QuackHandler';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import './Home.css'; // Import the CSS file

function Home() {
  const { quackText, duckColor, resetKey, addQuack, setLastClickTime } = QuackHandler();

  const vantaRef = VantaBackground();
  

  const handleClick = (e) => {
    if (e.target.tagName === 'BUTTON') return;

    const position = { x: e.clientX, y: e.clientY };
    addQuack(position);

    setLastClickTime(Date.now());
  };

  return (
    <div className="homeContainer" onClick={handleClick}>
      <div className="container">Luka Lašič</div>

      <div className="test">Computer Science Graduate</div>
      
      <div ref={vantaRef} className="vantaBackground"></div>
      <div className="neonBorder"></div>
{/*       <div className="cardContainer">
        <div className="card leftCard">
          <h1>Luka Lašič</h1>
          <p>A passionate Computer Science major with a love for coding, exploring new technologies, and building innovative projects.</p>
        </div>
        <div className="card rightCard">
          <a href="https://github.com/ducken1" target="_blank" rel="noopener noreferrer">
            <button>GitHub</button>
          </a>
          <Link to="/csharp">
            <button>C#</button>
          </Link>
          <Link to="/javascript">
            <button>JS</button>
          </Link>
        </div>
      </div> */}
      <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }} camera={{ position: [0, 0.35, 0.8] }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 10]} />
        <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
        <Duck color={duckColor} resetKey={resetKey} />
      </Canvas>
      <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} camera={{ position: [0, 0.35, 0.8] }}>
        <RainbowTrail />
      </Canvas>
      {quackText.map(({ id, position, offsetY }) => (
        <div key={id} className="flyUp" style={{ position: 'absolute', top: position.y - offsetY, left: position.x, fontSize: '24px', color: '#F7DF1E', fontWeight: 'bold' }}>
          Quack
        </div>
      ))}
    </div>
  );
}

export default Home;
