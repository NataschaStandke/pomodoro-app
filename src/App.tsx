import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
      setTimeLeft(25 * 60);
    }
  };

  return (
    <div style={{ position: 'relative' }}>

      <div>
        <button className="close-button">Close</button>
      </div>

      <div className="home-content">
        <div className="home-controls">
          <button className="image-button">Concentrate</button>
          <button className="image-button">Take break</button>
        </div>

        <p>Tschakka!</p>
        <h1 className="home-timer">{formatTime(timeLeft)}</h1>
        <button className="home-button" onClick={handleStart}>{isRunning ? "Stop" : "Start"}</button>
      </div>
    </div >
  );
}

export default App;
