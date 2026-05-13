import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import EventRegistrationForm from './pages/EventRegistrationForm';
import MyRegistrations from './pages/MyRegistrations';
import EditRegistration from './pages/EditRegistration';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-900 text-white">
          
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path="/register-event" element={
              <ProtectedRoute><EventRegistrationForm /></ProtectedRoute>
            } />
            <Route path="/my-registrations" element={
              <ProtectedRoute><MyRegistrations /></ProtectedRoute>
            } />
            <Route path="/edit-registration/:id" element={
              <ProtectedRoute><EditRegistration /></ProtectedRoute>
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
