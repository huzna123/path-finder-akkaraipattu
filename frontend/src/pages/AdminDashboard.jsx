import React, { useState } from 'react';

export default function AdminDashboard({
  adminTab, 
  setAdminTab, 
  editingId, 
  setEditingId, 
  formData, 
  setFormData,
  handleSaveDestination, 
  destinations = [], 
  handleEditClick, 
  handleDelete, 
  setIsAdminLoggedIn, 
  categories = []
}) {
  const [tableSearch, setTableSearch] = useState('');

  // Table Search Filter
  const filteredDestinations = destinations.filter(dest => 
    dest.title?.toLowerCase().includes(tableSearch.toLowerCase()) ||
    dest.category?.toLowerCase().includes(tableSearch.toLowerCase())
  );

  // Category Badge Colors
  const getCategoryBadge = (cat = '') => {
    switch (cat.toLowerCase()) {
      case 'dining': return { bg: '#ffe4e6', color: '#e11d48', border: '#fecdd3' };
      case 'beach': return { bg: '#ccfbf1', color: '#0f766e', border: '#99f6e4' };
      case 'heritage': return { bg: '#fef3c7', color: '#b45309', border: '#fde68a' };
      case 'nature': return { bg: '#dcfce7', color: '#15803d', border: '#bbf7d0' };
      case 'shopping': return { bg: '#f3e8ff', color: '#7e22ce', border: '#e9d5ff' };
      default: return { bg: '#e0f2fe', color: '#0369a1', border: '#bae6fd' };
    }
  };

  return (
    /* ✅ SAMPLE-ல் உள்ள அதே ELEGANT SLATE GREY பின்னணி (#eef2f6) */
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#eef2f6', boxSizing: 'border-box' }}>
      
      {/* =========================================
          1. TOP ADMIN NAVIGATION BAR
         ========================================= */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 40px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #cbd5e1',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* ✅ Path Finder அசல் Vector Compass Logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="11" fill="#0f4c5c" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#ffffff" stroke="#ffffff" strokeWidth="0.5" />
            </svg>
          </div>

          <div>
            <h2 style={{ color: '#0f172a', margin: 0, fontSize: '18px', fontWeight: '800', letterSpacing: '-0.3px' }}>
              Path Finder Akkaraipattu
            </h2>
            <span style={{ fontSize: '11px', color: '#0f766e', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              Administrative Portal
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              backgroundColor: '#e2e8f0',
              borderRadius: '30px',
              fontSize: '12.5px',
              fontWeight: '600',
              color: '#334155',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
            <span>Admin Active</span>
          </div>

          <button
            onClick={() => setIsAdminLoggedIn(false)}
            style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              border: '1px solid #fecaca',
              padding: '9px 18px',
              borderRadius: '10px',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fecaca')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fee2e2')}
          >
            <span>Logout</span>
            <span>→</span>
          </button>
        </div>
      </nav>

      {/* =========================================
          2. MAIN DASHBOARD CONTENT
         ========================================= */}
      <div style={{ maxWidth: '1200px', margin: '35px auto 80px', padding: '0 24px', boxSizing: 'border-box' }}>
        
        {/* ✅ KPI CARDS: GREY பின்னணியில் தெளிவாக தெரியக்கூடிய SHADOW & BORDER */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          
          <div style={{ backgroundColor: '#ffffff', padding: '22px 26px', borderRadius: '16px', border: '1px solid #cbd5e1', boxShadow: '0 4px 14px rgba(15, 23, 42, 0.06)', userSelect: 'none', cursor: 'default' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Destinations</span>
            <div style={{ fontSize: '30px', fontWeight: '800', color: '#0f4c5c', marginTop: '4px' }}>{destinations.length}</div>
            <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '600' }}>Live in Catalogue</span>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '22px 26px', borderRadius: '16px', border: '1px solid #cbd5e1', boxShadow: '0 4px 14px rgba(15, 23, 42, 0.06)', userSelect: 'none', cursor: 'default' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Categories</span>
            <div style={{ fontSize: '30px', fontWeight: '800', color: '#0f766e', marginTop: '4px' }}>
              {categories.filter(c => c !== 'All').length}
            </div>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Heritage, Dining, Beach etc.</span>
          </div>

          <div style={{ backgroundColor: '#ffffff', padding: '22px 26px', borderRadius: '16px', border: '1px solid #cbd5e1', boxShadow: '0 4px 14px rgba(15, 23, 42, 0.06)', userSelect: 'none', cursor: 'default' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>System Status</span>
            <div style={{ fontSize: '30px', fontWeight: '800', color: '#16a34a', marginTop: '4px' }}>100%</div>
            <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '600' }}>Cloud Database Synced</span>
          </div>

        </div>

        {/* Tab Navigation Pill Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '28px' }}>
          <button
            onClick={() => {
              setAdminTab('dashboard');
              setEditingId(null);
              setFormData({
                title: '', category: categories.filter(c => c !== 'All')[0] || 'Heritage',
                lat: '', lng: '', description: '', openingHours: '', peakHours: '',
                bestTimeToVisit: '', entryFee: '', parking: '', dressCode: '', image: ''
              });
            }}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: adminTab === 'dashboard' ? 'none' : '1px solid #cbd5e1',
              backgroundColor: adminTab === 'dashboard' ? '#0f4c5c' : '#ffffff',
              color: adminTab === 'dashboard' ? '#ffffff' : '#475569',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: adminTab === 'dashboard' ? '0 4px 15px rgba(15, 76, 92, 0.25)' : '0 2px 6px rgba(0,0,0,0.04)',
              transition: 'all 0.2s',
            }}
          >
            <span>{editingId ? '✏️ Edit Destination' : '➕ Add Destination'}</span>
          </button>

          <button
            onClick={() => setAdminTab('manage')}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: adminTab === 'manage' ? 'none' : '1px solid #cbd5e1',
              backgroundColor: adminTab === 'manage' ? '#0f4c5c' : '#ffffff',
              color: adminTab === 'manage' ? '#ffffff' : '#475569',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: adminTab === 'manage' ? '0 4px 15px rgba(15, 76, 92, 0.25)' : '0 2px 6px rgba(0,0,0,0.04)',
              transition: 'all 0.2s',
            }}
          >
            <span>📋 Manage Places</span>
            <span
              style={{
                marginLeft: '8px',
                backgroundColor: adminTab === 'manage' ? 'rgba(255,255,255,0.25)' : '#e2e8f0',
                color: adminTab === 'manage' ? '#ffffff' : '#0f766e',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '12px',
              }}
            >
              {destinations.length}
            </span>
          </button>
        </div>

        {/* ========================================================
            TAB 1: ADD / EDIT FORM (High Contrast White Card)
           ======================================================== */}
        {adminTab === 'dashboard' ? (
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '38px',
              borderRadius: '20px',
              boxShadow: '0 8px 25px rgba(15, 23, 42, 0.06)',
              border: '1px solid #cbd5e1',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', borderBottom: '1px solid #e2e8f0', paddingBottom: '18px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: '#0f172a' }}>
                  {editingId ? 'Edit Destination Details' : 'Add New Destination'}
                </h2>
                <p style={{ color: '#64748b', fontSize: '13.5px', margin: '4px 0 0' }}>
                  Provide complete spatial coordinates, imagery, and visitor information.
                </p>
              </div>

              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({
                      title: '', category: 'Heritage', lat: '', lng: '', description: '',
                      openingHours: '', peakHours: '', bestTimeToVisit: '', entryFee: '', parking: '', dressCode: '', image: ''
                    });
                  }}
                  style={{
                    backgroundColor: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    color: '#64748b',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: '700',
                    cursor: 'pointer',
                  }}
                >
                  ✕ Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSaveDestination} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '22px' }}>
              
              {/* Title */}
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '7px' }}>
                  Destination Title <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              {/* Category */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '7px' }}>
                  Category <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', outline: 'none', fontSize: '14px' }}
                >
                  {categories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Image URL & Interactive Preview */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '7px' }}>
                  Image URL
                </label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                    style={{ flex: 1, padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                  {formData.image && (
                    <div style={{ width: '46px', height: '44px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1', flexShrink: 0 }}>
                      <img src={formData.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                    </div>
                  )}
                </div>
              </div>

              {/* Lat & Lng */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '7px' }}>
                  Latitude (Lat) <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  value={formData.lat}
                  onChange={e => setFormData({ ...formData, lat: parseFloat(e.target.value) })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '7px' }}>
                  Longitude (Lng) <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  value={formData.lng}
                  onChange={e => setFormData({ ...formData, lng: parseFloat(e.target.value) })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              {/* Description */}
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '7px' }}>
                  Description <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <textarea
                  required
                  rows="3"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit' }}
                />
              </div>

              {/* Secondary Details */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '7px' }}>Opening Hours</label>
                <input type="text" value={formData.openingHours} onChange={e => setFormData({ ...formData, openingHours: e.target.value })} style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13.5px', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '7px' }}>Peak Hours</label>
                <input type="text" value={formData.peakHours} onChange={e => setFormData({ ...formData, peakHours: e.target.value })} style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13.5px', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '7px' }}>Best Time to Visit</label>
                <input type="text" value={formData.bestTimeToVisit} onChange={e => setFormData({ ...formData, bestTimeToVisit: e.target.value })} style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13.5px', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '7px' }}>Entry Fee</label>
                <input type="text" value={formData.entryFee} onChange={e => setFormData({ ...formData, entryFee: e.target.value })} style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13.5px', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '7px' }}>Parking Availability</label>
                <input type="text" value={formData.parking} onChange={e => setFormData({ ...formData, parking: e.target.value })} style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13.5px', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '7px' }}>Dress Code</label>
                <input type="text" value={formData.dressCode} onChange={e => setFormData({ ...formData, dressCode: e.target.value })} style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13.5px', boxSizing: 'border-box' }} />
              </div>

              {/* Submit Button */}
              <div style={{ gridColumn: 'span 2', marginTop: '14px' }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#0f4c5c',
                    color: '#ffffff',
                    border: 'none',
                    padding: '14px',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '15px',
                    cursor: 'pointer',
                    width: '100%',
                    boxShadow: '0 4px 15px rgba(15, 76, 92, 0.25)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0b3945')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0f4c5c')}
                >
                  {editingId ? '✨ Update Destination' : '🚀 Publish Destination to Catalogue'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          
          /* ========================================================
              TAB 2: DATA TABLE (Clearly Defined White Card on Grey)
             ======================================================== */
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #cbd5e1',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '24px 30px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                backgroundColor: '#ffffff',
              }}
            >
              <div>
                <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                  Destinations Catalogue
                </h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                  Manage active places, edit coordinates, or remove old entries.
                </p>
              </div>

              <input
                type="text"
                placeholder="🔍 Filter places by title or category..."
                value={tableSearch}
                onChange={e => setTableSearch(e.target.value)}
                style={{
                  padding: '9px 16px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                  fontSize: '13.5px',
                  width: '280px',
                  backgroundColor: '#f8fafc',
                }}
              />
            </div>

            <div style={{ overflowX: 'auto', width: '100%' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #cbd5e1' }}>
                    <th style={{ padding: '14px 24px', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Destination</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Category</th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Coordinates</th>
                    <th style={{ padding: '14px 24px', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDestinations.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
                        No destinations found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredDestinations.map((dest, index) => {
                      const badge = getCategoryBadge(dest.category);
                      return (
                        <tr
                          key={dest._id || index}
                          style={{
                            borderBottom: '1px solid #f1f5f9',
                            backgroundColor: '#ffffff',
                            transition: 'background-color 0.15s ease',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                        >
                          <td style={{ padding: '16px 24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                              <img
                                src={dest.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80'}
                                alt={dest.title}
                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80'; }}
                                style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #cbd5e1' }}
                              />
                              <div>
                                <strong style={{ fontSize: '14.5px', color: '#0f172a', display: 'block' }}>
                                  {dest.title}
                                </strong>
                                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                                  {dest.bestTimeToVisit || 'Akkaraipattu, Sri Lanka'}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td style={{ padding: '16px 20px' }}>
                            <span
                              style={{
                                backgroundColor: badge.bg,
                                color: badge.text,
                                border: `1px solid ${badge.border}`,
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '11.5px',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                letterSpacing: '0.4px',
                              }}
                            >
                              {dest.category}
                            </span>
                          </td>

                          <td style={{ padding: '16px 20px', fontSize: '12.5px', color: '#475569', fontFamily: 'monospace' }}>
                            📍 {parseFloat(dest.lat).toFixed(4)}, {parseFloat(dest.lng).toFixed(4)}
                          </td>

                          <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                              <button
                                onClick={() => handleEditClick(dest)}
                                title="Edit Destination"
                                style={{
                                  backgroundColor: '#e0f2fe',
                                  color: '#0284c7',
                                  border: '1px solid #bae6fd',
                                  padding: '7px 14px',
                                  borderRadius: '8px',
                                  cursor: 'pointer',
                                  fontWeight: '700',
                                  fontSize: '12.5px',
                                  transition: 'background-color 0.2s',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#bae6fd')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#e0f2fe')}
                              >
                                ✏️ Edit
                              </button>

                              <button
                                onClick={() => handleDelete(dest._id)}
                                title="Delete Destination"
                                style={{
                                  backgroundColor: '#fee2e2',
                                  color: '#dc2626',
                                  border: '1px solid #fecaca',
                                  padding: '7px 14px',
                                  borderRadius: '8px',
                                  cursor: 'pointer',
                                  fontWeight: '700',
                                  fontSize: '12.5px',
                                  transition: 'background-color 0.2s',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fecaca')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fee2e2')}
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}