import React, { useState } from 'react';
import {
  Trophy,
  Award,
  Flame,
  CheckCircle2,
  TrendingUp,
  Users,
  Target,
  Medal,
  Sparkles
} from 'lucide-react';
import { useCricket } from '../context/CricketContext';
import { TEAMS } from '../data/mockCricketData';

export const LeaderboardView: React.FC = () => {
  const { leaderboard, currentUser, matches, submitPrediction, userPredictions } = useCricket();
  const [filterTab, setFilterTab] = useState<'global' | 'weekly' | 'friends'>('global');

  const liveMatches = matches.filter(m => m.status === 'LIVE');
  const userRankEntry = leaderboard.find(u => u.isCurrentUser);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-amber-950/40 border border-slate-800 p-6 overflow-hidden">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Trophy className="w-4 h-4" />
            <span>Cricket Forecaster Championship</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Interactive Fan Leaderboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            Predict match outcomes, top scorers, and death-over thrillers. Earn points, collect prestigious badges, and rank against cricket connoisseurs worldwide.
          </p>
        </div>

        {/* User's Current Standing Card */}
        {userRankEntry && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/70 p-4 rounded-xl border border-slate-800 font-mono">
            <div>
              <span className="text-[10px] text-slate-400 font-sans block uppercase">Your Global Rank</span>
              <span className="text-xl font-black text-amber-400">#{userRankEntry.rank}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-sans block uppercase">Total Points</span>
              <span className="text-xl font-black text-white">{userRankEntry.points.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-sans block uppercase">Prediction Accuracy</span>
              <span className="text-xl font-black text-emerald-400">{userRankEntry.accuracy}%</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-sans block uppercase">Correct Picks</span>
              <span className="text-xl font-black text-cyan-400">
                {userRankEntry.correctCount}/{userRankEntry.predictionsCount}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Prediction Challenge Section for Live Matches */}
      {liveMatches.length > 0 && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <h3 className="font-extrabold text-sm sm:text-base text-white">
                Live Match Prediction Bonus (+100 Pts)
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">Lock your pick before final over</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveMatches.map((m) => {
              const currentPred = userPredictions[m.id];
              return (
                <div
                  key={m.id}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-slate-200">{m.league}</span>
                    <span className="text-red-400 font-bold uppercase text-[10px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      Live Now
                    </span>
                  </div>

                  <p className="text-sm font-bold text-white mb-3">
                    {m.team1.shortName} vs {m.team2.shortName}
                  </p>

                  {currentPred ? (
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center justify-between">
                      <span>
                        Backed:{' '}
                        <strong>
                          {TEAMS.find((t) => t.id === currentPred.predictedWinnerId)?.name || 'Team'}
                        </strong>
                      </span>
                      <span className="font-mono text-amber-400 font-bold">+100 Pts Active</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => submitPrediction(m.id, m.team1.id, 'Virat Kohli')}
                        className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
                      >
                        Back {m.team1.shortName} ({m.team1.flagEmoji})
                      </button>
                      <button
                        onClick={() => submitPrediction(m.id, m.team2.id, 'Glenn Maxwell')}
                        className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
                      >
                        Back {m.team2.shortName} ({m.team2.flagEmoji})
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        {/* Table Filters */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
            <button
              onClick={() => setFilterTab('global')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                filterTab === 'global' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Global All-Time
            </button>
            <button
              onClick={() => setFilterTab('weekly')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                filterTab === 'weekly' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setFilterTab('friends')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                filterTab === 'friends' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              League Friends
            </button>
          </div>

          <span className="text-xs text-slate-500">Updated after each match ball</span>
        </div>

        {/* Table Header & Rows */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/60 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4 w-16 text-center">Rank</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4 hidden sm:table-cell">Favorite Team</th>
                <th className="py-3 px-4 text-right font-mono">Accuracy</th>
                <th className="py-3 px-4 text-right font-mono">Picks Won</th>
                <th className="py-3 px-4 text-right font-mono">Points</th>
                <th className="py-3 px-4 hidden md:table-cell">Badges</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {leaderboard.map((user) => (
                <tr
                  key={user.userId}
                  className={`transition-colors ${
                    user.isCurrentUser
                      ? 'bg-emerald-500/10 hover:bg-emerald-500/15 font-semibold'
                      : 'hover:bg-slate-800/40'
                  }`}
                >
                  {/* Rank */}
                  <td className="py-3.5 px-4 text-center">
                    {user.rank === 1 && (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-black border border-amber-500/30">
                        🥇
                      </span>
                    )}
                    {user.rank === 2 && (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-400/20 text-slate-300 font-black border border-slate-400/30">
                        🥈
                      </span>
                    )}
                    {user.rank === 3 && (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-700/20 text-amber-600 font-black border border-amber-700/30">
                        🥉
                      </span>
                    )}
                    {user.rank > 3 && (
                      <span className="font-mono font-bold text-slate-400 text-sm">
                        #{user.rank}
                      </span>
                    )}
                  </td>

                  {/* User */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-700"
                      />
                      <div>
                        <span className="font-bold text-sm text-white flex items-center gap-1.5">
                          {user.name}
                          {user.isCurrentUser && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-normal">
                              You
                            </span>
                          )}
                        </span>
                        <span className="text-[10px] text-slate-400 sm:hidden block">
                          {user.favoriteTeam}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Favorite Team */}
                  <td className="py-3.5 px-4 hidden sm:table-cell text-slate-300 font-medium">
                    {user.favoriteTeam}
                  </td>

                  {/* Accuracy */}
                  <td className="py-3.5 px-4 text-right font-mono text-emerald-400 font-bold">
                    {user.accuracy}%
                  </td>

                  {/* Picks */}
                  <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                    {user.correctCount}/{user.predictionsCount}
                  </td>

                  {/* Points */}
                  <td className="py-3.5 px-4 text-right font-mono font-extrabold text-white text-sm">
                    {user.points.toLocaleString()}
                  </td>

                  {/* Badges */}
                  <td className="py-3.5 px-4 hidden md:table-cell">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {user.badges.map((badge, bIdx) => (
                        <span
                          key={bIdx}
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700/80 whitespace-nowrap"
                        >
                          🎖️ {badge}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
