import React, { useState } from 'react';
import { CricketProvider, useCricket } from './context/CricketContext';
import { Navbar } from './components/Navbar';
import { LiveTicker } from './components/LiveTicker';
import { MatchCard } from './components/MatchCard';
import { MatchDetailModal } from './components/MatchDetailModal';
import { ShareHighlightModal } from './components/ShareHighlightModal';
import { PlayersDatabase } from './components/PlayersDatabase';
import { LeaderboardView } from './components/LeaderboardView';
import { ForumView } from './components/ForumView';
import { PersonalizedDashboard } from './components/PersonalizedDashboard';
import { HistoricalDatabase } from './components/HistoricalDatabase';
import { NotificationSettingsModal } from './components/NotificationSettingsModal';
import { DeviceSyncModal } from './components/DeviceSyncModal';
import { OfflineManagerModal } from './components/OfflineManagerModal';
import { AuthModal } from './components/AuthModal';
import { Match } from './types/cricket';
import {
  Filter,
  Search,
  Calendar,
  Radio,
  Flame,
  X,
  TrendingUp,
  Sparkles,
  WifiOff
} from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    matches,
    activeMatchModal,
    setActiveMatchModal,
    selectedLeague,
    setSelectedLeague,
    selectedFormat,
    setSelectedFormat,
    selectedStatus,
    setSelectedStatus,
    searchQuery,
    setSearchQuery,
    isOfflineMode,
    notifications
  } = useCricket();

  const [currentTab, setCurrentTab] = useState<string>('matches');
  const [shareMatch, setShareMatch] = useState<Match | null>(null);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showSyncModal, setShowSyncModal] = useState<boolean>(false);
  const [showOfflineModal, setShowOfflineModal] = useState<boolean>(false);

  // League options for filtering
  const leagues = [
    'ALL',
    'ICC Champions Trophy',
    'IPL 2026',
    'ICC T20 World Cup',
    'The Ashes'
  ];

  // Filter matches based on criteria
  const filteredMatches = matches.filter((m) => {
    const matchesLeague = selectedLeague === 'ALL' || m.league === selectedLeague;
    const matchesFormat = selectedFormat === 'ALL' || m.format === selectedFormat;
    const matchesStatus = selectedStatus === 'ALL' || m.status === selectedStatus;
    const matchesSearch =
      searchQuery.trim() === '' ||
      m.team1.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.team2.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.team1.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.team2.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.league.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesLeague && matchesFormat && matchesStatus && matchesSearch;
  });

  const latestUnreadNotif = notifications.find(n => !n.read && n.timestamp === 'Just now');

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 transition-colors selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenSettings={() => setShowSettingsModal(true)}
        onOpenSync={() => setShowSyncModal(true)}
        onOpenOffline={() => setShowOfflineModal(true)}
      />

      {/* Horizontal Live Match Ticker */}
      <LiveTicker
        onSelectMatch={(match) => setActiveMatchModal(match)}
        onShareMatch={(match) => setShareMatch(match)}
      />

      {/* Offline Alert Strip when in offline mode */}
      {isOfflineMode && (
        <div className="bg-amber-500/20 border-b border-amber-500/30 px-4 py-2 text-xs text-amber-300 flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <span className="flex items-center gap-2 font-medium">
              <WifiOff className="w-4 h-4" />
              <span>Offline Browsing Mode active. You are viewing locally cached scorecards and schedules.</span>
            </span>
            <button
              onClick={() => setShowOfflineModal(true)}
              className="underline hover:text-white font-semibold"
            >
              Manage Storage
            </button>
          </div>
        </div>
      )}

      {/* Floating In-App Live Notification Toast */}
      {latestUnreadNotif && (
        <div
          onClick={() => {
            const target = matches.find(m => m.id === latestUnreadNotif.matchId);
            if (target) setActiveMatchModal(target);
          }}
          className="fixed bottom-6 right-6 z-50 max-w-sm p-4 rounded-2xl bg-slate-900 border border-emerald-500/50 shadow-2xl cursor-pointer hover:bg-slate-850 transition-all animate-bounce"
        >
          <div className="flex items-start gap-3">
            <span className="text-xl">🏏</span>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">{latestUnreadNotif.title}</span>
                <span className="text-[10px] text-slate-500">{latestUnreadNotif.timestamp}</span>
              </div>
              <p className="text-xs text-slate-200 mt-1 line-clamp-2">{latestUnreadNotif.message}</p>
              <span className="text-[10px] text-emerald-400 mt-1.5 block font-semibold">Tap to view live ball →</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Tab 1: Live Matches & Fixtures */}
        {currentTab === 'matches' && (
          <div className="space-y-6">
            {/* Filter Toolbar */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                {/* League Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 lg:pb-0">
                  {leagues.map((league) => (
                    <button
                      key={league}
                      onClick={() => setSelectedLeague(league)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                        selectedLeague === league
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {league === 'ALL' ? 'All Leagues' : league}
                    </button>
                  ))}
                </div>

                {/* Status & Format Segmented Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Status */}
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                    {[
                      { id: 'ALL', label: 'All Status' },
                      { id: 'LIVE', label: '● Live' },
                      { id: 'UPCOMING', label: 'Upcoming' },
                      { id: 'FINISHED', label: 'Results' }
                    ].map((st) => (
                      <button
                        key={st.id}
                        onClick={() => setSelectedStatus(st.id)}
                        className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                          selectedStatus === st.id
                            ? 'bg-slate-800 text-white shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>

                  {/* Format */}
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                    {['ALL', 'T20', 'ODI', 'TEST'].map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setSelectedFormat(fmt)}
                        className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                          selectedFormat === fmt
                            ? 'bg-slate-800 text-white shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Matches Cards Grid */}
            {filteredMatches.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800">
                <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h3 className="font-bold text-base text-white">No matches found</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Try adjusting your filters or search keywords.
                </p>
                <button
                  onClick={() => {
                    setSelectedLeague('ALL');
                    setSelectedFormat('ALL');
                    setSelectedStatus('ALL');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredMatches.map((match) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    onOpenDetail={(m) => setActiveMatchModal(m)}
                    onOpenShare={(m) => setShareMatch(m)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Personalized Dashboard */}
        {currentTab === 'dashboard' && (
          <PersonalizedDashboard
            onOpenMatchDetail={(m) => setActiveMatchModal(m)}
            onOpenShare={(m) => setShareMatch(m)}
            onOpenSettings={() => setShowSettingsModal(true)}
            onOpenSync={() => setShowSyncModal(true)}
          />
        )}

        {/* Tab 3: Player Statistics Database */}
        {currentTab === 'players' && <PlayersDatabase />}

        {/* Tab 4: Interactive Leaderboard & Predictions */}
        {currentTab === 'leaderboard' && <LeaderboardView />}

        {/* Tab 5: Fan Discussion Forum */}
        {currentTab === 'forum' && <ForumView />}

        {/* Tab 6: Historical Database & Past Seasons */}
        {currentTab === 'archives' && <HistoricalDatabase />}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🏏</span>
            <span className="font-extrabold text-sm text-slate-300">CricPulse</span>
            <span>· Real-time cricket scores, live ball-by-ball analysis, player statistics & fan hub.</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <button onClick={() => setShowSettingsModal(true)} className="hover:text-white">
              Notifications
            </button>
            <button onClick={() => setShowSyncModal(true)} className="hover:text-white">
              Device Sync
            </button>
            <button onClick={() => setShowOfflineModal(true)} className="hover:text-white">
              Offline Cache
            </button>
            <button onClick={() => setShowAuthModal(true)} className="hover:text-white">
              My Profile
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {activeMatchModal && (
        <MatchDetailModal
          match={activeMatchModal}
          onClose={() => setActiveMatchModal(null)}
          onOpenShare={(m) => setShareMatch(m)}
        />
      )}

      {shareMatch && (
        <ShareHighlightModal
          match={shareMatch}
          onClose={() => setShareMatch(null)}
        />
      )}

      {showSettingsModal && (
        <NotificationSettingsModal onClose={() => setShowSettingsModal(false)} />
      )}

      {showSyncModal && (
        <DeviceSyncModal onClose={() => setShowSyncModal(false)} />
      )}

      {showOfflineModal && (
        <OfflineManagerModal
          onClose={() => setShowOfflineModal(false)}
          onOpenMatch={(m) => setActiveMatchModal(m)}
        />
      )}

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <CricketProvider>
      <MainContent />
    </CricketProvider>
  );
}
