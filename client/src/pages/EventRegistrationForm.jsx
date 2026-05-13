import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const EVENT_OPTIONS = [
  'Cloud Computing Summit 2026',
  'AI & Machine Learning Conference',
  'DevOps & Docker Workshop',
  'Full Stack Development Bootcamp',
  'Cybersecurity Awareness Program',
  'Blockchain & Web3 Expo',
  'Other',
];

const TYPE_OPTIONS = ['Individual', 'Group', 'Team', 'VIP', 'Student', 'Professional'];

const EventRegistrationForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const prefilledEvent = location.state?.eventName || '';

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    organization: '',
    eventName: prefilledEvent,
    registrationType: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setApiError('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email.';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';
    else if (!/^[0-9+\-\s]{7,15}$/.test(formData.phone)) newErrors.phone = 'Enter a valid phone number.';
    if (!formData.organization.trim()) newErrors.organization = 'College/Organization is required.';
    if (!formData.eventName) newErrors.eventName = 'Please select an event.';
    if (!formData.registrationType) newErrors.registrationType = 'Please select a registration type.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      await API.post('/registrations', formData);
      setSuccess('🎉 Registration successful! Redirecting to your registrations...');
      setTimeout(() => navigate('/my-registrations'), 2000);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full bg-slate-900/70 border ${errors[field] ? 'border-red-500' : 'border-slate-600'} text-white placeholder-slate-500 px-4 py-3 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all`;

  return (
    <div className="min-h-screen bg-slate-900 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 text-violet-400 text-sm font-medium px-4 py-2 rounded-full mb-4">
            📋 Event Registration
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Register for Event</h1>
          <p className="text-slate-400">Fill in your details to secure your spot</p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur border border-slate-700 rounded-2xl p-8 shadow-2xl">
          {success && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-4 rounded-xl mb-6 text-sm font-medium flex items-center gap-2">
              <span>{success}</span>
            </div>
          )}
          {apiError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">Full Name <span className="text-red-400">*</span></label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" className={inputClass('fullName')} />
              {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">Email Address <span className="text-red-400">*</span></label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className={inputClass('email')} />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">Phone Number <span className="text-red-400">*</span></label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className={inputClass('phone')} />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Organization */}
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">College / Organization <span className="text-red-400">*</span></label>
              <input type="text" name="organization" value={formData.organization} onChange={handleChange} placeholder="MIT College of Engineering" className={inputClass('organization')} />
              {errors.organization && <p className="text-red-400 text-xs mt-1">{errors.organization}</p>}
            </div>

            {/* Event Name */}
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">Event Name <span className="text-red-400">*</span></label>
              <select name="eventName" value={formData.eventName} onChange={handleChange} className={inputClass('eventName')}>
                <option value="">-- Select an Event --</option>
                {EVENT_OPTIONS.map((e) => <option key={e} value={e}>{e}</option>)}
              </select>
              {errors.eventName && <p className="text-red-400 text-xs mt-1">{errors.eventName}</p>}
            </div>

            {/* Registration Type */}
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">Registration Type <span className="text-red-400">*</span></label>
              <div className="grid grid-cols-3 gap-2">
                {TYPE_OPTIONS.map((type) => (
                  <label key={type} className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl border cursor-pointer transition-all text-sm font-medium ${
                    formData.registrationType === type
                      ? 'bg-violet-600/20 border-violet-500 text-violet-300'
                      : 'bg-slate-900/50 border-slate-600 text-slate-400 hover:border-slate-500'
                  }`}>
                    <input type="radio" name="registrationType" value={type} checked={formData.registrationType === type} onChange={handleChange} className="hidden" />
                    {type}
                  </label>
                ))}
              </div>
              {errors.registrationType && <p className="text-red-400 text-xs mt-1">{errors.registrationType}</p>}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">Additional Notes <span className="text-slate-500 font-normal">(Optional)</span></label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} placeholder="Any special requirements or information..." className="w-full bg-slate-900/70 border border-slate-600 text-white placeholder-slate-500 px-4 py-3 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none" />
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => navigate(-1)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-semibold transition-all">
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !!success}
                className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : 'Submit Registration'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventRegistrationForm;
