import React from 'react';
import VantaBackground from './VantaBackground';
import RainbowTrail from './RainbowTrail';
import Duck from './Duck';
import QuackHandler from './QuackHandler';

import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls,  } from '@react-three/drei';

function Home() {
    const {
        quackText,
        duckColor,
        resetKey,
        addQuack,
        setLastClickTime,
    } = QuackHandler();
  
    const vantaRef = VantaBackground(); // Hook to initialize Vanta.js effect
  
  
    const handleClick = (e) => {
      if (e.target.tagName === 'BUTTON') return;
  
        const position = { x: e.clientX, y: e.clientY };
        addQuack(position); // Use the addQuack function

  
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
  
    {/* Neon Border */}
    <div
      style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        right: '20px',
        bottom: '20px',
        border: '1px solid rgba(138, 43, 226, 0.8)', // Neon purple border
        borderRadius: '15px', // Optional rounded corners
        boxShadow: '0 0 5px rgba(138, 43, 226, 0.8), 0 0 25px rgba(138, 43, 226, 0.5)', // Glow effect
        pointerEvents: 'none', // Ensure the border doesn't block interactions
      }}
    ></div>
  
  
              {/* Main Container for the Cards */}
              <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70%',
            zIndex: 1,
          }}
        >
  {/* Updated Left Card */}
  <div
    style={{
      width: '60%',
      maxWidth: '500px',
      height: '250px', // Increased height
      padding: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      border: '1px solid transparent',
      borderRadius: '20px',
      boxShadow: '0px 15px 25px rgba(0, 0, 0, 0.6)',
      backgroundImage: 'linear-gradient(to bottom right, #333, #111), linear-gradient(to bottom right, #ff8a00, #e52e71)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'content-box, border-box',
      transform: 'translateZ(0) scale(1)',
      transition: 'transform 0.3s, box-shadow 0.3s',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateZ(10px) scale(1.05)';
      e.currentTarget.style.boxShadow = '0px 20px 40px rgba(0, 0, 0, 0.8)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateZ(0) scale(1)';
      e.currentTarget.style.boxShadow = '0px 15px 25px rgba(0, 0, 0, 0.6)';
    }}
  >
    <h1
      style={{
        fontSize: '36px',
        color: '#fff',
        margin: 0,
        textAlign: 'center',
      }}
    >
      Luka Lašič
    </h1>
    <p
      style={{
        color: '#ddd',
        textAlign: 'center',
        marginTop: '20px',
        fontSize: '18px',
      }}
    >
      A passionate Computer Science major with a love for coding, exploring new technologies, and building innovative projects.
    </p>
  </div>
  
  {/* Updated Right Card */}
  <div
    style={{
      width: '30%',
      maxWidth: '300px',
      height: '250px', // Increased height
      padding: '10px',
      marginLeft: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      border: '1px solid transparent',
      borderRadius: '20px',
      boxShadow: '0px 15px 25px rgba(0, 0, 0, 0.6)',
      backgroundImage: 'linear-gradient(to bottom right, #333, #111), linear-gradient(to bottom right, #8e2de2, #4a00e0)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'content-box, border-box',
      transform: 'translateZ(0) scale(1)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      display: 'flex', // Add flexbox to center content
      justifyContent: 'center', // Center horizontally
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateZ(10px) scale(1.05)';
      e.currentTarget.style.boxShadow = '0px 20px 40px rgba(0, 0, 0, 0.8)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateZ(0) scale(1)';
      e.currentTarget.style.boxShadow = '0px 15px 25px rgba(0, 0, 0, 0.6)';
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        marginTop: '20px'
      }}
    >
      <a href="https://github.com/ducken1" target="_blank" rel="noopener noreferrer">
        <button
          style={{
            padding: '12px',
            fontSize: '18px',
            width: '100px', // Ensure all buttons have the same width
            height: '50px', // Ensure all buttons have the same height
            cursor: 'pointer',
            backgroundColor: 'transparent',
            color: '#fff',
            border: '2px solid #fff',
            borderRadius: '8px',
            textAlign: 'center',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#fff';
            e.target.style.color = '#000'
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
             e.target.style.color = '#fff'
          }
          }
        >
          GitHub
        </button>
      </a>
      <Link to="/csharp">
        <button
          style={{
            padding: '12px',
            fontSize: '18px',
            width: '100px', // Ensure all buttons have the same width
            height: '50px', // Ensure all buttons have the same height
            cursor: 'pointer',
            backgroundColor: 'transparent',
            color: '#fff',
            border: '2px solid #fff',
            borderRadius: '8px',
            textAlign: 'center',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#fff';
            e.target.style.color = '#000'
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#fff'
          }}
        >
          C#
        </button>
      </Link>
      <Link to="/javascript">
        <button
          style={{
            padding: '12px',
            fontSize: '18px',
            width: '100px', // Ensure all buttons have the same width
            height: '50px', // Ensure all buttons have the same height
            cursor: 'pointer',
            backgroundColor: 'transparent',
            color: '#fff',
            border: '2px solid #fff',
            borderRadius: '8px',
            textAlign: 'center',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#fff';
             e.target.style.color = '#000'
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
             e.target.style.color = '#fff'
          }}
        >
          JS
        </button>
      </Link>
    </div>
  </div>
            </div>
        
  
        <Canvas   
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1, // Ensure the canvas is above the cards
            pointerEvents: 'none', // Prevent the canvas from blocking clicks
          }}      
          camera={{ position: [0, 0.35, 0.8] 
          }} >
  
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
  
  
  
        <style>
          {`
  
            * {
              user-select: none;
            }
  
  html, body {
    height: 100%;
    overflow: hidden; /* Prevent scrolling */
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

  export default Home