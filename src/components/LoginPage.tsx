import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Gift, 
  CheckCircle2, 
  KeyRound,
  UtensilsCrossed,
  BadgeCheck,
  Award
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/sweetData';
import { UserProfile } from '../types';

interface LoginPageProps {
  onLogin: (user: UserProfile) => void;
  onContinueAsGuest: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onContinueAsGuest }) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  
  // Sign In Form State
  const [signInIdentifier, setSignInIdentifier] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  
  // Register Form State
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regArea, setRegArea] = useState('Old Hubli');
  const [regPassword, setRegPassword] = useState('');
  
  const [error, setError] = useState('');

  // Demo accounts for instant testing
  const demoAccounts: UserProfile[] = [
    {
      id: 'demo-1',
      name: 'Kiran Rao',
      email: 'kiran.hubli@gmail.com',
      phone: '+91 98450 12345',
      address: 'Plot 42, Deshpande Nagar, Near Club Ground',
      city: 'Hubli',
    },
    {
      id: 'demo-2',
      name: 'Vinayak Sarvade',
      email: 'vinayak.sarvade88@gmail.com',
      phone: '+91 97415 67890',
      address: '514, Iswar Nagar, Old Hubli',
      city: 'Hubli',
    }
  ];

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInIdentifier.trim()) {
      setError('Please enter your phone number or email address.');
      return;
    }
    if (!signInPassword.trim()) {
      setError('Please enter your password.');
      return;
    }

    setError('');
    // Create or mimic signed in user
    const loggedUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: signInIdentifier.includes('@') ? signInIdentifier.split('@')[0] : 'Hubli Sweet Lover',
      email: signInIdentifier.includes('@') ? signInIdentifier : `${signInIdentifier}@sweetwhisk.in`,
      phone: signInIdentifier.includes('@') ? '+91 98450 00000' : signInIdentifier,
      address: 'Old Hubli, Karnataka',
      city: 'Hubli',
    };
    onLogin(loggedUser);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!regPhone.trim()) {
      setError('Please enter your phone number for WhatsApp delivery updates.');
      return;
    }
    if (!regEmail.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!regPassword.trim() || regPassword.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }

    setError('');
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: regName.trim(),
      email: regEmail.trim(),
      phone: regPhone.trim(),
      address: `${regArea}, Hubli`,
      city: 'Hubli',
    };
    onLogin(newUser);
  };

  const handleQuickLogin = (demo: UserProfile) => {
    setError('');
    onLogin(demo);
  };

  return (
    <div className="min-h-screen w-full bg-[#071324] text-white flex flex-col justify-between relative overflow-hidden selection:bg-[#D4AF37] selection:text-[#0B2545]">
      {/* Background Decorative Lighting & Mandala Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#133E87]/30 via-[#0B2545]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Ribbon */}
      <div className="relative z-10 w-full bg-[#050E1A]/80 backdrop-blur-md border-b border-blue-900/40 py-2.5 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-[#F3E5AB]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-medium">Welcome to Hubli's Premier Pure Ghee Sweet House</span>
          </div>
          <button
            onClick={onContinueAsGuest}
            className="text-slate-300 hover:text-[#F3E5AB] flex items-center space-x-1 transition-colors group cursor-pointer text-[13px] font-semibold"
          >
            <span>Skip to Sweets Menu</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Center Auth Card Container */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 my-auto">
        <div className="w-full max-w-xl bg-[#0B2545]/90 backdrop-blur-xl rounded-3xl border-2 border-[#D4AF37]/40 shadow-2xl overflow-hidden">
          {/* Decorative Gold Header Edge */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]" />

          <div className="p-6 sm:p-8 lg:p-10 space-y-6">
            {/* Brand Crest */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0B2545] via-[#133E87] to-[#1E3A8A] border-2 border-[#D4AF37] flex items-center justify-center mx-auto shadow-lg shadow-black/40">
                <span className="font-cinzel text-2xl font-black text-[#F3E5AB]">SW</span>
              </div>

              <div>
                <h1 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {BUSINESS_INFO.brandName}
                </h1>
                <p className="text-xs sm:text-sm text-[#D4AF37] font-medium tracking-wide">
                  Traditional Sweets, Savouries & Cakes • Old Hubli
                </p>
              </div>

              <p className="text-xs text-blue-200/80 font-outfit max-w-sm mx-auto">
                Sign in to manage doorstep deliveries, unlock your 15% festival savings, and re-order signature Dharwad Peda in seconds.
              </p>
            </div>

            {/* Tab Selector */}
            <div className="flex bg-[#07172C] p-1.5 rounded-2xl border border-blue-900/60">
              <button
                type="button"
                id="tab-signin-button"
                onClick={() => {
                  setActiveTab('signin');
                  setError('');
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'signin'
                    ? 'bg-gradient-to-r from-[#133E87] to-[#1E3A8A] text-white shadow-md border border-[#D4AF37]/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                id="tab-register-button"
                onClick={() => {
                  setActiveTab('register');
                  setError('');
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'register'
                    ? 'bg-gradient-to-r from-[#133E87] to-[#1E3A8A] text-white shadow-md border border-[#D4AF37]/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Create Account (New User)
              </button>
            </div>

            {/* Error Message if any */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form Section */}
            {activeTab === 'signin' ? (
              <form onSubmit={handleSignIn} className="space-y-4">
                {/* Phone or Email */}
                <div>
                  <label className="block text-xs font-semibold text-blue-200 mb-1.5">
                    Phone Number or Email Address
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-blue-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      id="login-identifier-input"
                      value={signInIdentifier}
                      onChange={(e) => setSignInIdentifier(e.target.value)}
                      placeholder="e.g. 9845012345 or your@email.com"
                      className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/10 border border-blue-800/80 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-blue-200">
                      Password
                    </label>
                    <span className="text-[11px] text-[#D4AF37] hover:underline cursor-pointer">
                      Forgot?
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-blue-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="login-password-input"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-11 pl-10 pr-10 rounded-xl bg-white/10 border border-blue-800/80 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded bg-white/10 border-blue-700 text-[#D4AF37] focus:ring-0"
                    />
                    <span>Remember my Hubli account</span>
                  </label>
                </div>

                {/* Submit Sign In */}
                <button
                  type="submit"
                  id="submit-login-button"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] hover:brightness-110 text-[#071324] font-cinzel font-bold text-sm shadow-xl flex items-center justify-center space-x-2 transition-all active:scale-98 cursor-pointer border border-[#D4AF37]"
                >
                  <KeyRound className="w-4 h-4 text-[#071324]" />
                  <span>Sign In & Enter Sweet Shop</span>
                </button>
              </form>
            ) : (
              /* Register Form */
              <form onSubmit={handleRegister} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-blue-200 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-blue-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      id="reg-name-input"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Kiran Rao"
                      className="w-full h-10 pl-10 pr-3 rounded-xl bg-white/10 border border-blue-800/80 focus:border-[#D4AF37] text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-blue-200 mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-blue-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="tel"
                        id="reg-phone-input"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="+91 98450 12345"
                        className="w-full h-10 pl-10 pr-3 rounded-xl bg-white/10 border border-blue-800/80 focus:border-[#D4AF37] text-white text-xs placeholder:text-slate-400 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-blue-200 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-blue-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        id="reg-email-input"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="w-full h-10 pl-10 pr-3 rounded-xl bg-white/10 border border-blue-800/80 focus:border-[#D4AF37] text-white text-xs placeholder:text-slate-400 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-blue-200 mb-1">
                      Hubli Delivery Area
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-blue-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        id="reg-area-select"
                        value={regArea}
                        onChange={(e) => setRegArea(e.target.value)}
                        className="w-full h-10 pl-10 pr-3 rounded-xl bg-[#091C36] border border-blue-800/80 focus:border-[#D4AF37] text-white text-xs focus:outline-none transition-all"
                      >
                        <option value="Old Hubli">Old Hubli (560024)</option>
                        <option value="Vidyanagar">Vidyanagar</option>
                        <option value="Keshwapur">Keshwapur</option>
                        <option value="Deshpande Nagar">Deshpande Nagar</option>
                        <option value="Gokul Road">Gokul Road</option>
                        <option value="Bengeri">Bengeri</option>
                        <option value="Shirur Park">Shirur Park</option>
                        <option value="Other Hubli-Dharwad">Other Hubli-Dharwad Area</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-blue-200 mb-1">
                      Set Password *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-blue-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="password"
                        id="reg-password-input"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Min 4 characters"
                        className="w-full h-10 pl-10 pr-3 rounded-xl bg-white/10 border border-blue-800/80 focus:border-[#D4AF37] text-white text-xs placeholder:text-slate-400 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-900/30 border border-blue-800/50 flex items-start space-x-2 text-[11px] text-blue-100">
                  <Gift className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>
                    New account perks: instant <strong>15% OFF (Code: FESTIVE15)</strong> and saved addresses for rapid checkout.
                  </span>
                </div>

                <button
                  type="submit"
                  id="submit-register-button"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] hover:brightness-110 text-[#071324] font-cinzel font-bold text-sm shadow-xl flex items-center justify-center space-x-2 transition-all active:scale-98 cursor-pointer border border-[#D4AF37]"
                >
                  <Sparkles className="w-4 h-4 text-[#071324]" />
                  <span>Create Account & Start Ordering</span>
                </button>
              </form>
            )}

            {/* Quick Demo Access (1-Click) */}
            <div className="pt-4 border-t border-blue-900/60 space-y-2.5">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block text-center">
                Instant 1-Click Demo Login
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {demoAccounts.map((account) => (
                  <button
                    key={account.id}
                    type="button"
                    onClick={() => handleQuickLogin(account)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-blue-800/60 hover:border-[#D4AF37]/60 text-left transition-all flex items-center space-x-2.5 group cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#133E87] text-[#F3E5AB] font-bold text-xs flex items-center justify-center shrink-0 border border-blue-400/30">
                      {account.name[0]}
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-semibold text-white group-hover:text-[#F3E5AB] truncate">
                        {account.name}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {account.address?.split(',')[0]}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Guest / Skip Option */}
            <div className="pt-2 text-center">
              <button
                type="button"
                id="continue-as-guest-button"
                onClick={onContinueAsGuest}
                className="inline-flex items-center space-x-1.5 text-xs sm:text-sm text-slate-300 hover:text-[#D4AF37] font-semibold transition-colors py-1 cursor-pointer"
              >
                <UtensilsCrossed className="w-4 h-4 text-[#D4AF37]" />
                <span>Explore as Guest without logging in</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Footer Trust strip inside Card */}
          <div className="bg-[#061220] py-3.5 px-6 border-t border-blue-900/60 flex flex-wrap items-center justify-around gap-2 text-[11px] text-slate-300">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>100% Pure Cow Ghee</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Old Hubli Express Delivery</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Festive Gift Packaging</span>
            </div>
          </div>

          {/* Owner Identity Strip Inside Login Card */}
          <div className="bg-[#040C16] py-2.5 px-6 border-t border-blue-950 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <BadgeCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span className="text-slate-400">Proprietor:</span>
              <span className="font-bold text-[#F3E5AB] tracking-wide">{BUSINESS_INFO.ownerName}</span>
            </div>
            <span className="text-[11px] text-amber-300/90 font-medium">
              Old Hubli Heritage Sweetmaker
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Owner Signature & Copyright Footer */}
      <footer className="relative z-10 py-5 px-4 text-center border-t border-blue-900/40 bg-[#050E1A]/90 backdrop-blur-md">
        <div className="max-w-xl mx-auto flex flex-col items-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#0B2545] via-[#133E87]/60 to-[#0B2545] border border-[#D4AF37]/60 text-xs shadow-md">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-slate-300">Bakery Owner & Master Artisan:</span>
            <strong className="text-[#D4AF37] font-bold text-sm tracking-wide">
              {BUSINESS_INFO.ownerName}
            </strong>
          </div>
          <p className="text-xs text-slate-400">
            {BUSINESS_INFO.brandName} • {BUSINESS_INFO.address}
          </p>
          <p className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} {BUSINESS_INFO.brandName} by {BUSINESS_INFO.ownerName} • All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
};
