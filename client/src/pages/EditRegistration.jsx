import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const EditRegistration = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', organization: '',
    eventName: '', registrationType: '', notes: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchRegistration = async () => {
      try {
        const { data } = await API.get(`/registrations/${id}`);
        const r = data.registration;
        setFormData({
          fullName: r.fullName,
          email: r.email,
          phone: r.phone,
          organization: r.organization,
          eventName: r.eventName,
          registrationType: r.registrationType,
          notes: r.notes || '',
        });
      } catch (err) {
        setApiError(err.response?.data?.message || 'Failed to load registration.');
      } finally {
        setLoading(false);
      }
    };
    fetchRegistration();
  }, [id]);

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
    if (!formData.organization.trim()) newErrors.organization = 'Organization is required.';
    if (!formData.eventName) newErrors.eventName = 'Please select an event.';
    if (!formData.registrationType) newErrors.registrationType = 'Please select a type.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setSaving(true);
    try {
      await API.put(`/registrations/${id}`, formData);
      setSuccess('✅ Registration updated successfully! Redirecting...');
      setTimeout(() => navigate('/my-registrations'), 2000);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Update failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const inputClass = (field) =>
    `w-full bg-slate-900/70 border ${errors[field] ? 'border-red-500' : 'border-slate-600'} text-white placeholder-slate-500 px-4 py-3 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all`;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 text-violet-400 text-sm font-medium px-4 py-2 rounded-full mb-4">
            ✏️ Edit Registration
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Update Registration</h1>
          <p className="text-slate-400">Modify your event registration details below</p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur border border-slate-700 rounded-2xl p-8 shadow-2xl">
          {success && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-4 rounded-xl mb-6 text-sm font-medium">
              {success}
            </div>
          )}
          {apiError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
              ❌ {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">Full Name <span className="text-red-400">*</span></label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={inputClass('fullName')} />
              {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">Email Address <span className="text-red-400">*</span></label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass('email')} />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">Phone Number <span className="text-red-400">*</span></label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass('phone')} />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">College / Organization <span className="text-red-400">*</span></label>
              <input type="text" name="organization" value={formData.organization} onChange={handleChange} className={inputClass('organization')} />
              {errors.organization && <p className="text-red-400 text-xs mt-1">{errors.organization}</p>}
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">Event Name <span className="text-red-400">*</span></label>
              <select name="eventName" value={formData.eventName} onChange={handleChange} className={inputClass('eventName')}>
                <option value="">-- Select an Event --</option>
                {EVENT_OPTIONS.map((e) => <option key={e} value={e}>{e}</option>)}
              </select>
              {errors.eventName && <p className="text-red-400 text-xs mt-1">{errors.eventName}</p>}
            </div>
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
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">Additional Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} className="w-full bg-slate-900/70 border border-slate-600 text-white placeholder-slate-500 px-4 py-3 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none" />
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => navigate('/my-registrations')} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-semibold transition-all">
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || !!success}
                className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRegistration;
