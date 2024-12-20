import React from 'react';
import VantaBackground from './VantaBackground';
import RainbowTrail from './RainbowTrail';
import Duck from './Duck';
import QuackHandler from './QuackHandler';
import TextMorph from './TextMorph';
import ConsoleText from './ConsoleText';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import './Home.css'; // Import the CSS file

function Home() {
  const { quackText, duckColor, resetKey, addQuack, setLastClickTime } = QuackHandler();

  const vantaRef = VantaBackground();

  TextMorph();

 ConsoleText();
  

  const handleClick = (e) => {
    if (e.target.tagName === 'BUTTON') return;

    const position = { x: e.clientX, y: e.clientY };
    addQuack(position);

    setLastClickTime(Date.now());
  };

  return (
    <div className="homeContainer" onClick={handleClick}>
      <div className="container">Luka Lašič</div>

        {/* GitHub Button */}
  <a href="https://github.com/ducken1" target="_blank" rel="noopener noreferrer" className="github-button">
    <img src="/github-icon.png" alt="GitHub" className="github-logo" />
  </a>

      <div id="container">
  <span id="text1"></span>
  <span id="text2"></span>
</div>

     {/* About Me Section */}
     <div className="cardContainer">
        <div className="card">
          <div></div>
          <div className="console-container">
        <span id="text"></span>
        <div className="console-underscore" id="console">
          &#95;
        </div>
      </div>
{/*           <p>
          Code is more than syntax—it's a way to shape the future. With JavaScript, Python, and C#, I craft solutions that bridge ideas to reality. Every project is an opportunity to innovate, refine, and grow
          </p> */}

<div className="footer-container">
<div className="spacer"></div>  {/* Spacer element */}
  <p className="card-footer">Maribor / Ptuj</p>
  <p className="cv-link">
    <a href="/cv.pdf" className="cv-text" target="_blank" rel="noopener noreferrer">View CV</a>
  </p>
</div>
        </div>
      </div>
        
<svg id="filters">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>


      <div ref={vantaRef} className="vantaBackground"></div>



      
     <div className="test">Programmer</div>
      

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
      <Canvas className="rainbow-trail" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} camera={{ position: [0, 0.35, 0.8] }}>
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
