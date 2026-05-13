import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const events = [
  { id: 1, title: 'Cloud Computing Summit 2026', date: 'June 15, 2026', location: 'Bangalore, India', category: 'Technology', seats: 200, color: 'from-violet-500 to-indigo-600' },
  { id: 2, title: 'AI & Machine Learning Conference', date: 'July 10, 2026', location: 'Mumbai, India', category: 'AI/ML', seats: 150, color: 'from-blue-500 to-cyan-600' },
  { id: 3, title: 'DevOps & Docker Workshop', date: 'July 25, 2026', location: 'Hyderabad, India', category: 'Workshop', seats: 80, color: 'from-emerald-500 to-teal-600' },
  { id: 4, title: 'Full Stack Development Bootcamp', date: 'August 5, 2026', location: 'Pune, India', category: 'Development', seats: 120, color: 'from-orange-500 to-amber-600' },
  { id: 5, title: 'Cybersecurity Awareness Program', date: 'August 20, 2026', location: 'Chennai, India', category: 'Security', seats: 100, color: 'from-rose-500 to-pink-600' },
  { id: 6, title: 'Blockchain & Web3 Expo', date: 'September 1, 2026', location: 'Delhi, India', category: 'Blockchain', seats: 250, color: 'from-purple-500 to-violet-600' },
];

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 py-24 px-4">
        {/* Background orbs */}
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 text-violet-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></span>
            Online Event Registration System
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Discover & Register
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent"> Events</span>
          </h1>
          <p className="text-slate-400 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Seamlessly register for tech conferences, workshops, and seminars. Manage all your event registrations in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <>
                <Link to="/register-event" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-2xl shadow-violet-500/30 hover:scale-105">
                  Register for Event
                </Link>
                <Link to="/my-registrations" className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105">
                  My Registrations
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-2xl shadow-violet-500/30 hover:scale-105">
                  Get Started Free
                </Link>
                <Link to="/login" className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-3 gap-4 relative z-10">
          {[
            { value: '500+', label: 'Events Listed' },
            { value: '10K+', label: 'Registrations' },
            { value: '50+', label: 'Cities Covered' },
          ].map((stat) => (
            <div key={stat.label} className="bg-slate-800/60 backdrop-blur border border-slate-700/50 rounded-2xl p-6 text-center">
              <div className="text-3xl font-black text-violet-400">{stat.value}</div>
              <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-white mb-3">Upcoming Events</h2>
          <p className="text-slate-400 text-lg">Browse and register for the latest tech events</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-violet-500/50 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/10 group">
              <div className={`h-2 bg-gradient-to-r ${event.color}`}></div>
              <div className="p-6">
                <span className="inline-block bg-violet-500/10 text-violet-400 text-xs font-semibold px-3 py-1 rounded-full mb-3 border border-violet-500/20">
                  {event.category}
                </span>
                <h3 className="text-white font-bold text-xl mb-3 group-hover:text-violet-300 transition-colors leading-tight">
                  {event.title}
                </h3>
                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <svg className="w-4 h-4 text-violet-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <svg className="w-4 h-4 text-violet-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <svg className="w-4 h-4 text-violet-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.seats} seats available
                  </div>
                </div>
                <Link
                  to={isAuthenticated ? '/register-event' : '/login'}
                  state={{ eventName: event.title }}
                  className={`w-full block text-center bg-gradient-to-r ${event.color} text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all`}
                >
                  Register Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="bg-gradient-to-r from-violet-900/40 to-indigo-900/40 border-t border-b border-violet-800/30 py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready to Register?</h2>
            <p className="text-slate-400 mb-8">Create a free account to register for events and manage your registrations.</p>
            <Link to="/signup" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-2xl shadow-violet-500/30 hover:scale-105 inline-block">
              Create Free Account
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 px-4 text-center text-slate-500 text-sm">
        <p>© 2026 EventReg — Online Event Registration System. Built with MERN Stack.</p>
      </footer>
    </div>
  );
};

export default Home;
