import React, { useState } from 'react';
import { FaInstagram, FaGlobe, FaEnvelope, FaYoutube, FaCompass } from 'react-icons/fa';

export default function Footer({ setCurrentView, setShowLoginModal, transparent }) {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter a valid email address.');
      return;
    }
    alert('✨ Thank you for subscribing to Path Finder Akkaraipattu!');
    setEmail('');
  };

  return (
    <footer style={{
      backgroundColor: '#0f172a',
      color: '#94a3b8',
      padding: '70px 40px 30px',
      borderTop: '3px solid #38bdf8',
      width: '100%',
      boxSizing: 'border-box',
      marginTop: 'auto',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1fr 1.8fr',
        gap: '25px',
        marginBottom: '50px',
        alignItems: 'start'
      }}>
        
        {/* Brand Column */}
        <div style={{ textAlign: 'left' }}>
          <h3 style={{ color: '#ffffff', fontSize: '18px', fontWeight: '800', marginBottom: '12px', marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaCompass size={20} color="#38bdf8" /> Path Finder Akkaraipattu
          </h3>
          <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#94a3b8', marginBottom: '20px', margin: 0 }}>
            Connecting you to the beauty, culture, and hidden gems of Akkaraipattu. Let us be your guide to unforgettable local experiences.
          </p>
          <div style={{ display: 'flex', gap: '15px', fontSize: '18px', color: '#38bdf8', alignItems: 'center' }}>
            <FaInstagram style={{ cursor: 'pointer' }} />
            <FaGlobe style={{ cursor: 'pointer' }} />
            <FaEnvelope style={{ cursor: 'pointer' }} />
            <FaYoutube style={{ cursor: 'pointer' }} />
          </div>
        </div>

        {/* Discover */}
        <div style={{ textAlign: 'left' }}>
          <h4 style={{ color: '#ffffff', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', marginTop: 0 }}>
            Discover
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#94a3b8' }}>
            <li style={{ cursor: 'pointer' }}>Must-Visit Spots</li>
            <li style={{ cursor: 'pointer' }}>Local Cuisine</li>
            <li style={{ cursor: 'pointer' }}>Hidden Gems</li>
            <li style={{ cursor: 'pointer' }}>Photo Gallery</li>
            <li style={{ cursor: 'pointer' }}>Cultural Heritage</li>
          </ul>
        </div>

        {/* Plan Trip */}
        <div style={{ textAlign: 'left' }}>
          <h4 style={{ color: '#ffffff', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', marginTop: 0 }}>
            Plan Trip
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#94a3b8' }}>
            <li>
              <span onClick={() => { setCurrentView('plan'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ cursor: 'pointer', color: '#94a3b8' }}>
                Itineraries
              </span>
            </li>
            <li style={{ cursor: 'pointer' }}>Travel Tips</li>
            <li style={{ cursor: 'pointer' }}>Weather Guide</li>
            <li style={{ cursor: 'pointer' }}>Transportation</li>
            <li style={{ cursor: 'pointer' }}>Tour Guides</li>
          </ul>
        </div>

        {/* Company */}
        <div style={{ textAlign: 'left' }}>
          <h4 style={{ color: '#ffffff', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', marginTop: 0 }}>
            Company
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#94a3b8' }}>
            <li style={{ cursor: 'pointer' }}>About Us</li>
            <li style={{ cursor: 'pointer' }}>Our Story</li>
            <li style={{ cursor: 'pointer' }}>Careers</li>
            <li style={{ cursor: 'pointer' }}>Press Kit</li>
            <li style={{ cursor: 'pointer' }}>Contact Us</li>
            <li>
              <span onClick={() => setShowLoginModal(true)} style={{ cursor: 'pointer', color: '#38bdf8', fontWeight: '700' }}>
                Admin Login
              </span>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div style={{ textAlign: 'left' }}>
          <h4 style={{ color: '#ffffff', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', marginTop: 0 }}>
            Legal
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#94a3b8' }}>
            <li style={{ cursor: 'pointer' }}>Privacy Policy</li>
            <li style={{ cursor: 'pointer' }}>Terms of Service</li>
            <li style={{ cursor: 'pointer' }}>Cookie Policy</li>
            <li style={{ cursor: 'pointer' }}>Accessibility</li>
          </ul>
        </div>

        {/* Stay Connected Card */}
        <div style={{ backgroundColor: '#1e293b', padding: '22px', borderRadius: '16px', border: '1px solid #334155', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', textAlign: 'left' }}>
          <h4 style={{ color: '#ffffff', fontSize: '15px', fontWeight: '800', marginBottom: '8px', marginTop: 0 }}>
            Stay Connected
          </h4>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '14px', lineHeight: '1.5', margin: '0 0 14px 0' }}>
            Get the latest travel tips and local updates straight to your inbox.
          </p>
          <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
            />
            <button 
              type="submit"
              style={{ backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Bar */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        paddingTop: '25px',
        borderTop: '1px solid #1e293b',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px',
        fontSize: '12px',
        color: '#94a3b8'
      }}>
        <p style={{ margin: 0 }}>
          © 2026 Path Finder Akkaraipattu. All rights reserved.
        </p>
        
        <span 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          style={{ cursor: 'pointer', fontWeight: '700', color: '#38bdf8' }}
        >
          Back to Top ↑
        </span>
      </div>
    </footer>
  );
}