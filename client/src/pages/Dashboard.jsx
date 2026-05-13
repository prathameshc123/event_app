import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const { data } = await API.get('/registrations');
        setRegistrations(data.registrations);
      } catch {
        setError('Failed to load registrations.');
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  const typeColors = {
    Individual: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Group: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Team: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    VIP: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    Student: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    Professional: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };

  const recentRegistrations = registrations.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-violet-900/50 to-indigo-900/50 border border-violet-700/30 rounded-2xl p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-violet-400 text-sm font-semibold mb-1">Welcome back 👋</p>
              <h1 className="text-3xl font-black text-white">{user?.name}</h1>
              <p className="text-slate-400 mt-1">{user?.email}</p>
            </div>
            <Link
              to="/register-event"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-violet-500/20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Register for Event
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Registrations', value: registrations.length, icon: '📋', color: 'from-violet-500 to-indigo-600' },
            { label: 'Events Registered', value: new Set(registrations.map(r => r.eventName)).size, icon: '🎯', color: 'from-blue-500 to-cyan-600' },
            { label: 'This Month', value: registrations.filter(r => new Date(r.createdAt).getMonth() === new Date().getMonth()).length, icon: '📅', color: 'from-emerald-500 to-teal-600' },
          ].map((stat) => (
            <div key={stat.label} className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-xl mb-4`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Registrations */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Registrations</h2>
            <Link to="/my-registrations" className="text-violet-400 hover:text-violet-300 text-sm font-semibold transition-colors">
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-10 h-10 border-3 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-400">{error}</div>
          ) : registrations.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-slate-400 text-lg mb-4">No registrations yet.</p>
              <Link to="/register-event" className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl font-semibold transition-all">
                Register Your First Event
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentRegistrations.map((reg) => (
                <div key={reg._id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-900/60 border border-slate-700/50 rounded-xl p-4 hover:border-violet-500/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">
                      {reg.fullName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{reg.eventName}</p>
                      <p className="text-slate-400 text-sm">{reg.fullName} · {reg.organization}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${typeColors[reg.registrationType] || 'bg-slate-700 text-slate-300 border-slate-600'}`}>
                      {reg.registrationType}
                    </span>
                    <Link to={`/edit-registration/${reg._id}`} className="text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors">
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <Link to="/register-event" className="bg-slate-800 border border-slate-700 hover:border-violet-500/50 rounded-2xl p-6 flex items-center gap-4 group transition-all hover:-translate-y-0.5">
            <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-400 text-xl group-hover:bg-violet-500/20 transition-all">➕</div>
            <div>
              <p className="text-white font-bold">Register for Event</p>
              <p className="text-slate-400 text-sm">Fill registration form</p>
            </div>
          </Link>
          <Link to="/my-registrations" className="bg-slate-800 border border-slate-700 hover:border-violet-500/50 rounded-2xl p-6 flex items-center gap-4 group transition-all hover:-translate-y-0.5">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 text-xl group-hover:bg-indigo-500/20 transition-all">📋</div>
            <div>
              <p className="text-white font-bold">My Registrations</p>
              <p className="text-slate-400 text-sm">View & manage registrations</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
