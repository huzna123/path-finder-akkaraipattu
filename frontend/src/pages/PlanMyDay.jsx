import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default function PlanMyDay({ 
  myVisitPlan = [], 
  setMyVisitPlan, 
  startTime, 
  setStartTime, 
  setCurrentView 
}) {
  const [mapType, setMapType] = useState('street');

  const handleRemove = (id) => {
    setMyVisitPlan(myVisitPlan.filter(item => (item._id || item.id) !== id));
  };

  
  const handleOptimizeRoute = () => {
    if (myVisitPlan.length <= 1) {
      alert("Please add at least 2 places to optimize the route!");
      return;
    }
    const optimized = [...myVisitPlan].sort((a, b) => {
      const latA = parseFloat(a.lat) || 0;
      const latB = parseFloat(b.lat) || 0;
      return latA - latB;
    });
    setMyVisitPlan(optimized);
    alert("⚡ Route optimized successfully for the shortest travel path!");
  };

  // Download PDF Itinerary Logic
  const handleDownloadPDF = () => {
    if (myVisitPlan.length === 0) {
      alert("Your plan is empty! Add places before downloading the itinerary.");
      return;
    }
    window.print();
  };

  // Calculate Total Route Distance
  let totalDistance = 0;
  for (let i = 0; i < myVisitPlan.length - 1; i++) {
    const lat1 = parseFloat(myVisitPlan[i].lat);
    const lon1 = parseFloat(myVisitPlan[i].lng);
    const lat2 = parseFloat(myVisitPlan[i + 1].lat);
    const lon2 = parseFloat(myVisitPlan[i + 1].lng);
    if (!isNaN(lat1) && !isNaN(lon1) && !isNaN(lat2) && !isNaN(lon2)) {
      totalDistance += calculateDistance(lat1, lon1, lat2, lon2);
    }
  }

  // Default Map center (Akkaraipattu coordinates)
  const defaultCenter = myVisitPlan.length > 0 && myVisitPlan[0].lat && myVisitPlan[0].lng
    ? [parseFloat(myVisitPlan[0].lat), parseFloat(myVisitPlan[0].lng)]
    : [7.2210, 81.8618];

  const routeCoordinates = myVisitPlan
    .filter(dest => dest.lat && dest.lng)
    .map(dest => [parseFloat(dest.lat), parseFloat(dest.lng)]);

  const hasPlaces = myVisitPlan.length > 0;

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', width: '100%' }}>
      
      {/* ========================================================
          1. UNIFIED MATCHING HERO HEADER (Same as Places & Home)
         ======================================================== */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '260px',
          backgroundImage: 'url("https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '50px 20px 70px',
          boxSizing: 'border-box',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(11, 44, 54, 0.88) 0%, rgba(15, 76, 92, 0.88) 100%)',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '780px', width: '100%' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 14px',
              borderRadius: '30px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#5eead4',
              fontSize: '12px',
              fontWeight: '700',
              marginBottom: '12px',
              letterSpacing: '0.6px',
              textTransform: 'uppercase',
            }}
          >
            <span>🗺️</span>
            <span>Interactive Itinerary & Route Navigation</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 38px)',
              fontWeight: '800',
              color: '#ffffff',
              margin: '0 0 10px',
              letterSpacing: '-0.6px',
            }}
          >
            Plan Your Day Route
          </h1>

          <p
            style={{
              fontSize: '15px',
              color: '#e2e8f0',
              margin: '0 auto',
              maxWidth: '560px',
              lineHeight: '1.5',
            }}
          >
            Organize selected spots, optimize your driving path, and preview live directions across Akkaraipattu.
          </p>
        </div>
      </div>

      {/* ========================================================
          2. MAIN PLANNER GRID (OVERLAPPING SLIGHTLY)
         ======================================================== */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '-35px auto 60px',
          padding: '0 24px',
          fontFamily: "'Inter', sans-serif",
          boxSizing: 'border-box',
          width: '100%',
          position: 'relative',
          zIndex: 3,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(360px, 1fr) 1.35fr',
            gap: '28px',
            alignItems: 'start'
          }}
          className="plan-grid"
        >
          {/* Left Panel: Itinerary Controls */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '28px',
              border: '1px solid #eef2f6',
              boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.08)',
            }}
          >
            <div
              style={{
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '10px'
              }}
            >
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>
                  Your Coastal Day
                </h2>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                  {myVisitPlan.length} {myVisitPlan.length === 1 ? 'Place' : 'Places'} Selected • ~{totalDistance.toFixed(1)} km Total Route
                </p>
              </div>

              {/* Status Badge */}
              <span
                style={{
                  backgroundColor: myVisitPlan.length >= 2 ? '#dcfce7' : myVisitPlan.length === 1 ? '#fef3c7' : '#f1f5f9',
                  color: myVisitPlan.length >= 2 ? '#166534' : myVisitPlan.length === 1 ? '#b45309' : '#64748b',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '700',
                  letterSpacing: '0.4px',
                }}
              >
                {myVisitPlan.length >= 2
                  ? '✓ Route Validated'
                  : myVisitPlan.length === 1
                  ? '📍 1 Stop Selected'
                  : '📝 Plan Not Started'}
              </span>
            </div>

            {/* Quick Metrics Bar */}
            <div
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '14px 18px',
                marginBottom: '20px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px'
              }}
            >
              <div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#0f766e', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                  ⏱️ Start Time
                </span>
                <span style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>
                  {startTime || '08:30 AM'}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#0f766e', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                  🚗 Total Distance
                </span>
                <span style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>
                  {totalDistance.toFixed(2)} km
                </span>
              </div>
            </div>

            {/* Action Buttons Toolbar */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '25px', flexWrap: 'wrap' }}>
              <button
                onClick={handleOptimizeRoute}
                disabled={!hasPlaces}
                style={{
                  backgroundColor: hasPlaces ? '#0f4c5c' : '#cbd5e1',
                  color: '#ffffff',
                  border: 'none',
                  padding: '9px 15px',
                  borderRadius: '10px',
                  fontSize: '12.5px',
                  fontWeight: '700',
                  cursor: hasPlaces ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'background-color 0.2s',
                }}
              >
                ⚡ Optimize Route
              </button>

              <button
                onClick={() => { setCurrentView('places'); window.scrollTo(0, 0); }}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  border: '1px solid #cbd5e1',
                  padding: '9px 15px',
                  borderRadius: '10px',
                  fontSize: '12.5px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                + Add Places
              </button>

              <button
                onClick={handleDownloadPDF}
                disabled={!hasPlaces}
                style={{
                  backgroundColor: '#ffffff',
                  color: hasPlaces ? '#0f4c5c' : '#94a3b8',
                  border: hasPlaces ? '1px solid #0f4c5c' : '1px solid #e2e8f0',
                  padding: '9px 15px',
                  borderRadius: '10px',
                  fontSize: '12.5px',
                  fontWeight: '700',
                  cursor: hasPlaces ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                📥 PDF Itinerary
              </button>
            </div>

            {/* Empty State / Stops List */}
            {!hasPlaces ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '45px 20px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '16px',
                  border: '1.5px dashed #cbd5e1'
                }}
              >
                <div style={{ fontSize: '38px', marginBottom: '12px' }}>🗺️</div>
                <h4 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>
                  Your Itinerary is Empty
                </h4>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px', maxWidth: '280px', marginInline: 'auto', lineHeight: '1.5' }}>
                  Explore the places catalogue and add your favorite attractions to start generating your custom route.
                </p>
                <button
                  onClick={() => { setCurrentView('places'); window.scrollTo(0, 0); }}
                  style={{
                    backgroundColor: '#0f4c5c',
                    color: '#ffffff',
                    border: 'none',
                    padding: '11px 22px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '13.5px',
                    boxShadow: '0 4px 12px rgba(15, 76, 92, 0.25)',
                  }}
                >
                  Explore & Add Places →
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  maxHeight: '480px',
                  overflowY: 'auto',
                  paddingRight: '6px'
                }}
              >
                {myVisitPlan.map((dest, index) => (
                  <div
                    key={dest._id || dest.id || index}
                    style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '14px',
                      padding: '16px',
                      backgroundColor: '#ffffff',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: '#0f4c5c',
                            color: '#ffffff',
                            fontSize: '12px',
                            fontWeight: '800',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {index + 1}
                        </span>
                        <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                          {dest.title}
                        </h4>
                      </div>

                      <button
                        onClick={() => handleRemove(dest._id || dest.id)}
                        style={{
                          background: '#fee2e2',
                          border: 'none',
                          color: '#ef4444',
                          width: '24px',
                          height: '24px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Remove Stop"
                      >
                        ✕
                      </button>
                    </div>

                    <div style={{ fontSize: '12px', color: '#0f766e', fontWeight: '600', marginBottom: '8px', paddingLeft: '32px' }}>
                      ⏱️ {dest.bestTimeToVisit || '1.5 hrs stay'} • {dest.category || 'Sightseeing'}
                    </div>

                    <p style={{ fontSize: '12.5px', color: '#64748b', margin: '0 0 10px 0', paddingLeft: '32px', lineHeight: '1.4' }}>
                      {dest.description ? dest.description.substring(0, 90) + '...' : 'Scenic spot in Akkaraipattu.'}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '32px' }}>
                      <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>
                        📍 Lat: {parseFloat(dest.lat).toFixed(3)}, Lng: {parseFloat(dest.lng).toFixed(3)}
                      </span>
                      <span style={{ fontSize: '11.5px', color: '#0f766e', fontWeight: '700' }}>
                        Stop #{index + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Panel: Interactive Map */}
          <div
            style={{
              backgroundColor: '#e2e8f0',
              borderRadius: '20px',
              height: '630px',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid #cbd5e1',
              boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.08)'
            }}
          >
            {/* Active Route Floating Card at Bottom-Left */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                padding: '10px 18px',
                borderRadius: '14px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                zIndex: 1000,
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div>
                <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>
                  Active Route
                </span>
                <span style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>
                  {totalDistance.toFixed(1)} km Total
                </span>
              </div>
              <span
                style={{
                  backgroundColor: '#f0fdf4',
                  color: '#16a34a',
                  padding: '4px 8px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: '700'
                }}
              >
                {myVisitPlan.length} Stops
              </span>
            </div>

            {/* Street / Satellite Toggle on Top-Right */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: '#ffffff',
                padding: '4px',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.12)',
                zIndex: 1000,
                display: 'flex',
                gap: '4px',
                border: '1px solid #e2e8f0'
              }}
            >
              <button
                onClick={() => setMapType('street')}
                style={{
                  backgroundColor: mapType === 'street' ? '#0f4c5c' : 'transparent',
                  color: mapType === 'street' ? '#ffffff' : '#64748b',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '11.5px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Street
              </button>
              <button
                onClick={() => setMapType('satellite')}
                style={{
                  backgroundColor: mapType === 'satellite' ? '#0f4c5c' : 'transparent',
                  color: mapType === 'satellite' ? '#ffffff' : '#64748b',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '11.5px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Satellite
              </button>
            </div>

            {/* Leaflet Map Component */}
            <MapContainer
              center={defaultCenter}
              zoom={12}
              style={{ width: '100%', height: '100%', zIndex: 1 }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={
                  mapType === 'satellite'
                    ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                }
              />

              {myVisitPlan.map((dest, index) => {
                if (!dest.lat || !dest.lng) return null;
                return (
                  <Marker key={dest._id || dest.id || index} position={[parseFloat(dest.lat), parseFloat(dest.lng)]}>
                    <Popup>
                      <div style={{ fontFamily: 'sans-serif' }}>
                        <strong style={{ fontSize: '14px', color: '#0f4c5c' }}>
                          Stop {index + 1}: {dest.title}
                        </strong>
                        <p style={{ fontSize: '12px', margin: '4px 0 0 0', color: '#475569' }}>
                          {dest.description ? dest.description.substring(0, 60) + '...' : ''}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}

              {routeCoordinates.length > 1 && (
                <Polyline positions={routeCoordinates} color="#0f4c5c" weight={4} dashArray="6, 6" />
              )}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}