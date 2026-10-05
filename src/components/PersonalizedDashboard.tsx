import React from 'react';
import {
  Star,
  Flame,
  Award,
  Calendar,
  Bell,
  Eye,
  CheckCircle2,
  TrendingUp,
  Radio,
  Sliders,
  Smartphone,
  WifiOff,
  UserCheck
} from 'lucide-react';
import { useCricket } from '../context/CricketContext';
import { TEAMS } from '../data/mockCricketData';
import { MatchCard } from './MatchCard';
import { Match } from '../types/cricket';

interface PersonalizedDashboardProps {
  onOpenMatchDetail: (match: Match) => void;
  onOpenShare: (match: Match) => void;
  onOpenSettings: () => void;
  onOpenSync: () => void;
}

export const PersonalizedDashboard: React.FC<PersonalizedDashboardProps> = ({
  onOpenMatchDetail,
  onOpenShare,
  onOpenSettings,
  onOpenSync
}) => {
  const {
    currentUser,
    toggleFavoriteTeam,
    matches,
    notificationSettings,
    updateNotificationSettings
  } = useCricket();

  if (!currentUser) {
    return (
      <div className="p-8 text-center rounded-2xl bg-slate-900 border border-slate-800">
        <Star className="w-12 h-12 text-amber-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white">Sign In to Customize Your Hub</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
          Track your favorite cricket teams, receive tailored match notifications, and monitor your personal prediction stats.
        </p>
      </div>
    );
  }

  const favoriteTeamObjects = TEAMS.filter((t) =>
    currentUser.favoriteTeams.includes(t.id)
  );

  const favoriteMatches = matches.filter(
    (m) =>
      currentUser.favoriteTeams.includes(m.team1.id) ||
      currentUser.favoriteTeams.includes(m.team2.id)
  );

  const accuracyPercent = currentUser.stats.predictionsTotal > 0
    ? ((currentUser.stats.predictionsWon / currentUser.stats.predictionsTotal) * 100).toFixed(1)
    : '0';

  return (
    <div className="space-y-8">
      {/* Top Profile & Statistics Header */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/40 border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">{currentUser.name}</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Verified Member
                </span>
              </div>
              <p className="text-xs text-slate-400">{currentUser.email}</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Joined {currentUser.joinedDate} · Tracking {currentUser.favoriteTeams.length} Favorite Teams
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSettings}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
            >
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              <span>Alert Preferences</span>
            </button>
            <button
              onClick={onOpenSync}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
            >
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sync Devices</span>
            </button>
          </div>
        </div>

        {/* Personalized Stats Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-slate-800/80 font-mono">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 text-center">
            <span className="text-[10px] text-slate-400 font-sans block uppercase">Fantasy Pts</span>
            <span className="text-lg font-black text-amber-400">{currentUser.stats.fantasyPoints}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 text-center">
            <span className="text-[10px] text-slate-400 font-sans block uppercase">Accuracy</span>
            <span className="text-lg font-black text-emerald-400">{accuracyPercent}%</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 text-center">
            <span className="text-[10px] text-slate-400 font-sans block uppercase">Picks Won</span>
            <span className="text-lg font-black text-white">
              {currentUser.stats.predictionsWon}/{currentUser.stats.predictionsTotal}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 text-center">
            <span className="text-[10px] text-slate-400 font-sans block uppercase">Active Streak</span>
            <span className="text-lg font-black text-rose-400">🔥 {currentUser.stats.streakDays}d</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 text-center">
            <span className="text-[10px] text-slate-400 font-sans block uppercase">Matches Followed</span>
            <span className="text-lg font-black text-cyan-400">{currentUser.stats.matchesWatched}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 text-center">
            <span className="text-[10px] text-slate-400 font-sans block uppercase">Forum Debates</span>
            <span className="text-lg font-black text-purple-400">{currentUser.stats.forumPostsCount}</span>
          </div>
        </div>
      </div>

      {/* Favorite Teams Selector */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-current" />
              <span>Select Your Favorite Teams</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Pinned teams receive high-priority notifications, customized fixtures, and dedicated widget feeds.
            </p>
          </div>
          <span className="text-xs text-slate-500">
            {currentUser.favoriteTeams.length} Selected
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {TEAMS.map((team) => {
            const isFav = currentUser.favoriteTeams.includes(team.id);
            return (
              <button
                key={team.id}
                onClick={() => toggleFavoriteTeam(team.id)}
                className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                  isFav
                    ? 'border-emerald-500 bg-emerald-500/10 shadow-sm'
                    : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800/60 text-slate-400'
                }`}
              >
                <span className="text-2xl">{team.flagEmoji}</span>
                <div className="truncate">
                  <p className={`text-xs font-bold truncate ${isFav ? 'text-white' : 'text-slate-300'}`}>
                    {team.name}
                  </p>
                  <span className="text-[10px] text-slate-500">{team.shortName}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Personalized Match Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Your Pinned Team Matches</h3>
          </div>
          <span className="text-xs text-slate-400">
            Showing {favoriteMatches.length} matches featuring your teams
          </span>
        </div>

        {favoriteMatches.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
            No matches scheduled for your selected teams. Tap teams above to start tracking them!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favoriteMatches.map((m) => (
              <MatchCard
                key={m.id}
                match={m}
                onOpenDetail={onOpenMatchDetail}
                onOpenShare={onOpenShare}
              />
            ))}
          </div>
        )}
      </div>

      {/* Dedicated Team Alert Settings Pill */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">Favorite Teams Only Mode</h4>
            <p className="text-xs text-slate-400">
              Only send real-time push alerts and match summaries for matches involving your pinned teams.
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            updateNotificationSettings({
              favoriteTeamsOnly: !notificationSettings.favoriteTeamsOnly
            })
          }
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
            notificationSettings.favoriteTeamsOnly
              ? 'bg-emerald-500 text-slate-950'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
        >
          {notificationSettings.favoriteTeamsOnly ? 'Active (Favorites Only)' : 'All Matches Enabled'}
        </button>
      </div>
    </div>
  );
};
