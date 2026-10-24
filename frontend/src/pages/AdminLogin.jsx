import React, { useState } from 'react';

export default function AdminLogin({ 
  username, 
  setUsername, 
  password, 
  setPassword, 
  handleAdminLogin, 
  setShowLoginModal 
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        flex: 1,
        minHeight: '75vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '50px 20px',
        width: '100%',
        boxSizing: 'border-box',
        background: 'radial-gradient(circle at 50% 35%, #e6fffa 0%, #f8fafc 65%, #f8fafc 100%)',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '40px 36px',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '430px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 20px 40px -12px rgba(15, 76, 92, 0.14), 0 2px 10px rgba(0, 0, 0, 0.03)',
          boxSizing: 'border-box',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* ✅ Path Finder அசல் Vector Compass Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <svg width="54" height="54" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#0f4c5c" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#ffffff" stroke="#ffffff" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Small Pill Tag */}
        <span
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '20px',
            backgroundColor: 'rgba(15, 76, 92, 0.08)',
            color: '#0f4c5c',
            fontSize: '11px',
            fontWeight: '800',
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          Path Finder Portal
        </span>

        {/* Header Title */}
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px' }}>
          Admin Portal Login
        </h2>
        <p style={{ fontSize: '13.5px', color: '#64748b', margin: '0 0 26px', lineHeight: '1.5' }}>
          Enter your authorized credentials to manage destinations and itineraries.
        </p>

        {/* Form Inputs */}
        <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px', textAlign: 'left' }}>
          
          {/* Username Input */}
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
              Username
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <span style={{ position: 'absolute', left: '14px', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
              <input
                type="text"
                required
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                  fontSize: '14px',
                  color: '#0f172a',
                  backgroundColor: '#ffffff',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#0f766e';
                  e.target.style.boxShadow = '0 0 0 3px rgba(15, 118, 110, 0.12)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#cbd5e1';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
              Password
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <span style={{ position: 'absolute', left: '14px', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '12px',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                  fontSize: '14px',
                  color: '#0f172a',
                  backgroundColor: '#ffffff',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#0f766e';
                  e.target.style.boxShadow = '0 0 0 3px rgba(15, 118, 110, 0.12)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#cbd5e1';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Login Submit Button */}
          <button
            type="submit"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              backgroundColor: isHovered ? '#0b3945' : '#0f4c5c',
              color: '#ffffff',
              border: 'none',
              padding: '13px',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '14.5px',
              cursor: 'pointer',
              width: '100%',
              marginTop: '8px',
              boxShadow: '0 4px 15px rgba(15, 76, 92, 0.25)',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <span>Sign In to Dashboard</span>
            <span>→</span>
          </button>
        </form>

        {/* Back to Website Button */}
        <button
          onClick={() => setShowLoginModal(false)}
          style={{
            background: 'none',
            border: 'none',
            color: '#64748b',
            marginTop: '22px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#0f4c5c')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
        >
          <span>←</span> Back to Public Website
        </button>
      </div>
    </div>
  );
}