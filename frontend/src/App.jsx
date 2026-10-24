import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Places from './pages/Places';
import PlanMyDay from './pages/PlanMyDay';
import DestinationDetail from './pages/DestinationDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);

  const [currentView, setCurrentView] = useState('welcome');
  const [myVisitPlan, setMyVisitPlan] = useState([]);
  const [startTime, setStartTime] = useState('09:00 AM');

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [adminTab, setAdminTab] = useState('dashboard');
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '', category: 'Heritage', lat: '', lng: '', description: '',
    openingHours: '', peakHours: '',
    bestTimeToVisit: '', entryFee: '', parking: '',
    dressCode: '', image: ''
  });

  const categories = ['All', 'Heritage', 'Dining', 'Beach', 'Nature', 'Sightseeing', 'Shopping'];

  const fetchDestinations = () => {
    setLoading(true);
    fetch('/api/destinations')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch destinations');
        return res.json();
      })
      .then((data) => {
        setDestinations(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      setShowLoginModal(false);
      setUsername('');
      setPassword('');
    } else {
      alert('Invalid Username or Password! (Use admin / admin123)');
    }
  };

  const handleSaveDestination = (e) => {
    e.preventDefault();
    const url = editingId 
      ? `/api/destinations/${editingId}`
      : '/api/destinations';
    
    fetch(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) throw new Error('Server returned error status: ' + res.status);
        return res.json();
      })
      .then(() => {
        alert(editingId ? '✨ Destination updated successfully!' : '✨ Destination published successfully!');
        setFormData({
          title: '', category: 'Heritage', lat: '', lng: '', description: '',
          openingHours: '', peakHours: '',
          bestTimeToVisit: '', entryFee: '', parking: '',
          dressCode: '', image: ''
        });
        setEditingId(null);
        fetchDestinations();
        setAdminTab('manage');
      })
      .catch(err => alert('Error saving place: ' + err.message));
  };

  const handleEditClick = (dest) => {
    setEditingId(dest._id);
    setFormData({
      title: dest.title || '', category: dest.category || 'Heritage',
      lat: dest.lat || '', lng: dest.lng || '', description: dest.description || '',
      openingHours: dest.openingHours || '', peakHours: dest.peakHours || '',
      bestTimeToVisit: dest.bestTimeToVisit || '', entryFee: dest.entryFee || '',
      parking: dest.parking || '', dressCode: dest.dressCode || '',
      image: dest.image || ''
    });
    setAdminTab('dashboard'); 
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this place?')) {
      fetch(`/api/destinations/${id}`, { method: 'DELETE' })
        .then(() => fetchDestinations())
        .catch(err => alert('Error deleting: ' + err.message));
    }
  };

  // ✅ சரியாக இடங்களைச் சேர்க்கும் Logic
  const handleAddToPlan = (dest) => {
    const destId = dest._id || dest.id;
    const exists = myVisitPlan.some(item => (item._id || item.id) === destId);

    if (!exists) {
      setMyVisitPlan([...myVisitPlan, dest]);
      setSelectedDestination(null);
      setCurrentView('plan');
      window.scrollTo(0, 0);
    } else {
      alert('⚠️ This place is already in your itinerary.');
      setSelectedDestination(null);
      setCurrentView('plan');
      window.scrollTo(0, 0);
    }
  };

  const filteredDestinations = destinations.filter((dest) => {
    const matchesCategory = selectedCategory === 'All' || dest.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = dest.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (dest.description && dest.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const appStyle = {
    width: '100%', minHeight: '100vh', margin: 0, padding: 0, boxSizing: 'border-box',
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", backgroundColor: '#f8fafc',
    display: 'flex', flexDirection: 'column', overflowX: 'hidden'
  };

  if (isAdminLoggedIn) {
    return (
      <div style={appStyle}>
        <AdminDashboard adminTab={adminTab} setAdminTab={setAdminTab} editingId={editingId} setEditingId={setEditingId} formData={formData} setFormData={setFormData} handleSaveDestination={handleSaveDestination} destinations={destinations} handleEditClick={handleEditClick} handleDelete={handleDelete} setIsAdminLoggedIn={setIsAdminLoggedIn} categories={categories} />
        <Footer setCurrentView={setCurrentView} setShowLoginModal={setShowLoginModal} />
      </div>
    );
  }

  if (showLoginModal) {
    return (
      <div style={appStyle}>
        <AdminLogin username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleAdminLogin={handleAdminLogin} setShowLoginModal={setShowLoginModal} />
        <Footer setCurrentView={setCurrentView} setShowLoginModal={setShowLoginModal} />
      </div>
    );
  }

  if (currentView === 'welcome') {
    return <Welcome setCurrentView={setCurrentView} />;
  }

  return (
    <div style={appStyle}>
      <Navbar setCurrentView={setCurrentView} setShowLoginModal={setShowLoginModal} planCount={myVisitPlan.length} />
      
      {/* Destination Detail திறந்திருந்தால் காட்டப்படும் */}
      {selectedDestination ? (
        <DestinationDetail 
          selectedDestination={selectedDestination} 
          setSelectedDestination={setSelectedDestination} 
          handleAddToPlan={handleAddToPlan} 
        />
      ) : currentView === 'home' ? (
        <Home setCurrentView={setCurrentView} />
      ) : currentView === 'places' ? (
        <Places 
          loading={loading} 
          error={error} 
          filteredDestinations={filteredDestinations} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          categories={categories} 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
          onExplore={(d) => setSelectedDestination(d)}
          handleAddToPlan={handleAddToPlan} 
        />
      ) : currentView === 'plan' ? (
        <PlanMyDay 
          myVisitPlan={myVisitPlan} 
          setMyVisitPlan={setMyVisitPlan} 
          startTime={startTime} 
          setStartTime={setStartTime} 
          setCurrentView={setCurrentView} 
        />
      ) : null}

      <Footer setCurrentView={setCurrentView} setShowLoginModal={setShowLoginModal} />
    </div>
  );
}