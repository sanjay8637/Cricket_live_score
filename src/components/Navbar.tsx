import React, { useState } from 'react';
import {
  Bell,
  Search,
  Moon,
  Sun,
  Flame,
  Wifi,
  WifiOff,
  Smartphone,
  User,
  Sliders,
  Play,
  Pause,
  ChevronDown,
  X,
  Radio,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { useCricket } from '../context/CricketContext';
import { TEAMS } from '../data/mockCricketData';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenAuth: () => void;
  onOpenSettings: () => void;
  onOpenSync: () => void;
  onOpenOffline: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  onOpenAuth,
  onOpenSettings,
  onOpenSync,
  onOpenOffline
}) => {
  const {
    currentUser,
    notifications,
    unreadNotificationCount,
    markNotificationAsRead,
    clearNotifications,
    darkMode,
    setDarkMode,
    isOfflineMode,
    toggleOfflineMode,
    simulationActive,
    toggleSimulation,
    searchQuery,
    setSearchQuery,
    setActiveMatchModal,
    matches
  } = useCricket();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { id: 'matches', label: 'Live Matches' },
    { id: 'dashboard', label: 'My Hub' },
    { id: 'players', label: 'Player Stats' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'forum', label: 'Fan Forum' },
    { id: 'archives', label: 'Past Seasons' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-md transition-colors">
      {/* Top Banner / Ticker bar indicator */}
      <div className="flex items-center justify-between px-4 py-1 text-[11px] font-medium tracking-wider uppercase border-b border-slate-900 bg-slate-900/60 text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>ICC Champions Trophy Final · Live at MCG</span>
          </span>
          <span className="hidden sm:inline text-slate-700">|</span>
          <span className="hidden sm:inline text-amber-400 font-mono">
            AUS 264/5 (46.2) · Need 35 runs in 22 balls
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          {/* Live Simulator state control */}
          <button
            onClick={toggleSimulation}
            title={simulationActive ? 'Pause real-time match simulation' : 'Resume real-time match simulation'}
            className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            {simulationActive ? (
              <>
                <Pause className="w-3 h-3 text-emerald-400" />
                <span className="hidden md:inline">Simulating Live</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-amber-400" />
                <span className="hidden md:inline">Paused</span>
              </>
            )}
          </button>

          {/* Offline Mode Indicator */}
          <button
            onClick={toggleOfflineMode}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] transition-colors ${
              isOfflineMode
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'hover:bg-slate-800 text-slate-400'
            }`}
            title="Toggle offline test mode"
          >
            {isOfflineMode ? (
              <>
                <WifiOff className="w-3 h-3 text-amber-400" />
                <span>Offline Mode (Cached Data)</span>
              </>
            ) : (
              <>
                <Wifi className="w-3 h-3 text-emerald-400" />
                <span className="hidden md:inline">Online Sync</span>
              </>
            )}
          </button>

          {/* Multi Device Sync link */}
          <button
            onClick={onOpenSync}
            className="flex items-center gap-1 hover:text-white transition-colors"
            title="Sync across devices"
          >
            <Smartphone className="w-3 h-3 text-cyan-400" />
            <span className="hidden md:inline">Multi-Device</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onTabChange('matches')}
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <span className="text-xl">🏏</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-300 bg-clip-text text-transparent">
                  CricPulse
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                  Live
                </span>
              </div>
              <p className="text-[10px] text-slate-400 -mt-0.5 font-medium">Scores · Stats · Fan Hub</p>
            </div>
          </button>

          {/* Primary Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
                    active
                      ? 'text-white bg-slate-800/90 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Search Bar & Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Global Search Bar */}
          <div className="relative hidden sm:block w-48 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search teams, players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900/90 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Dark Mode Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => setDarkMode('dark')}
              className={`p-1.5 rounded-md text-xs transition-colors ${
                darkMode === 'dark' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Dark Mode"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDarkMode('pitch')}
              className={`p-1.5 rounded-md text-xs font-mono font-bold transition-colors ${
                darkMode === 'pitch' ? 'bg-slate-950 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Pitch OLED Black (Ultra Night Mode)"
            >
              <span className="text-[10px]">OLED</span>
            </button>
            <button
              onClick={() => setDarkMode('light')}
              className={`p-1.5 rounded-md text-xs transition-colors ${
                darkMode === 'light' ? 'bg-slate-200 text-amber-600' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Floodlight Mode"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              title="Match Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-slate-950 shadow-md">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-slate-800 bg-slate-900 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-white">Live Match Alerts</span>
                    <span className="text-[10px] text-slate-400">({notifications.length})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={onOpenSettings}
                      className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <Sliders className="w-3 h-3" />
                      <span>Configure</span>
                    </button>
                    {notifications.length > 0 && (
                      <button
                        onClick={clearNotifications}
                        className="text-[11px] text-slate-400 hover:text-red-400 transition-colors"
                        title="Clear all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60 mt-1">
                  {notifications.length === 0 ? (
                    <div className="text-center py-6 text-xs text-slate-500">
                      No notifications yet. Live match moments will appear here.
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          markNotificationAsRead(notif.id);
                          const target = matches.find((m) => m.id === notif.matchId);
                          if (target) setActiveMatchModal(target);
                          setShowNotifications(false);
                        }}
                        className={`p-2.5 rounded-lg cursor-pointer hover:bg-slate-800/60 transition-colors ${
                          !notif.read ? 'bg-slate-800/30' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-xs text-emerald-300">
                            {notif.title}
                          </span>
                          <span className="text-[10px] text-slate-500 whitespace-nowrap">
                            {notif.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                          {notif.message}
                        </p>
                        <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-between">
                          <span>{notif.matchTitle}</span>
                          <span className="text-emerald-400 text-[10px]">Open Match →</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Account Button */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-emerald-500"
                />
                <span className="text-xs font-semibold text-slate-200 hidden md:inline">
                  {currentUser.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-800 bg-slate-900 shadow-xl p-2 z-50">
                  <div className="px-3 py-2 border-b border-slate-800">
                    <p className="text-xs font-bold text-white">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                        ⭐ {currentUser.stats.fantasyPoints} Pts
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                        🔥 {currentUser.stats.streakDays}d Streak
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        onTabChange('dashboard');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg"
                    >
                      Personal Dashboard
                    </button>
                    <button
                      onClick={() => {
                        onOpenSettings();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg"
                    >
                      Notification Preferences
                    </button>
                    <button
                      onClick={() => {
                        onOpenSync();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg"
                    >
                      Multi-Device Sync
                    </button>
                    <button
                      onClick={() => {
                        onOpenOffline();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg"
                    >
                      Offline Downloads
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Nav Links Row */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-slate-900 scrollbar-none bg-slate-950/80">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap rounded-md transition-colors ${
              currentTab === item.id
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
