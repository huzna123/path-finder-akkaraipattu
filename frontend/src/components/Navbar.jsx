import React from 'react';
import { FaCompass, FaHome, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

export default function Navbar({ setCurrentView, setShowLoginModal, planCount }) {
  
  // பொதுவான லிங்க் ஸ்டைல்
  const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    color: '#475569',
    backgroundColor: 'transparent',
    padding: '8px 16px',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '15px',
    transition: 'all 0.25s ease-in-out',
    textDecoration: 'none'
  };

  return (
    <nav style={{ 
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
      padding: '16px 50px', backgroundColor: '#ffffff', position: 'sticky', 
      top: 0, zIndex: 1000, boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
      borderBottom: '1px solid #e2e8f0', width: '100%', boxSizing: 'border-box'
    }}>
      
      {/* Logo Section */}
      <h2 
        style={{ 
          display: 'flex', alignItems: 'center', gap: '10px', 
          color: '#0f4c5c', margin: 0, cursor: 'pointer', fontSize: '20px', fontWeight: '800' 
        }} 
        onClick={() => setCurrentView('home')}
      >
        <FaCompass size={24} />
        Path Finder Akkaraipattu
      </h2>

      {/* Navigation Links */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        
        <span 
          onClick={() => setCurrentView('home')} 
          style={linkStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ecfdf5'; // லேசான பச்சை நிறம் (Light Green Background)
            e.currentTarget.style.color = '#047857';         // அடர் பச்சை எழுத்து (Emerald Green Text)
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#475569';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <FaHome size={18} /> Home
        </span>
        
        <span 
          onClick={() => setCurrentView('places')} 
          style={linkStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ecfdf5';
            e.currentTarget.style.color = '#047857';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#475569';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <FaMapMarkerAlt size={18} /> Places
        </span>
        
        <span 
          onClick={() => setCurrentView('plan')} 
          style={linkStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ecfdf5';
            e.currentTarget.style.color = '#047857';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#475569';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <FaCalendarAlt size={18} /> 
          Plan My Day {planCount > 0 && `(${planCount})`}
        </span>

      </div>

      {/* Sign In Button */}
      <button 
        onClick={() => setShowLoginModal(true)} 
        style={{ 
          backgroundColor: '#0f4c5c', color: '#fff', border: 'none', 
          padding: '10px 22px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer',
          transition: 'all 0.2s ease', boxShadow: '0 4px 12px rgba(15, 76, 92, 0.2)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#0b3844';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#0f4c5c';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Sign In
      </button>

    </nav>
  );
}