// ConsoleText.js
import { useEffect } from 'react';
import './ConsoleText.css'; // Import the CSS file

function ConsoleText() {
useEffect(() => {
    // JavaScript function for the console text effect
    function consoleText(words, id, colors) {
      if (colors === undefined) colors = ['#fff'];
      let visible = true;
      const con = document.getElementById('console');
      let letterCount = 1;
      let x = 1;
      let waiting = false;
      const target = document.getElementById(id);
      target.setAttribute('style', 'color:' + colors[0]);

      window.setInterval(() => {
        if (letterCount === 0 && waiting === false) {
          waiting = true;
          target.innerHTML = styleText(words[0].substring(0, letterCount));
          window.setTimeout(() => {
            const usedColor = colors.shift();
            colors.push(usedColor);
            const usedWord = words.shift();
            words.push(usedWord);
            x = 1;
            target.setAttribute('style', 'color:' + colors[0]);
            letterCount += x;
            waiting = false;
          }, 1000);
        } else if (letterCount === words[0].length + 1 && waiting === false) {
          waiting = true;
          window.setTimeout(() => {
            x = -1;
            letterCount += x;
            waiting = false;
          }, 1000);
        } else if (waiting === false) {
          target.innerHTML = styleText(words[0].substring(0, letterCount));
          letterCount += x;
        }
      }, 120);

      window.setInterval(() => {
        if (visible === true) {
          con.className = 'console-underscore hidden';
          visible = false;
        } else {
          con.className = 'console-underscore';
          visible = true;
        }
      }, 400);
    }

    // Helper function to style the text
    function styleText(text) {
      if (text.length === 0) return text; // Handle empty strings gracefully
    
      let styledText = text;
    
      // Check if the first character is `<`
      if (text[0] === '<') {
        styledText = `<span style="color: white;">${text[0]}</span>` + text.slice(1);
      }
    
      // Check if the last character is `>`
      if (text[text.length - 1] === '>') {
        styledText =
          styledText.slice(0, styledText.length - 1) +
          `<span style="color: white;">${text[text.length - 1]}</span>`;
      }
    
      return styledText;
    }

    // Initialize the console text animation
    consoleText(
      ['<Innovation begins where the semicolon ends>', '<Software engineers: turning caffeine into functions since forever>', '<If code is poetry, we/’re writing an epic every day>', '<Ctrl+C and Ctrl+V — the foundation of modern programming>'],
      'text',
      ['hotpink', 'lightcoral', 'sandybrown', 'indianred']
    );
  }, []);
}
export default ConsoleText;
