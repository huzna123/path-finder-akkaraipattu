import React from 'react';
import welBg from '../assets/wel.png'; 

export default function Welcome({ setCurrentView }) {
  return (
    <div style={{ 
      width: '100vw', height: '100vh', margin: 0, padding: 0, boxSizing: 'border-box',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url(${welBg})`, 
      backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center', color: '#fff', overflow: 'hidden', position: 'fixed', top: 0, left: 0
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '720px', padding: '0 20px', boxSizing: 'border-box' }}>
        <h2 style={{ margin: '0 0 14px', fontSize: '18px', fontWeight: '800', color: '#ffffff', letterSpacing: '0.5px', textAlign: 'center', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
          Path Finder Akkaraipattu
        </h2>
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.94)', backdropFilter: 'blur(12px)', padding: '40px 30px', borderRadius: '24px', textAlign: 'center', width: '100%', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', color: '#0f172a', boxSizing: 'border-box' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: '0 0 10px', lineHeight: '1.2' }}>Discover the Untamed Beauty of the East</h1>
          <p style={{ fontSize: '15px', color: '#475569', margin: '0 0 25px', fontWeight: '500' }}>Experience the magic of Akkaraipattu – where heritage meets the horizon.</p>
          <button onClick={() => setCurrentView('home')} style={{ backgroundColor: '#0f4c5c', color: '#fff', border: 'none', padding: '13px 28px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 6px 15px rgba(15, 76, 92, 0.35)', transition: 'all 0.2s ease' }}>
            ENTER TO HOME PAGE →
          </button>
        </div>
      </div>
    </div>
  );
}