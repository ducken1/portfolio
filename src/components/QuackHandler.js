import { useState, useEffect } from 'react';

function QuackHandler() {
    const [quackText, setQuackText] = useState([]);
    const [duckColor, setDuckColor] = useState(null);
    const [quackCount, setQuackCount] = useState(0); // Tracks the number of quacks
    const [lastClickTime, setLastClickTime] = useState(Date.now());
    const [resetKey, setResetKey] = useState(0);

    const addQuack = (position) => {
        const id = Date.now();
        const offsetY = Math.random() * 20; // Optional offset for variation
        setQuackText((prev) => [...prev, { id, position, offsetY }]);

        // Increment quack count and update duck color based on the count
        const newCount = quackCount + 1;
        setQuackCount(newCount);
        const redValue = Math.min(255, (newCount / 10) * 255); // Adjust the color dynamically
        setDuckColor(`rgb(${redValue}, 0, 0)`);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            if (Date.now() - lastClickTime > 2000) {
                // Reset everything after 2 seconds of idle time
                setResetKey((prev) => prev + 1); // Trigger reset for related components (like Duck)
                setQuackCount(0); // Reset quack count
                setDuckColor(null); // Reset duck color
            }
        }, 500);

        return () => clearInterval(timer); // Cleanup on component unmount
    }, [lastClickTime]);

    return {
        quackText,
        duckColor,
        resetKey,
        addQuack,
        setLastClickTime,
    };
}

export default QuackHandler;
