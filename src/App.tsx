import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import concentrateImg from './assets/concentrate_active.png';
import breakImg from './assets/break_active.png';
import concentraImgInactive from './assets/concentrate_inactive.png';
import breakImgInactive from './assets/break_inactive.png';
import closeImg from './assets/close.png';
import soundEffect from './assets/sound-effect.mp3';

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [breakButtonImage, setBreakButtonImage] = useState(breakImg);
  const [concentrateButtonImage, setConcentrateButtonImage] = useState(concentrateImg);
  const [isBreak, setIsBreak] = useState(false);
  const [motivation, setMotivation] = useState("");

  const motivationalQuotes = [
    "Tschakka!",
    "Push it!",
    "Tits up!",
    "Believe in your selfie!"
  ];

  const breakQuotes = [
    "SnackieSnacks!",
    "Love you <3",
    "Stay hydrated, bitch!",
    "Relax, nothing is under control!"
  ];

  // Motivational Quotes Updater
  useEffect(() => {
    let quoteInterval: NodeJS.Timeout;
    if (isRunning) {
      const quotes = isBreak ? breakQuotes : motivationalQuotes;
      setMotivation(quotes[Math.floor(Math.random() * quotes.length)]);
      quoteInterval = setInterval(() => {
        setMotivation(quotes[Math.floor(Math.random() * quotes.length)]);
      }, 10000);
    } else {
      setMotivation(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
    }
    return () => clearInterval(quoteInterval);
  }, [isRunning, isBreak]);

  // Timer
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

  const switchMode = (breakMode: boolean) => {
    setIsBreak(breakMode);
    setIsRunning(false);
    setBreakButtonImage(breakMode ? breakImgInactive : breakImg);
    setConcentrateButtonImage(breakMode ? concentrateImg : concentraImgInactive);
    setTimeLeft(breakMode ? 5 * 60 : 25 * 60);
  };

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
      setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
    }
  };

  return (
    <div style={{ position: 'relative' }}>

      <div>
        <button className="close-button">
          <img src={closeImg} alt="Close" />
        </button>
      </div>

      <div className="home-content">
        <div className="home-controls">
          <button className="image-button" onClick={() => switchMode(false)}><img src={concentrateButtonImage} alt="Concentrate" /></button>
          <button className="image-button" onClick={() => switchMode(true)}><img src={breakButtonImage} alt="Break" /></button>
        </div>

        <p className={`motivation-quotes${!isRunning ? " hidden" : ""}`}>{motivation}</p>
        <h1 className="home-timer">{formatTime(timeLeft)}</h1>
        <button className="home-button" onClick={handleStart}>{isRunning ? "Stop" : "Start"}</button>
      </div>
    </div >
  );
}

export default App;
