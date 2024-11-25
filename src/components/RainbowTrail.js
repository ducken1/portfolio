import React, { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

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
      float speedFactor = 10.0;  // Increase this value to make the transition faster
      float frequency = 6.0;   // More frequency components for more segments

      // Red, Green, Blue components with faster transitions
      float r = abs(sin(vUv.y * frequency - time * 0.5 * speedFactor));  // Red component
      float g = abs(sin(vUv.y * frequency - time * 0.5 * speedFactor + 2.0));  // Green component
      float b = abs(sin(vUv.y * frequency - time * 0.5 * speedFactor + 4.0));  // Blue component

      // Smooth the transitions
      float smoothR = smoothstep(0.0, 1.0, r);
      float smoothG = smoothstep(0.0, 1.0, g);
      float smoothB = smoothstep(0.0, 1.0, b);

      // Output the final color with smooth transitions
      gl_FragColor = vec4(smoothR, smoothG, smoothB, 0.8);

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

      
      const currentPosition = trailRef.current.position;

      
      currentPosition.lerp(vector, 0.3); 
      
      //const offset = new THREE.Vector3(0, distance / 100, 0.25);

    
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
      <cylinderGeometry args={[0.15, 0.02, 2, 32]} />
      <shaderMaterial attach="material" {...RainbowShaderMaterial}/>
      
    </mesh>
  );
}

export default RainbowTrail