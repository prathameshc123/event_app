import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/30">
              <span className="text-white text-lg font-bold">E</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight group-hover:text-violet-400 transition-colors">
              EventReg
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/" className="text-slate-400 hover:text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all">
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-slate-400 hover:text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all">
                  Dashboard
                </Link>
                <Link to="/my-registrations" className="text-slate-400 hover:text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all">
                  My Registrations
                </Link>
                <Link to="/register-event" className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-violet-500/20">
                  + Register Event
                </Link>
                <div className="flex items-center gap-3 ml-2 pl-3 border-l border-slate-700">
                  <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-slate-300 text-sm">{user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="text-slate-400 hover:text-red-400 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-500/10 transition-all"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-400 hover:text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all">
                  Login
                </Link>
                <Link to="/signup" className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-violet-500/20">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-1">
            <Link to="/" onClick={() => setMenuOpen(false)} className="block text-slate-400 hover:text-white px-3 py-2 rounded-lg text-sm hover:bg-slate-800 transition-all">Home</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block text-slate-400 hover:text-white px-3 py-2 rounded-lg text-sm hover:bg-slate-800 transition-all">Dashboard</Link>
                <Link to="/my-registrations" onClick={() => setMenuOpen(false)} className="block text-slate-400 hover:text-white px-3 py-2 rounded-lg text-sm hover:bg-slate-800 transition-all">My Registrations</Link>
                <Link to="/register-event" onClick={() => setMenuOpen(false)} className="block text-violet-400 hover:text-violet-300 px-3 py-2 rounded-lg text-sm hover:bg-violet-500/10 transition-all">+ Register Event</Link>
                <button onClick={handleLogout} className="block w-full text-left text-red-400 hover:text-red-300 px-3 py-2 rounded-lg text-sm hover:bg-red-500/10 transition-all">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-slate-400 hover:text-white px-3 py-2 rounded-lg text-sm hover:bg-slate-800 transition-all">Login</Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)} className="block text-violet-400 hover:text-violet-300 px-3 py-2 rounded-lg text-sm hover:bg-slate-800 transition-all">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
