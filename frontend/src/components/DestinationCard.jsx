import React, { useState } from 'react';

export default function DestinationCard({ dest, onExplore }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const defaultImage = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80';
  const imageUrl = dest.image || defaultImage;

  return (
    <div
      onClick={() => onExplore && onExplore(dest)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid #cbd5e1',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isHovered
          ? '0 18px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)'
          : '0 2px 6px rgba(0, 0, 0, 0.03)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
        height: '100%',
        position: 'relative',
      }}
    >
      {/* --- Image Container --- */}
      <div style={{ height: '210px', width: '100%', overflow: 'hidden', position: 'relative' }}>
        <img
          src={imageUrl}
          alt={dest.title}
          onError={(e) => { e.target.src = defaultImage; }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Minimal Gradient Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 40%, rgba(0,0,0,0.35) 100%)',
          }}
        />

        {/* Modern Frosted-Glass Category Tag */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: '#ffffff',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
          }}
        >
          {dest.category || 'Attraction'}
        </div>

        {/* Clean Vector Bookmark / Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsSaved(!isSaved);
          }}
          aria-label="Save to favorites"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(4px)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            color: isSaved ? '#ef4444' : '#475569',
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={isSaved ? '#ef4444' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      </div>

      {/* --- Card Body --- */}
      <div
        style={{
          padding: '18px 20px 16px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* ✅ Location மட்டும் (Rating ⭐ முற்றிலும் நீக்கப்பட்டுள்ளது) */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#0f766e',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {dest.location || 'Akkaraipattu'}
            </span>
          </div>

          {/* Place Title */}
          <h3
            style={{
              margin: '0 0 8px 0',
              fontSize: '16.5px',
              fontWeight: '700',
              color: isHovered ? '#0f766e' : '#0f172a',
              letterSpacing: '-0.3px',
              lineHeight: '1.35',
              transition: 'color 0.2s ease',
            }}
          >
            {dest.title}
          </h3>

          {/* Description */}
          <p
            style={{
              fontSize: '13px',
              color: '#64748b',
              margin: '0 0 16px 0',
              lineHeight: '1.55',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {dest.description}
          </p>
        </div>

        {/* --- Minimalist Modern Footer Row --- */}
        <div
          style={{
            borderTop: '1px solid #f1f5f9',
            paddingTop: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#0f766e',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>Explore Place</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                transition: 'transform 0.2s ease',
              }}
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>

          <span
            style={{
              fontSize: '11px',
              color: '#94a3b8',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Verified
          </span>
        </div>
      </div>
    </div>
  );
}