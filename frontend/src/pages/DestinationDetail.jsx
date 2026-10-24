import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

// Leaflet Marker Icon Fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Home Location Constants (Akkaraipattu Reference Location)
const HOME_LAT = 7.231642506162314;
const HOME_LNG = 81.84274672387369;

// Component to draw routing line on map automatically
function RoutingMachine({ destLat, destLng }) {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }

    routingControlRef.current = L.Routing.control({
      waypoints: [
        L.latLng(HOME_LAT, HOME_LNG),
        L.latLng(destLat, destLng)
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      lineOptions: {
        styles: [{ color: '#0f4c5c', weight: 5, opacity: 0.85 }]
      },
      createMarker: function() { return null; }
    }).addTo(map);

    return () => {
      if (routingControlRef.current && map) {
        map.removeControl(routingControlRef.current);
      }
    };
  }, [map, destLat, destLng]);

  return null;
}

export default function DestinationDetail({ selectedDestination, setSelectedDestination, handleAddToPlan }) {
  if (!selectedDestination) return null;

  const lat = parseFloat(selectedDestination.lat) || 7.2307;
  const lng = parseFloat(selectedDestination.lng) || 81.8429;
  const title = selectedDestination?.title || selectedDestination?.name || 'Destination Details';
  const category = selectedDestination?.category || 'General';
  const location = selectedDestination?.location || selectedDestination?.address || 'Akkaraipattu, Ampara District, Eastern Province';
  const description = selectedDestination?.description || "Explore this wonderful location in Akkaraipattu, known for its unique atmosphere and local significance.";
  const imageUrl = selectedDestination?.image || selectedDestination?.imageUrl || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e';
  const openingHours = selectedDestination?.openingHours || '8:00 AM - 6:00 PM';
  const peakHours = selectedDestination?.peakHours || '4:00 PM - 6:00 PM';
  const entryFee = selectedDestination?.entryFee || 'Free Admission';
  const parking = selectedDestination?.parking || 'Available on-site';

  const highlights = Array.isArray(selectedDestination?.highlights) 
    ? selectedDestination.highlights 
    : ['Scenic Views', 'Local Attraction', 'Peaceful Atmosphere', 'Visitor Friendly'];

  // Haversine Distance Calculation
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  const distanceVal = selectedDestination?.distance || `${calculateDistance(HOME_LAT, HOME_LNG, lat, lng)} km from Home Location`;

  return (
    <div style={{ width: '100%', paddingBottom: '60px', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", backgroundColor: '#eef2f6', minHeight: '100vh', position: 'relative' }}>
      
      {/* Top Breadcrumb Bar */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 20px 10px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b', marginBottom: '10px' }}>
          <span>Home</span> &gt; <span>Places</span> &gt; <span>{category}</span> &gt; <strong style={{ color: '#0f172a' }}>{title}</strong>
        </div>
        <button 
          onClick={() => setSelectedDestination(null)}
          style={{
            backgroundColor: '#ffffff',
            color: '#0f172a',
            border: '1px solid #cbd5e1',
            padding: '8px 16px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.04)'
          }}
        >
          ← Back to Places
        </button>
      </div>

      {/* Hero Banner Section */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          height: '420px',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.85)), url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '40px',
          color: '#ffffff',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.15)'
        }}>
          {/* ✅ Category மட்டும் (Rating ⭐ முற்றிலும் நீக்கப்பட்டுள்ளது) */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <span style={{ backgroundColor: '#0f4c5c', color: '#ffffff', padding: '6px 16px', borderRadius: '20px', fontSize: '12.5px', fontWeight: '700', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
              📍 {category}
            </span>
          </div>
          
          <h1 style={{ fontSize: '38px', fontWeight: '800', margin: '0 0 8px 0', color: '#ffffff', letterSpacing: '-0.5px' }}>{title}</h1>
          <p style={{ fontSize: '14.5px', opacity: 0.95, margin: '0 0 22px 0', color: '#f1f5f9' }}>{location}</p>

          {/* Action Buttons (Share Photos நீக்கப்பட்டு, சுத்தமான Buttons மட்டும்) */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button 
              onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&origin=${HOME_LAT},${HOME_LNG}&destination=${lat},${lng}`, '_blank')}
              style={{ backgroundColor: '#ffffff', color: '#0f172a', border: 'none', padding: '11px 22px', borderRadius: '12px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            >
              Get Directions
            </button>
            <button 
              onClick={() => {
                if (handleAddToPlan) handleAddToPlan(selectedDestination);
                alert("Added to Itinerary successfully!");
              }}
              style={{ backgroundColor: '#0f4c5c', color: '#ffffff', border: 'none', padding: '11px 22px', borderRadius: '12px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(15, 76, 92, 0.3)' }}
            >
              + Add to Itinerary
            </button>
          </div>
        </div>
      </div>

      {/* Distance & Travel Summary Bar */}
      <div style={{ maxWidth: '1280px', margin: '20px auto 0', padding: '0 20px' }}>
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', boxShadow: '0 4px 15px rgba(15, 23, 42, 0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ backgroundColor: '#e0f2fe', color: '#0284c7', padding: '10px', borderRadius: '12px', fontSize: '18px' }}>🚗</div>
            <div>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', display: 'block' }}>Route from Home Location</span>
              <strong style={{ fontSize: '15px', color: '#0f172a' }}>{distanceVal}</strong>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '25px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Starting Point</span>
              <strong style={{ fontSize: '13px', color: '#0f4c5c' }}>Home (Akkaraipattu)</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ maxWidth: '1280px', margin: '30px auto 0', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '30px', alignItems: 'start' }} className="detail-grid">
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '32px', border: '1px solid #cbd5e1', boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: '0 0 16px 0' }}>
                About {title}
              </h3>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.8', margin: '0 0 24px 0' }}>
                {description}
              </p>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '12px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', margin: '0 0 12px 0', letterSpacing: '0.5px' }}>Key Highlights & Features</h4>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {highlights.map((item, index) => (
                    <span key={index} style={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', color: '#334155', padding: '8px 14px', borderRadius: '12px', fontSize: '13px', fontWeight: '700' }}>
                      ✨ {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)' }}>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0f4c5c', margin: '0 0 14px 0' }}>🕒 Visiting Hours</h4>
                <p style={{ fontSize: '13px', color: '#334155', margin: '0 0 8px 0' }}><strong>Operating Hours:</strong> <br/><span style={{ color: '#64748b' }}>{openingHours}</span></p>
                <p style={{ fontSize: '13px', color: '#334155', margin: '0 0 8px 0' }}><strong>Days Open:</strong> <br/><span style={{ color: '#10b981', fontWeight: '700' }}>Open Daily</span></p>
                <p style={{ fontSize: '13px', color: '#334155', margin: 0 }}><strong>Peak Visitor Hours:</strong> <br/><span style={{ color: '#64748b' }}>{peakHours}</span></p>
              </div>

              <div style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)' }}>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0f4c5c', margin: '0 0 14px 0' }}>📌 Route & Practical Details</h4>
                <p style={{ fontSize: '13px', color: '#334155', margin: '0 0 8px 0' }}><strong>Starting Point:</strong> <br/><span style={{ color: '#64748b' }}>Home Location (7.2316, 81.8427)</span></p>
                <p style={{ fontSize: '13px', color: '#334155', margin: '0 0 8px 0' }}><strong>Entry Fee:</strong> <br/><span style={{ color: '#64748b' }}>{entryFee}</span></p>
                <p style={{ fontSize: '13px', color: '#334155', margin: 0 }}><strong>Parking:</strong> <br/><span style={{ color: '#64748b' }}>{parking}</span></p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '20px', border: '1px solid #cbd5e1', boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Live Route Map from Home</h4>
                <span style={{ fontSize: '11px', color: '#64748b' }}>OSM Routing</span>
              </div>
              <div style={{ height: '300px', borderRadius: '14px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
                <MapContainer center={[HOME_LAT, HOME_LNG]} zoom={13} style={{ width: '100%', height: '100%' }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[HOME_LAT, HOME_LNG]}>
                    <Popup>🏡 My Home Location</Popup>
                  </Marker>
                  <Marker position={[lat, lng]}>
                    <Popup>📍 {title}</Popup>
                  </Marker>
                  <RoutingMachine destLat={lat} destLng={lng} />
                </MapContainer>
              </div>

              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button 
                  onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&origin=${HOME_LAT},${HOME_LNG}&destination=${lat},${lng}`, '_blank')}
                  style={{
                    backgroundColor: '#0f4c5c',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: '750',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  Start Google Maps Turn-by-Turn Navigation
                </button>
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '20px', border: '1px solid #cbd5e1', boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)' }}>
              <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', margin: '0 0 8px 0' }}>Destination Address</h4>
              <p style={{ fontSize: '13px', color: '#0f172a', fontWeight: '700', margin: '0 0 4px 0' }}>{title}</p>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{location}</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}