import React, { useState } from 'react';
import DestinationCard from '../components/DestinationCard';
import DestinationDetail from './DestinationDetail';

export default function Places({ 
  loading, 
  error, 
  filteredDestinations = [], 
  searchQuery, 
  setSearchQuery, 
  categories = [], 
  selectedCategory, 
  setSelectedCategory, 
  onExplore,
  handleAddToPlan // 
}) {
  const [selectedPlace, setSelectedPlace] = useState(null);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
        <p style={{ color: '#0f766e', fontWeight: '600', fontSize: '16px' }}>Loading destinations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
        <p style={{ color: '#dc2626', fontWeight: '600', fontSize: '16px' }}>Error: {error}</p>
      </div>
    );
  }

  // விபரப் பக்கம் (Detail View) திறக்கும் போது சரியாக Plan-ல் சேர்க்கும் பகுதி
  if (selectedPlace) {
    return (
      <DestinationDetail 
        selectedDestination={selectedPlace} 
        setSelectedDestination={setSelectedPlace} 
        handleAddToPlan={(place) => {
          setSelectedPlace(null); // Detail view-வை மூடுகிறது
          if (handleAddToPlan) {
            handleAddToPlan(place); // App.jsx-ல் உள்ள Plan-ல் சேர்க்கிறது
          } else if (onExplore) {
            onExplore(place);
          }
        }} 
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', width: '100%' }}>
      
      {/* =========================================
          1. LUXURY TRAVEL HERO HEADER SECTION
         ========================================= */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '340px',
          backgroundImage: 'url("https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 20px 80px',
          boxSizing: 'border-box',
          textAlign: 'center',
        }}
      >
        {/* Dark Luxury Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.75) 0%, rgba(15, 76, 92, 0.85) 100%)',
          }}
        />

        {/* Hero Content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '780px', width: '100%' }}>
          {/* Small Location Pill Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '30px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#5eead4',
              fontSize: '12.5px',
              fontWeight: '600',
              marginBottom: '16px',
              letterSpacing: '0.5px',
            }}
          >
            <span>📍</span>
            <span>Eastern Province, Sri Lanka</span>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: '800',
              color: '#ffffff',
              margin: '0 0 12px',
              letterSpacing: '-0.8px',
              lineHeight: '1.2',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }}
          >
            Explore Akkaraipattu Places
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '16px',
              color: '#e2e8f0',
              margin: '0 auto 32px',
              maxWidth: '580px',
              lineHeight: '1.6',
              fontWeight: '400',
            }}
          >
            Discover ancient heritage, scenic coastlines, authentic cuisines, and plan your perfect itinerary with ease.
          </p>

          {/* Floating Modern Search Box (Airbnb Style) */}
          <div
            style={{
              maxWidth: '560px',
              margin: '0 auto',
              backgroundColor: '#ffffff',
              padding: '8px 12px',
              borderRadius: '50px',
              boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: '1px solid rgba(255, 255, 255, 0.8)',
            }}
          >
            <div style={{ paddingLeft: '10px', display: 'flex', alignItems: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>

            <input
              type="text"
              placeholder="Search beaches, restaurants, heritage spots..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '15px',
                color: '#1e293b',
                backgroundColor: 'transparent',
                padding: '6px 0',
              }}
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  border: 'none',
                  background: '#f1f5f9',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                  color: '#64748b',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            )}

            <button
              style={{
                backgroundColor: '#0f4c5c',
                color: '#ffffff',
                border: 'none',
                borderRadius: '40px',
                padding: '10px 22px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0b3945')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0f4c5c')}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* =========================================
          2. MAIN CONTENT AREA (CARDS & FILTERS)
         ========================================= */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '-30px auto 80px',
          padding: '0 24px',
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        {/* Floating Category Filter Bar */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '14px 22px',
            borderRadius: '16px',
            boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.07)',
            border: '1px solid #f1f5f9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '30px',
                    border: isActive ? '1px solid #0f4c5c' : '1px solid #e2e8f0',
                    backgroundColor: isActive ? '#0f4c5c' : '#f8fafc',
                    color: isActive ? '#ffffff' : '#475569',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '13px',
                    boxShadow: isActive ? '0 4px 12px rgba(15, 76, 92, 0.25)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Place Counter */}
          <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>
            Showing <strong style={{ color: '#0f172a' }}>{filteredDestinations.length}</strong> places
          </span>
        </div>

        {/* All Destinations Grid Layout */}
        {filteredDestinations.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px dashed #cbd5e1',
            }}
          >
            <p style={{ color: '#64748b', fontWeight: '600', fontSize: '16px', margin: 0 }}>
              No destinations found matching your criteria.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '28px',
            }}
          >
            {filteredDestinations.map((dest) => (
              <div
                key={dest._id || dest.id}
                onClick={() => setSelectedPlace(dest)}
                style={{ cursor: 'pointer', height: '100%' }}
              >
                <DestinationCard 
                  dest={dest} 
                  onExplore={() => setSelectedPlace(dest)} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}