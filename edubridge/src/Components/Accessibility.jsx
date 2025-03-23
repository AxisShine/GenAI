import React, { useState } from 'react';
import accessibility from '../assets/accessibility.png'; 
import constrast from '../assets/constrast.png'; 
import texttospeech from '../assets/tos.png'; 
import biggertext from '../assets/bigger.png'; 
import dyslexiafriendly from '../assets/dyslexiafriendly.png'; 
import lineheight from '../assets/line.svg'; 
import saturation from '../assets/saturation.png'; 
import speechtotext from '../assets/speechtotext.png';
import darkmode from '../assets/darkmode.png';
function AccessibilityPanel({ onClose }) {
  const options = [
    { label: 'Contrast +', icon: constrast },
    { label: 'Text to Speech', icon: texttospeech },
    { label: 'Bigger Text', icon: biggertext },
    { label: 'Speech to Text', icon: speechtotext },
    { label: 'Dyslexia Friendly', icon: dyslexiafriendly },
    { label: 'Line Height', icon: lineheight },
    { label: 'Saturation', icon: saturation },
    { label: 'Dark mode', icon: darkmode },


  ];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '5rem',
        right: '2rem',
        backgroundColor: 'white',
        padding: '1rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        zIndex: 1001,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.5rem',
      }}
    >
      <button onClick={onClose}>Close</button>
      {options.map((option) => (
        <div
          key={option.label}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        >
          <img
            src={option.icon}
            alt={option.label}
            style={{ width: '2rem', height: '2rem' }}
          />
          <p style={{ marginTop: '0.5rem', textAlign: 'center' }}>{option.label}</p>
        </div>
      ))}
    </div>
  );
}

function AccessibilityButton() {
  const [panelVisible, setPanelVisible] = useState(false);

  const togglePanel = () => {
    setPanelVisible(!panelVisible);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        id="accessibility-button"
        aria-label="Accessibility Options"
        onClick={togglePanel}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '3rem',
          height: '3rem',
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        <img
          src={accessibility}
          alt="Accessibility Icon"
          style={{ width: '100%', height: '100%' }}
        />
      </button>

      {panelVisible && <AccessibilityPanel onClose={togglePanel} />}
    </div>
  );
}

export default AccessibilityButton;