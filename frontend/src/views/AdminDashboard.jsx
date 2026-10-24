import React, { useState } from 'react';

export default function AdminDashboard({ adminTab, setAdminTab, setIsAdminLoggedIn, destinations, categories, handleDelete, handleAddDestination, formData, setFormData, handleUpdateDestination }) {
  const [editingId, setEditingId] = useState(null);

  const startEdit = (dest) => {
    setEditingId(dest._id);
    setFormData({
      title: dest.title || '',
      category: dest.category || categories.filter(c => c !== 'All')[0],
      description: dest.description || '',
      image: dest.image || ''
    });
    setAdminTab('dashboard');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      handleUpdateDestination(editingId, formData);
      setEditingId(null);
    } else {
      handleAddDestination(e);
    }
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", backgroundColor: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <h2 style={{ color: '#0f4c5c', margin: 0, fontSize: '18px', fontWeight: '800' }}>Admin Portal - Path Finder</h2>
        <button onClick={() => setIsAdminLoggedIn(false)} style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>Logout</button>
      </nav>
      <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
          <button onClick={() => { setEditingId(null); setAdminTab('dashboard'); }} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: adminTab === 'dashboard' ? '#0f4c5c' : '#e2e8f0', color: adminTab === 'dashboard' ? '#fff' : '#475569', fontWeight: '700', cursor: 'pointer' }}>{editingId ? 'Edit Destination' : 'Add Destination'}</button>
          <button onClick={() => setAdminTab('manage')} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: adminTab === 'manage' ? '#0f4c5c' : '#e2e8f0', color: adminTab === 'manage' ? '#fff' : '#475569', fontWeight: '700', cursor: 'pointer' }}>Manage Places ({destinations.length})</button>
        </div>

        {adminTab === 'dashboard' ? (
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: '20px', fontWeight: '800' }}>{editingId ? 'Update Destination' : 'Add New Destination'}</h3>
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '5px' }}>Title</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '5px' }}>Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}>
                  {categories.filter(c => c !== 'All').map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '5px' }}>Description</label>
                <textarea required rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '5px' }}>Image URL</label>
                <input type="url" required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} placeholder="https://example.com/image.jpg" />
              </div>
              <button type="submit" style={{ backgroundColor: '#0f4c5c', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', marginTop: '10px' }}>{editingId ? 'Update Place' : 'Add Place'}</button>
            </form>
          </div>
        ) : (
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: '20px', fontWeight: '800' }}>Manage Destinations</h3>
            {destinations.map(dest => (
              <div key={dest._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontWeight: '600' }}>{dest.title} ({dest.category})</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => startEdit(dest)} style={{ backgroundColor: '#e0f2fe', color: '#0369a1', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: '700', cursor: 'pointer', fontSize: '12px' }}>Edit</button>
                  <button onClick={() => handleDelete(dest._id)} style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: '700', cursor: 'pointer', fontSize: '12px' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}