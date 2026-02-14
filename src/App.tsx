import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
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
        <h1 className="home-timer">25:00</h1>
        <button className="home-button">Start</button>
      </div>
    </div >
  );
}

export default App;
