import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="flex min-h-screen bg-bg-primary text-text-primary">
      <Sidebar />

      <div className="flex-1 ml-56">
        <TopBar userName={userName} />

        <main className="p-8 max-w-5xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1">Profile Settings</h1>
            <p className="text-text-muted text-sm">View and update your account information.</p>
          </div>

          {loading ? (
            <div className="neon-card p-6 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {(message || error) && (
                <div
                  className={`mb-6 px-4 py-3 rounded-xl border ${
                    error
                      ? 'bg-red-500/10 border-red-500/20 text-red-300'
                      : 'bg-accent/10 border-accent/20 text-accent-light'
                  }`}
                >
                  {error || message}
                </div>
              )}

              <div className="neon-card overflow-hidden">
                <div className="flex border-b border-white/[0.04]">
                  <button
                    type="button"
                    onClick={() => setActiveTab('profile')}
                    className={`px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === 'profile'
                        ? 'text-accent border-b-2 border-accent'
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    Edit Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('password')}
                    className={`px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === 'password'
                        ? 'text-accent border-b-2 border-accent'
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    Change Password
                  </button>
                </div>

                <div className="p-6">
                  {activeTab === 'profile' && (
                    <form onSubmit={handleProfileSubmit} className="space-y-5 max-w-xl">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, name: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-bg-card border border-white/[0.06] text-text-primary outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-all"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, email: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-bg-card border border-white/[0.06] text-text-primary outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-all"
                          placeholder="Your email"
                        />
                      </div>

                      <div className="pt-2 flex items-center gap-3">
                        <button
                          type="submit"
                          disabled={savingProfile}
                          className="px-5 py-3 rounded-xl btn-neon font-semibold disabled:opacity-50"
                        >
                          {savingProfile ? 'Saving...' : 'Save Changes'}
                        </button>

                        <button
                          type="button"
                          onClick={() => navigate('/dashboard')}
                          className="px-5 py-3 rounded-xl border border-white/[0.08] text-text-secondary hover:bg-white/[0.04] transition-colors"
                        >
                          Back to Dashboard
                        </button>
                      </div>
                    </form>
                  )}

                  {activeTab === 'password' && (
                    <form onSubmit={handlePasswordSubmit} className="space-y-5 max-w-xl">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={(e) =>
                            setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-bg-card border border-white/[0.06] text-text-primary outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-all"
                          placeholder="Current password"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={(e) =>
                            setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-bg-card border border-white/[0.06] text-text-primary outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-all"
                          placeholder="New password"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) =>
                            setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-bg-card border border-white/[0.06] text-text-primary outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-all"
                          placeholder="Confirm new password"
                        />
                      </div>

                      <div className="pt-2 flex items-center gap-3">
                        <button
                          type="submit"
                          disabled={savingPassword}
                          className="px-5 py-3 rounded-xl btn-neon font-semibold disabled:opacity-50"
                        >
                          {savingPassword ? 'Changing...' : 'Change Password'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              <div className="mt-6 neon-card p-6">
                <h2 className="text-base font-semibold mb-3">Current Account Info</h2>
                <div className="space-y-2 text-sm text-text-secondary">
                  <p>
                    <span className="text-text-muted">Name:</span> {userName || 'N/A'}
                  </p>
                  <p>
                    <span className="text-text-muted">Email:</span> {userEmail || 'N/A'}
                  </p>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;
