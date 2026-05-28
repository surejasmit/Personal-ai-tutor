import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockKeyhole, Mail, Save, User, UserRoundCog } from 'lucide-react';
import Sidebar from '../components/Dashboard/Sidebar';
import TopBar from '../components/Dashboard/Topbar';

const Profile = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/profile/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || 'Failed to load profile');
          return;
        }

        const user = data.user;
        setUserName(user.name || '');
        setUserEmail(user.email || '');
        setProfileForm({
          name: user.name || '',
          email: user.email || '',
        });
      } catch (err) {
        setError(err.message || 'Network error while loading profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [API_URL, navigate]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!profileForm.name || !profileForm.email) {
      setError('Name and email are required');
      return;
    }

    try {
      setSavingProfile(true);
      const token = localStorage.getItem('token');

      const res = await fetch(`${API_URL}/api/profile/me`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileForm),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to update profile');
        return;
      }

      setUserName(data.user.name);
      setUserEmail(data.user.email);
      localStorage.setItem('user', JSON.stringify(data.user));
      setMessage('Profile updated successfully');
    } catch (err) {
      setError(err.message || 'Network error while updating profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setError('All password fields are required');
      return;
    }

    try {
      setSavingPassword(true);
      const token = localStorage.getItem('token');

      const res = await fetch(`${API_URL}/api/profile/me/password`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwordForm),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to change password');
        return;
      }

      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setMessage('Password changed successfully');
    } catch (err) {
      setError(err.message || 'Network error while changing password');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="flex min-h-screen page-shell">
      <Sidebar />

      <div className="min-w-0 flex-1 pb-24 md:ml-64 md:pb-0">
        <TopBar userName={userName} />

        <main className="max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
          <section className="brand-gradient rounded-[2rem] p-6 text-white shadow-lift sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/16 text-2xl font-black">
                {userName ? userName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-100">Account</p>
                <h1 className="mt-2 text-3xl font-black tracking-tight">Profile Settings</h1>
                <p className="mt-2 text-sm text-brand-50/86">View and update your account information.</p>
              </div>
            </div>
          </section>

          {loading ? (
            <div className="premium-card rounded-[2rem] p-6">
              <div className="skeleton mb-4 h-6 rounded-full" />
              <div className="skeleton h-48 rounded-3xl" />
            </div>
          ) : (
            <>
              {(message || error) && (
                <div
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
                    error
                      ? 'border-red-200 bg-red-50 text-red-600'
                      : 'border-brand-200 bg-brand-50 text-brand-dark'
                  }`}
                >
                  {error || message}
                </div>
              )}

              <section className="premium-card overflow-hidden rounded-[2rem]">
                <div className="flex border-b border-slate-100 bg-slate-50/70 p-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                      activeTab === 'profile'
                        ? 'bg-white text-brand-dark shadow-sm'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <UserRoundCog size={17} />
                    Edit Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('password')}
                    className={`flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                      activeTab === 'password'
                        ? 'bg-white text-brand-dark shadow-sm'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <LockKeyhole size={17} />
                    Change Password
                  </button>
                </div>

                <div className="p-5 sm:p-7">
                  {activeTab === 'profile' && (
                    <form onSubmit={handleProfileSubmit} className="max-w-xl space-y-5">
                      <div>
                        <label className="mb-2 block text-sm font-bold text-slate-700">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input
                            type="text"
                            value={profileForm.name}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, name: e.target.value })
                            }
                            className="form-input py-3 pl-11 pr-4"
                            placeholder="Your name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-bold text-slate-700">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input
                            type="email"
                            value={profileForm.email}
                            onChange={(e) =>
                              setProfileForm({ ...profileForm, email: e.target.value })
                            }
                            className="form-input py-3 pl-11 pr-4"
                            placeholder="Your email"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                        <button
                          type="submit"
                          disabled={savingProfile}
                          className="btn-primary px-5 py-3 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Save size={18} />
                          {savingProfile ? 'Saving...' : 'Save Changes'}
                        </button>

                        <button
                          type="button"
                          onClick={() => navigate('/dashboard')}
                          className="btn-secondary px-5 py-3 text-sm text-slate-700"
                        >
                          Back to Dashboard
                        </button>
                      </div>
                    </form>
                  )}

                  {activeTab === 'password' && (
                    <form onSubmit={handlePasswordSubmit} className="max-w-xl space-y-5">
                      {[
                        ['Current Password', 'currentPassword', 'Current password'],
                        ['New Password', 'newPassword', 'New password'],
                        ['Confirm New Password', 'confirmPassword', 'Confirm new password'],
                      ].map(([label, key, placeholder]) => (
                        <div key={key}>
                          <label className="mb-2 block text-sm font-bold text-slate-700">{label}</label>
                          <div className="relative">
                            <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                              type="password"
                              value={passwordForm[key]}
                              onChange={(e) =>
                                setPasswordForm({ ...passwordForm, [key]: e.target.value })
                              }
                              className="form-input py-3 pl-11 pr-4"
                              placeholder={placeholder}
                            />
                          </div>
                        </div>
                      ))}

                      <button
                        type="submit"
                        disabled={savingPassword}
                        className="btn-primary px-5 py-3 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <LockKeyhole size={18} />
                        {savingPassword ? 'Changing...' : 'Change Password'}
                      </button>
                    </form>
                  )}
                </div>
              </section>

              <section className="premium-card rounded-[2rem] p-6">
                <h2 className="text-lg font-black text-slate-950">Current Account Info</h2>
                <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                  <p className="rounded-2xl bg-slate-50 p-4">
                    <span className="block text-xs font-bold uppercase tracking-wide text-slate-400">Name</span>
                    {userName || 'N/A'}
                  </p>
                  <p className="rounded-2xl bg-slate-50 p-4">
                    <span className="block text-xs font-bold uppercase tracking-wide text-slate-400">Email</span>
                    {userEmail || 'N/A'}
                  </p>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;

