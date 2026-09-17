import React, { useState } from 'react';
import { X, Eye, EyeOff, Lock, Mail, Phone, User, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { hashPassword } from '../utils/crypto';
import { CLINIC_INFO } from '../utils/whatsapp';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  onOpenPrivacy?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onOpenPrivacy,
}) => {
  const { login, signUp, isDemoMode, toggleDemoMode } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [agreedTerms, setAgreedTerms] = useState(false);

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  if (!isOpen) return null;

  // Password strength meter
  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const strengthScore = calculateStrength(password);
  const strengthLabels = ['Too weak', 'Weak', 'Fair', 'Strong', 'Very strong'];
  const strengthColors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-emerald-500', 'bg-teal-600'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (mode === 'signup') {
      if (!fullName.trim()) {
        setError('Please provide your full legal or preferred name.');
        return;
      }
      if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
        setError('Please enter a valid email address.');
        return;
      }
      if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
        setError('Please enter a valid 10-digit phone number.');
        return;
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters with letters and numbers.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (!agreedTerms) {
        setError('Please agree to the Privacy Policy and terms to register.');
        return;
      }

      setLoading(true);
      try {
        const hashed = await hashPassword(password);
        const res = await signUp({
          fullName,
          email,
          phone,
          passwordHash: hashed,
        });

        if (res.success) {
          setSuccessMessage('Account created successfully! Redirecting to your dashboard...');
          setTimeout(() => {
            onClose();
          }, 800);
        } else {
          setError(res.error || 'Failed to create account.');
        }
      } catch (err) {
        setError('An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      // Login mode
      if (!email.trim()) {
        setError('Please enter your email or registered phone number.');
        return;
      }
      if (!password) {
        setError('Please enter your password.');
        return;
      }

      setLoading(true);
      try {
        const hashed = await hashPassword(password);
        const res = await login(email, hashed, rememberMe);

        if (res.success) {
          setSuccessMessage('Welcome back! Logging into your dashboard...');
          setTimeout(() => {
            onClose();
          }, 700);
        } else {
          setError(res.error || 'Invalid credentials.');
        }
      } catch (err) {
        setError('An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-md my-8 rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0d5c58] text-white flex items-center justify-center font-bold text-sm">
              FRL
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                {mode === 'login' ? 'Patient Portal Login' : 'Create Patient Account'}
              </h2>
              <p className="text-xs text-gray-500">Functional Rehab Lab</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
            aria-label="Close authentication modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="mt-5 grid grid-cols-2 p-1 bg-gray-100/80 rounded-xl">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition ${
              mode === 'login'
                ? 'bg-white text-[#0d5c58] shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setError(null);
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition ${
              mode === 'signup'
                ? 'bg-white text-[#0d5c58] shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Success message */}
        {successMessage && (
          <div className="mt-4 flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Full Legal / Preferred Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rahul Krishnan"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#0d5c58] focus:ring-2 focus:ring-[#0d5c58]/20 transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              {mode === 'signup' ? 'Email Address' : 'Email Address or Phone'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={mode === 'signup' ? 'email' : 'text'}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={mode === 'signup' ? 'name@example.com' : 'name@example.com or phone'}
                className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#0d5c58] focus:ring-2 focus:ring-[#0d5c58]/20 transition"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number (WhatsApp capable)</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98470 12345"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#0d5c58] focus:ring-2 focus:ring-[#0d5c58]/20 transition"
                />
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-gray-700">Password</label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-xs text-[#0d5c58] hover:underline"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#0d5c58] focus:ring-2 focus:ring-[#0d5c58]/20 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password strength guidance */}
            {mode === 'signup' && password.length > 0 && (
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`h-1.5 flex-1 rounded-full ${
                        step < strengthScore ? strengthColors[strengthScore] : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center text-[11px] text-gray-500">
                  <span>Strength: {strengthLabels[strengthScore]}</span>
                  <span>Minimum 8 characters</span>
                </div>
              </div>
            )}
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#0d5c58] focus:ring-2 focus:ring-[#0d5c58]/20 transition"
                />
              </div>
            </div>
          )}

          {mode === 'login' ? (
            <div className="flex items-center justify-between text-xs text-gray-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-sm text-[#0d5c58] focus:ring-[#0d5c58]"
                />
                <span>Remember me</span>
              </label>
            </div>
          ) : (
            <div className="flex items-start gap-2.5 text-xs text-gray-600">
              <input
                type="checkbox"
                id="agree-terms"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="w-4 h-4 rounded-sm text-[#0d5c58] focus:ring-[#0d5c58] mt-0.5 shrink-0"
              />
              <label htmlFor="agree-terms" className="leading-snug">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="text-[#0d5c58] font-medium hover:underline"
                >
                  Privacy Policy &amp; Terms
                </button>
                . I consent to Functional Rehab Lab storing my rehabilitation records privately.
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-[#0d5c58] text-white font-semibold text-sm hover:bg-[#094643] transition active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 shadow-sm"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : null}
            <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
          </button>
        </form>

        {/* Demo Mode Instant Toggle Option */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col items-center text-center">
          <p className="text-xs text-gray-500 mb-2">Want to evaluate sample patient records?</p>
          <button
            type="button"
            onClick={() => {
              toggleDemoMode(true);
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0d5c58]/10 text-[#0d5c58] text-xs font-semibold hover:bg-[#0d5c58]/15 transition"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Load Demo Patient Account (Rahul Krishnan)</span>
          </button>
        </div>

        {/* Forgot Password Modal Overlay */}
        {showForgotPassword && (
          <div className="absolute inset-0 bg-white rounded-3xl p-6 flex flex-col justify-between z-10 animate-in fade-in duration-150">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-base font-bold text-gray-900">Reset Account Access</h3>
                <button
                  onClick={() => setShowForgotPassword(false)}
                  className="p-1 text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="mt-4 text-xs text-gray-600 leading-relaxed">
                For patient confidentiality and security, account resets are verified directly with clinic reception.
              </p>
              <div className="mt-4 p-3 rounded-xl bg-[#0d5c58]/5 border border-[#0d5c58]/15 text-xs text-gray-700 space-y-1.5">
                <p className="font-semibold text-[#0d5c58]">Clinic Contact for Password Assistance:</p>
                <p>Phone / WhatsApp: <strong>{CLINIC_INFO.phoneDisplay}</strong></p>
                <p>Location: Near KIMS Rd, Oruvathilkotta, Anayara</p>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsappRawNumber}?text=${encodeURIComponent('Hello Functional Rehab Lab, I need assistance resetting my Patient Portal account access.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#0d5c58] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#094643] transition"
              >
                Contact Clinic on WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="w-full py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 transition"
              >
                Back to Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
