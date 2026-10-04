import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Activities from './pages/Activities';
import AddActivity from './pages/AddActivity';
import ReportWaste from './pages/ReportWaste';
import RecyclingCenters from './pages/RecyclingCenters';

// API & Auth Service
import { authService } from './services/api';

// Protected Route Guard
const ProtectedRoute = ({ user, children }) => {
  if (!user && !authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(authService.getCurrentUser());

  // Keep user state synchronized
  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleUpdatePoints = (newPoints) => {
    setUser((prev) => (prev ? { ...prev, ecoPoints: newPoints } : null));
    authService.updateCurrentUserPoints(newPoints);
  };

  useEffect(() => {
    const storedUser = authService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
        <Navbar user={user} onLogout={handleLogout} />

        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home user={user} />} />
            <Route
              path="/login"
              element={
                user ? <Navigate to="/dashboard" replace /> : <Login onLoginSuccess={handleLoginSuccess} />
              }
            />
            <Route
              path="/signup"
              element={
                user ? <Navigate to="/dashboard" replace /> : <Signup />
              }
            />
            <Route path="/report-waste" element={<ReportWaste />} />
            <Route path="/recycling-centers" element={<RecyclingCenters />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute user={user}>
                  <Dashboard user={user} onUpdatePoints={handleUpdatePoints} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/activities"
              element={
                <ProtectedRoute user={user}>
                  <Activities onUpdatePoints={handleUpdatePoints} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-activity"
              element={
                <ProtectedRoute user={user}>
                  <AddActivity onActivityAdded={handleUpdatePoints} />
                </ProtectedRoute>
              }
            />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
