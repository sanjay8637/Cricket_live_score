import React, { useState } from 'react';
import {
  X,
  User,
  Lock,
  Mail,
  ShieldCheck,
  Star,
  Check,
  Sparkles
} from 'lucide-react';
import { useCricket } from '../context/CricketContext';
import { UserProfile } from '../types/cricket';
import { TEAMS } from '../data/mockCricketData';

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { login, currentUser, logout } = useCricket();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [favoriteTeam, setFavoriteTeam] = useState('ind');
  const [avatarIndex, setAvatarIndex] = useState(0);

  const avatarOptions = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
  ];

  const handleDemoLogin = (profile: 'sanjay' | 'liam' | 'kavita') => {
    if (profile === 'sanjay') {
      login({
        id: 'usr-sanjay',
        name: 'Sanjay P',
        email: 'sanjaysanjayp20@gmail.com',
        avatar: avatarOptions[0],
        favoriteTeams: ['ind', 'csk'],
        joinedDate: 'October 2025',
        stats: {
          matchesWatched: 128,
          fantasyPoints: 3980,
          predictionsWon: 33,
          predictionsTotal: 42,
          forumPostsCount: 14,
          streakDays: 9
        }
      });
    } else if (profile === 'liam') {
      login({
        id: 'usr-liam',
        name: 'Liam AussiePunter',
        email: 'liam.cricket@fan.au',
        avatar: avatarOptions[1],
        favoriteTeams: ['aus'],
        joinedDate: 'November 2025',
        stats: {
          matchesWatched: 142,
          fantasyPoints: 4450,
          predictionsWon: 41,
          predictionsTotal: 50,
          forumPostsCount: 22,
          streakDays: 14
        }
      });
    } else {
      login({
        id: 'usr-kavita',
        name: 'Kavita YorkerQueen',
        email: 'kavita.cricket@fan.in',
        avatar: avatarOptions[2],
        favoriteTeams: ['csk', 'ind'],
        joinedDate: 'January 2026',
        stats: {
          matchesWatched: 96,
          fantasyPoints: 3740,
          predictionsWon: 32,
          predictionsTotal: 42,
          forumPostsCount: 19,
          streakDays: 7
        }
      });
    }
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const userObj: UserProfile = {
      id: `usr-${Date.now()}`,
      name: name || email.split('@')[0],
      email: email,
      avatar: avatarOptions[avatarIndex],
      favoriteTeams: [favoriteTeam],
      joinedDate: 'Just now',
      stats: {
        matchesWatched: 1,
        fantasyPoints: 500, // Welcome bonus
        predictionsWon: 0,
        predictionsTotal: 0,
        forumPostsCount: 0,
        streakDays: 1
      }
    };

    login(userObj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-extrabold text-base text-white">
              {currentUser ? 'Account Profile' : isSignUp ? 'Create Cricket Fan Account' : 'Sign In to CricPulse'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {currentUser ? (
          /* Logged In View */
          <div className="py-4 space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-emerald-500"
              />
              <div>
                <p className="font-bold text-sm text-white">{currentUser.name}</p>
                <p className="text-xs text-slate-400">{currentUser.email}</p>
                <p className="text-[11px] text-amber-400 font-mono mt-0.5">
                  ⭐ {currentUser.stats.fantasyPoints} Points · {currentUser.stats.streakDays} Day Streak
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-300">Pinned Teams</span>
              <div className="flex flex-wrap gap-1.5">
                {currentUser.favoriteTeams.map((tid) => {
                  const t = TEAMS.find(item => item.id === tid);
                  return (
                    <span
                      key={tid}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-1.5"
                    >
                      <span>{t?.flagEmoji}</span>
                      <span>{t?.name || tid}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold text-xs border border-red-500/40 transition-colors"
            >
              Sign Out of CricPulse
            </button>
          </div>
        ) : (
          /* Sign In / Sign Up Form */
          <div className="py-4 space-y-4">
            {/* Quick Demo Logins */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Quick Demo Fan Accounts
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('sanjay')}
                  className="py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-white transition-colors"
                >
                  🇮🇳 Sanjay P
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('liam')}
                  className="py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-white transition-colors"
                >
                  🇦🇺 Liam Punter
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('kavita')}
                  className="py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-white transition-colors"
                >
                  🦁 Kavita (CSK)
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Rahul Dravid"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                      required={isSignUp}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="user@cricketfan.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              {isSignUp && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Choose Your Primary Favorite Team
                    </label>
                    <select
                      value={favoriteTeam}
                      onChange={(e) => setFavoriteTeam(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    >
                      {TEAMS.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.flagEmoji} {t.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Avatar Style</label>
                    <div className="flex items-center gap-2">
                      {avatarOptions.map((av, idx) => (
                        <img
                          key={idx}
                          src={av}
                          alt="avatar"
                          onClick={() => setAvatarIndex(idx)}
                          className={`w-9 h-9 rounded-xl object-cover cursor-pointer ring-2 transition-all ${
                            avatarIndex === idx ? 'ring-emerald-500 scale-105' : 'ring-transparent opacity-60'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full mt-2 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-md"
              >
                {isSignUp ? 'Register & Claim 500 Welcome Pts' : 'Sign In to Account'}
              </button>
            </form>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs text-slate-400 hover:text-emerald-400 transition-colors"
              >
                {isSignUp ? 'Already have an account? Sign In' : 'New to CricPulse? Create Account'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
