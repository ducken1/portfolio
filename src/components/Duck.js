import React, { useState, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';

function Duck({ color, resetKey }) {
    const { scene } = useGLTF('/3D-assets/duck.glb'); // Load the duck model
    const duckRef = useRef();
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const initialColor = useRef({});
  
    useEffect(() => {
      if (duckRef.current) {
        duckRef.current.position.y = -0.8
  
  
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

  export default Duck