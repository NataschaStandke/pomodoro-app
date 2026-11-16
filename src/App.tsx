/// <reference types="./custom" />

import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

import soundEffect from './assets/among-us-alarme-sabotage.mp3';

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [motivation, setMotivation] = useState("");

  const audio = useMemo(() => new Audio(soundEffect), []);

  const motivationalQuotes = useMemo(() => [
    "Tschakka!",
    "Push it!",
    "Tits up!",
    "Believe in your selfie!"
  ], []);

  const breakQuotes = useMemo(() => [
    "SnackieSnacks!",
    "Love you <3",
    "Stay hydrated, bitch!",
    "Relax, nothing is under control!"
  ], []);

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
  }, [isRunning, isBreak, breakQuotes, motivationalQuotes]);

  // Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    switchMode(false);
  }, []);

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      audio.play();
      setIsRunning(false);
      setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
    }
  }, [timeLeft, audio, isBreak, isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const switchMode = (breakMode: boolean) => {
    setIsBreak(breakMode);
    setIsRunning(false);
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

  const handleClose = () => {
    if (window.electronAPI?.closeApp) {
      window.electronAPI.closeApp();
    } else if (typeof window.close === 'function') {
      window.close();
    } else {
      console.warn("Electron API not available and window.close is not callable");
    }
  }

  return (
    <main className="app-container">
      <button className="close-button" onClick={handleClose} aria-label="Close app">×</button>
      <div className="home-content">
        <section className="timer-card" aria-label="Pomodoro timer">
          <div className="home-controls" aria-label="Choose timer mode">
            <button className={`mode-button${!isBreak ? ' selected' : ''}`} onClick={() => switchMode(false)} aria-pressed={!isBreak}>
              Focus
            </button>
            <button className={`mode-button${isBreak ? ' selected' : ''}`} onClick={() => switchMode(true)} aria-pressed={isBreak}>
              Break
            </button>
          </div>
          <p className={`motivation-quotes${!isRunning ? " hidden" : ""}`} aria-live="polite">{motivation}</p>
          <h1 className="home-timer">{formatTime(timeLeft)}</h1>
          <button className="home-button" onClick={handleStart}>{isRunning ? 'Reset' : 'Start'}</button>
        </section>
      </div>
    </main>
  );
}

export default App;
