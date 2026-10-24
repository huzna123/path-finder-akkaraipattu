import React, { useState } from 'react';
import { 
  FaCompass, 
  FaCalendarAlt, 
  FaLandmark, 
  FaRoute, 
  FaUtensils, 
  FaArrowRight, 
  FaStar, 
  FaMapMarkerAlt 
} from 'react-icons/fa';

export default function Home({ setCurrentView }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  // நீங்கள் கொடுத்த அதே புதிய படங்களுடன் கூடிய Featured Places
  const featuredPlaces = [
    {
      id: 'f1',
      title: 'Akkaraipattu Beach & Park',
      category: 'Beach',
      image: 'https://img.12go.asia/0/fit/1024/0/ce/1/plain/s3://12go-web-static/static/images/upload-media/3941.jpeg',
      rating: '4.9',
      desc: 'Scenic coastal getaway featuring soothing sea breezes and golden sunsets.',
    },
    {
      id: 'f2',
      title: 'Deegawapi Stupa & Monastery',
      category: 'Heritage',
      image: 'https://i0.wp.com/amazinglanka.com/wp/wp-content/uploads/2024/09/DSCF7525-edited.jpg?ssl=1',
      rating: '4.8',
      desc: 'Ancient Buddhist historical complex steeped in rich regional folklore and peace.',
    },
    {
      id: 'f3',
      title: 'Oluvil Lighthouse & Port',
      category: 'Sightseeing',
      image: 'https://d34vm3j4h7f97z.cloudfront.net/original/3X/5/c/5c2aa2214e572729dc1215a9a92c44de200137e8.jpeg',
      rating: '4.7',
      desc: 'Striking coastal white lighthouse overlooking the active eastern fisheries harbor.',
    },
  ];

  return (
    /* ✅ 1. SAMPLE REPORT-ல் உள்ள அதே ELEGANT SLATE GREY BACKGROUND (#eef2f6) */
    <div style={{ backgroundColor: '#eef2f6', minHeight: '100vh', width: '100%', boxSizing: 'border-box', overflowX: 'hidden' }}>
      
      {/* ========================================================
          1. LUXURY TRAVEL HERO BANNER
         ======================================================== */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '520px',
          backgroundImage: 'url("https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 45%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px 100px',
          boxSizing: 'border-box',
          textAlign: 'center',
        }}
      >
        {/* Dark Luxury Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(11, 44, 54, 0.88) 0%, rgba(15, 76, 92, 0.85) 100%)',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '820px', width: '100%' }}>
          {/* Top Pill Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '30px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              color: '#5eead4',
              fontSize: '13px',
              fontWeight: '700',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            <span>✨</span>
            <span>Your Local Eastern Travel Companion</span>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: '800',
              color: '#ffffff',
              margin: '0 0 16px',
              lineHeight: '1.2',
              letterSpacing: '-1px',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }}
          >
            Welcome to Path Finder Akkaraipattu
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '18px',
              color: '#e2e8f0',
              margin: '0 auto 36px',
              maxWidth: '640px',
              lineHeight: '1.6',
            }}
          >
            Discover ancient heritage, pristine coastlines, authentic cuisines, and plan personalized day routes effortlessly.
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => setCurrentView('places')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#ffffff',
                color: '#0f4c5c',
                border: 'none',
                padding: '15px 32px',
                borderRadius: '14px',
                fontWeight: '700',
                fontSize: '15px',
                cursor: 'pointer',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
              }}
            >
              <FaCompass size={18} /> Explore All Places
            </button>

            <button
              onClick={() => setCurrentView('plan')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(6px)',
                color: '#ffffff',
                border: '1.5px solid rgba(255, 255, 255, 0.4)',
                padding: '15px 32px',
                borderRadius: '14px',
                fontWeight: '700',
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.borderColor = '#ffffff';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <FaCalendarAlt size={17} /> Plan My Day
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. QUICK TRUST STATS BAR (High Contrast White Card)
         ======================================================== */}
      <div style={{ maxWidth: '1080px', margin: '-45px auto 60px', padding: '0 20px', position: 'relative', zIndex: 3 }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '24px 30px',
            boxShadow: '0 12px 30px -5px rgba(15, 23, 42, 0.08)',
            border: '1px solid #cbd5e1',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            textAlign: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f4c5c', marginBottom: '4px' }}>15+</div>
            <div style={{ fontSize: '13.5px', color: '#64748b', fontWeight: '600' }}>Curated Destinations</div>
          </div>
          <div style={{ borderLeft: '1px solid #cbd5e1', borderRight: '1px solid #cbd5e1' }}>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f766e', marginBottom: '4px' }}>100%</div>
            <div style={{ fontSize: '13.5px', color: '#64748b', fontWeight: '600' }}>Verified Local Spots</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#16a34a', marginBottom: '4px' }}>Smart</div>
            <div style={{ fontSize: '13.5px', color: '#64748b', fontWeight: '600' }}>Custom Route Planner</div>
          </div>
        </div>
      </div>

      {/* ========================================================
          3. FEATURED / TOP SPOTS PREVIEW (High Contrast Cards)
         ======================================================== */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#0f766e', textTransform: 'uppercase', letterSpacing: '1px' }}>Top Attractions</span>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '6px 0 0' }}>Must-Visit Highlights</h2>
          </div>
          <button
            onClick={() => setCurrentView('places')}
            style={{
              background: 'none',
              border: 'none',
              color: '#0f766e',
              fontWeight: '700',
              fontSize: '14.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <span>Explore All Places</span>
            <FaArrowRight size={13} />
          </button>
        </div>

        {/* 3 Featured Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '26px' }}>
          {featuredPlaces.map((spot, idx) => (
            <div
              key={spot.id}
              onClick={() => setCurrentView('places')}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '18px',
                overflow: 'hidden',
                border: '1px solid #cbd5e1',
                cursor: 'pointer',
                boxShadow: hoveredCard === idx ? '0 18px 30px -8px rgba(15, 76, 92, 0.16)' : '0 4px 14px rgba(15, 23, 42, 0.05)',
                transform: hoveredCard === idx ? 'translateY(-6px)' : 'translateY(0)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div style={{ height: '210px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={spot.image}
                  alt={spot.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: hoveredCard === idx ? 'scale(1.08)' : 'scale(1)',
                    transition: 'transform 0.5s ease',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(15, 23, 42, 0.72)',
                    backdropFilter: 'blur(6px)',
                    color: '#ffffff',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                  }}
                >
                  {spot.category}
                </span>
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#0f766e', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FaMapMarkerAlt size={12} /> Akkaraipattu
                  </span>
                  <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#334155', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <FaStar color="#f59e0b" size={12} /> {spot.rating}
                  </span>
                </div>
                <h3 style={{ margin: '0 0 8px', fontSize: '17px', fontWeight: '700', color: '#0f172a' }}>{spot.title}</h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>{spot.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          4. WHY EXPLORE WITH US? (High Contrast Feature Boxes)
         ======================================================== */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 90px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <span style={{ fontSize: '12px', fontWeight: '700', color: '#0f766e', textTransform: 'uppercase', letterSpacing: '1px' }}>Our Mission</span>
          <h2 style={{ fontSize: '30px', fontWeight: '800', color: '#0f172a', margin: '6px 0 10px' }}>Why Explore with Us?</h2>
          <p style={{ color: '#64748b', fontSize: '15px', maxWidth: '520px', margin: '0 auto' }}>
            We empower travelers to experience the cultural soul, coastlines, and best tastes of Akkaraipattu seamlessly.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          
          {/* Feature 1 */}
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '36px 28px',
              borderRadius: '20px',
              border: '1px solid #cbd5e1',
              boxShadow: '0 4px 14px rgba(15, 23, 42, 0.05)',
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div
              style={{
                width: '54px',
                height: '54px',
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                color: '#b45309',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                boxShadow: '0 4px 10px rgba(217, 119, 6, 0.15)',
              }}
            >
              <FaLandmark size={24} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '10px' }}>Rich Heritage</h3>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              Discover historical landmarks, traditional mosques, and ancient monastic ruins unique to Akkaraipattu and the Digamadulla region.
            </p>
          </div>

          {/* Feature 2 */}
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '36px 28px',
              borderRadius: '20px',
              border: '1px solid #cbd5e1',
              boxShadow: '0 4px 14px rgba(15, 23, 42, 0.05)',
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div
              style={{
                width: '54px',
                height: '54px',
                background: 'linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)',
                color: '#0f766e',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                boxShadow: '0 4px 10px rgba(15, 118, 110, 0.15)',
              }}
            >
              <FaRoute size={24} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '10px' }}>Smart Route Planning</h3>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              Calculate accurate distances, customize your starting spots and timing, and navigate seamlessly using smart map itineraries.
            </p>
          </div>

          {/* Feature 3 */}
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '36px 28px',
              borderRadius: '20px',
              border: '1px solid #cbd5e1',
              boxShadow: '0 4px 14px rgba(15, 23, 42, 0.05)',
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div
              style={{
                width: '54px',
                height: '54px',
                background: 'linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%)',
                color: '#e11d48',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                boxShadow: '0 4px 10px rgba(225, 29, 72, 0.15)',
              }}
            >
              <FaUtensils size={24} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '10px' }}>Local Dining & Spots</h3>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              Find top-rated regional restaurants, serene coastal shores, and bustling local markets to make your journey memorable.
            </p>
          </div>

        </div>
      </div>

      {/* ========================================================
          5. CALL TO ACTION BANNER (BEFORE FOOTER)
         ======================================================== */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 80px', padding: '0 24px' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #0b3c48 0%, #0f4c5c 100%)',
            borderRadius: '24px',
            padding: '50px 30px',
            color: '#ffffff',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(15, 76, 92, 0.25)',
          }}
        >
          <h2 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 12px' }}>
            Ready to Plan Your Akkaraipattu Adventure?
          </h2>
          <p style={{ fontSize: '15px', color: '#cbd5e1', maxWidth: '540px', margin: '0 auto 28px' }}>
            Build your personalized day itinerary with customized starting times and map directions in seconds.
          </p>
          <button
            onClick={() => setCurrentView('plan')}
            style={{
              backgroundColor: '#5eead4',
              color: '#0f2f38',
              border: 'none',
              padding: '14px 34px',
              borderRadius: '12px',
              fontWeight: '800',
              fontSize: '15px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(94, 234, 212, 0.4)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Start Planning Now →
          </button>
        </div>
      </div>

    </div>
  );
}