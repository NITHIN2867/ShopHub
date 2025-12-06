import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { useAuthStore } from '../store/authStore';
import { FiArrowLeft } from 'react-icons/fi';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetOTP, setResetOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetStep, setResetStep] = useState(1); // 1: email, 2: otp, 3: new password
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(formData);
      const { token, user } = response.data;
      setUser(user, token);
      navigate(user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordClick = () => {
    setForgotPassword(true);
    setError('');
    setResetMessage('');
    setResetStep(1);
  };

  const handleBackToLogin = () => {
    setForgotPassword(false);
    setResetEmail('');
    setResetOTP('');
    setNewPassword('');
    setResetStep(1);
    setError('');
    setResetMessage('');
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    setError('');
    
    if (!resetEmail) {
      setError('Please enter your email');
      return;
    }

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(otp);
    setResetStep(2);
    setResetMessage(`✓ OTP sent to ${resetEmail}. Demo OTP: ${otp}`);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setError('');

    if (!resetOTP) {
      setError('Please enter the OTP');
      return;
    }

    if (resetOTP !== generatedOTP) {
      setError('Invalid OTP. Please try again.');
      return;
    }

    setResetStep(3);
    setResetMessage('✓ OTP verified! Please enter your new password.');
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (!newPassword || newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      // Simulate password reset - in production, send to backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setResetMessage('✓ Password reset successfully! Redirecting to login...');
      setTimeout(() => {
        handleBackToLogin();
      }, 2000);
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (forgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-100">
          <div className="flex items-center mb-8">
            <button
              onClick={handleBackToLogin}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <FiArrowLeft size={20} className="text-gray-700" />
            </button>
            <h2 className="text-3xl font-bold flex-1 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Reset Password
            </h2>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-700 rounded-lg shadow-sm">
              {error}
            </div>
          )}

          {resetMessage && (
            <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 text-green-700 rounded-lg shadow-sm">
              {resetMessage}
            </div>
          )}

          {resetStep === 1 && (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl"
              >
                Send OTP
              </button>
            </form>
          )}

          {resetStep === 2 && (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={resetEmail}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">OTP Code</label>
                <input
                  type="text"
                  value={resetOTP}
                  onChange={(e) => setResetOTP(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-center text-2xl tracking-widest"
                  placeholder="000000"
                  maxLength="6"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">Enter the 6-digit code sent to your email</p>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl"
              >
                Verify OTP
              </button>
            </form>
          )}

          {resetStep === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="••••••••"
                  minLength="6"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">Minimum 6 characters</p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Login</h2>

        {error && (
          <div className="mb-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-700 rounded-lg shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleForgotPasswordClick}
              className="text-sm text-blue-600 hover:underline font-semibold transition"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline font-semibold">
            Sign Up
          </Link>
        </p>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-semibold text-gray-700 mb-2">Demo Credentials:</p>
          <p className="text-xs text-gray-600 mb-1"><strong>Admin:</strong> admin@flipcart.com / password</p>
          <p className="text-xs text-gray-600"><strong>Customer:</strong> user@flipcart.com / password</p>
        </div>
      </div>
    </div>
  );
}
