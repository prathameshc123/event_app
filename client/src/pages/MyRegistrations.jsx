import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

const typeColors = {
  Individual: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Group: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Team: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  VIP: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  Student: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  Professional: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const fetchRegistrations = async () => {
    try {
      const { data } = await API.get('/registrations');
      setRegistrations(data.registrations);
      setFiltered(data.registrations);
    } catch {
      setError('Failed to load registrations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRegistrations(); }, []);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query.trim()) {
      setFiltered(registrations);
      return;
    }
    try {
      const { data } = await API.get(`/registrations/search?query=${encodeURIComponent(query)}`);
      setFiltered(data.registrations);
    } catch {
      // fallback to client-side filter
      const q = query.toLowerCase();
      setFiltered(registrations.filter(r =>
        r.fullName.toLowerCase().includes(q) ||
        r.eventName.toLowerCase().includes(q) ||
        r.organization.toLowerCase().includes(q) ||
        r.registrationType.toLowerCase().includes(q)
      ));
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    try {
      await API.delete(`/registrations/${deleteId}`);
      const updated = registrations.filter(r => r._id !== deleteId);
      setRegistrations(updated);
      setFiltered(updated.filter(r =>
        !searchQuery || r.eventName.toLowerCase().includes(searchQuery.toLowerCase())
      ));
      setSuccessMsg('Registration deleted successfully.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch {
      setError('Failed to delete. Please try again.');
    } finally {
      setDeleteLoading(false);
      setDeleteId(null);
    }
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-slate-900 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-black text-white mb-1">My Registrations</h1>
            <p className="text-slate-400">Manage all your event registrations</p>
          </div>
          <Link
            to="/register-event"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-5 py-3 rounded-xl font-bold transition-all shadow-lg shadow-violet-500/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Registration
          </Link>
        </div>

        {/* Success / Error Messages */}
        {successMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
            ✅ {successMsg}
          </div>
        )}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
            ❌ {error}
          </div>
        )}

        {/* Search Bar */}
        <div className="relative mb-6">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, event, organization, type..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-slate-800 border border-slate-700 rounded-2xl">
            <div className="text-7xl mb-4">📭</div>
            <p className="text-slate-300 text-xl font-bold mb-2">
              {searchQuery ? 'No results found' : 'No registrations yet'}
            </p>
            <p className="text-slate-500 mb-6">
              {searchQuery ? 'Try a different search term.' : 'Register for your first event!'}
            </p>
            {!searchQuery && (
              <Link to="/register-event" className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl font-semibold transition-all">
                Register Now
              </Link>
            )}
          </div>
        ) : (
          <>
            <p className="text-slate-500 text-sm mb-4">{filtered.length} registration{filtered.length !== 1 ? 's' : ''} found</p>
            <div className="space-y-4">
              {filtered.map((reg) => (
                <div key={reg._id} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-violet-500/40 transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Info */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                        {reg.fullName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-white font-bold text-lg">{reg.eventName}</h3>
                          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${typeColors[reg.registrationType] || 'bg-slate-700 text-slate-300 border-slate-600'}`}>
                            {reg.registrationType}
                          </span>
                        </div>
                        <p className="text-slate-300 text-sm font-medium">{reg.fullName}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                          <span className="text-slate-500 text-xs flex items-center gap-1">
                            <span>📧</span> {reg.email}
                          </span>
                          <span className="text-slate-500 text-xs flex items-center gap-1">
                            <span>📞</span> {reg.phone}
                          </span>
                          <span className="text-slate-500 text-xs flex items-center gap-1">
                            <span>🏫</span> {reg.organization}
                          </span>
                          <span className="text-slate-500 text-xs flex items-center gap-1">
                            <span>📅</span> {formatDate(reg.createdAt)}
                          </span>
                        </div>
                        {reg.notes && (
                          <p className="text-slate-500 text-xs mt-2 italic">📝 {reg.notes}</p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 lg:flex-shrink-0">
                      <Link
                        to={`/edit-registration/${reg._id}`}
                        className="flex items-center gap-1.5 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 text-violet-400 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </Link>
                      <button
                        onClick={() => setDeleteId(reg._id)}
                        className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Delete Registration?</h3>
              <p className="text-slate-400 text-sm">This action cannot be undone. The registration will be permanently removed.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleteLoading}
                className="flex-1 bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                {deleteLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRegistrations;
