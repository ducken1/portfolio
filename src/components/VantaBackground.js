import  {useEffect, useRef } from 'react';
import BIRDS from "vanta/dist/vanta.birds.min";


const VantaBackground = () => {
    const vantaRef = useRef(null);
  
    useEffect(() => {
      const vantaEffect = BIRDS({
        el: vantaRef.current,
        backgroundColor: 0x1c1c1c         , // deep grey
        backgroundAlpha: 1,
        color1: 0x5d3fd3         , // blue
        color2: 0xff69b4         , // light teal
        colorMode: "varianceGradient",
        quantity: 4,
        birdSize: 0.85,
        wingSpan: 15,
        speedLimit: 4,
        separation: 30,
        alignment: 15,
        cohesion: 10,
      });
      return () => {
        if (vantaEffect) vantaEffect.destroy(); // Cleanup Vanta.js effect on unmount
      };
    }, []);
  
    return vantaRef;
  };

  export default VantaBackground;