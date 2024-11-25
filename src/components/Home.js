import React, {  useEffect} from 'react';
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

  useEffect(() => {
    const texts = [
      "Frontend Magic",
      "Backend Logic",
      "Database Insights",
      "The Full-Stack Quest",
      "<3",
    ];


    const elts = {
      text1: document.getElementById("text1"),
      text2: document.getElementById("text2")
  };

    const morphTime = 1; // Duration of morphing in seconds
    const cooldownTime = 0.25; // Duration of cooldown in seconds

    let textIndex = texts.length - 1;
    let morph = 0; // Time spent morphing
    let cooldown = cooldownTime; // Cooldown timer
    let time = new Date();

    elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function setMorph(fraction) {
  elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  fraction = 1 - fraction;
  elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}


function doMorph() {
  morph -= cooldown;
  cooldown = 0;

  let fraction = morph / morphTime;

  if (fraction > 1) {
      cooldown = cooldownTime;
      fraction = 1;
  }

  setMorph(fraction);
}

function doCooldown() {
  morph = 0;

  elts.text2.style.filter = "";
  elts.text2.style.opacity = "100%";

  elts.text1.style.filter = "";
  elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

animate();

    return () => {
      // Cleanup animation
      morph = 0;
      cooldown = cooldownTime;
    };
  }, []);
  

  const handleClick = (e) => {
    if (e.target.tagName === 'BUTTON') return;

    const position = { x: e.clientX, y: e.clientY };
    addQuack(position);

    setLastClickTime(Date.now());
  };

  return (
    <div className="homeContainer" onClick={handleClick}>
      <div className="container">Luka Lašič</div>

      <div id="container">
  <span id="text1"></span>
  <span id="text2"></span>
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
