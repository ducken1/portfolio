import { useEffect } from "react";

import './TextMorph.css'

const TextMorph = () => {
    useEffect(() => {
        const texts = [
          "Frontend Magic",
          "Backend Logic",
          "FullStack Quest",
        ];
    
    
        const elts = {
          text1: document.getElementById("text1"),
          text2: document.getElementById("text2")
      };
    
        const morphTime = 1.3; // Duration of morphing in seconds
        const cooldownTime = 0.33; // Duration of cooldown in seconds
    
        let textIndex = texts.length - 1;
        let morph = 0.3; // Time spent morphing
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
    }
export default TextMorph;
