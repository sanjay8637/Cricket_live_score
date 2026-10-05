import React, { useState } from 'react';
import {
  Search,
  Award,
  TrendingUp,
  Shield,
  Zap,
  Target,
  User,
  ChevronRight,
  X
} from 'lucide-react';
import { useCricket } from '../context/CricketContext';
import { Player } from '../types/cricket';

export const PlayersDatabase: React.FC = () => {
  const { players } = useCricket();
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const filteredPlayers = players.filter((p) => {
    const matchesRole = roleFilter === 'ALL' || p.role === roleFilter;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.teamName.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Player Statistics & ICC Rankings
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Comprehensive career metrics, strike rates, bowling averages, and current form guide.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative w-full sm:w-56">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search player or team..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Role Filter */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
            {['ALL', 'Batter', 'Bowler', 'All-Rounder', 'Wicket-Keeper'].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  roleFilter === role
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {role === 'Wicket-Keeper' ? 'Keeper' : role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlayers.map((player) => (
          <div
            key={player.id}
            onClick={() => setSelectedPlayer(player)}
            className="group p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 hover:border-emerald-500/40 transition-all duration-200 cursor-pointer shadow-md flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-extrabold text-base shadow-md ring-1 ring-white/10"
                    style={{ backgroundColor: player.avatarBg }}
                  >
                    {player.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                      {player.name}
                    </h3>
                    <p className="text-xs text-slate-400">{player.teamName}</p>
                    <span className="inline-block mt-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      {player.role}
                    </span>
                  </div>
                </div>

                {/* ICC Ranking Badge */}
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">ICC Rank</span>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {player.iccRank.t20i ? `#${player.iccRank.t20i} T20I` : `#${player.iccRank.odi} ODI`}
                  </span>
                </div>
              </div>

              {/* Stats Highlights */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/60 text-center font-mono">
                <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/50">
                  <span className="text-[10px] text-slate-400 block uppercase font-sans">
                    {player.role === 'Bowler' ? 'Wickets' : 'Runs'}
                  </span>
                  <span className="text-sm font-extrabold text-white">
                    {player.role === 'Bowler' ? player.stats.wickets : player.stats.runs.toLocaleString()}
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/50">
                  <span className="text-[10px] text-slate-400 block uppercase font-sans">
                    {player.role === 'Bowler' ? 'Econ' : 'Average'}
                  </span>
                  <span className="text-sm font-extrabold text-emerald-400">
                    {player.role === 'Bowler' ? player.stats.economyRate || 4.5 : player.stats.battingAverage}
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/50">
                  <span className="text-[10px] text-slate-400 block uppercase font-sans">
                    {player.role === 'Bowler' ? 'Best' : 'Strike Rate'}
                  </span>
                  <span className="text-sm font-extrabold text-cyan-400">
                    {player.role === 'Bowler' ? player.stats.bestBowling || '3/15' : player.stats.strikeRate}
                  </span>
                </div>
              </div>

              {/* Form Guide */}
              <div className="mt-3 flex items-center justify-between text-xs pt-1">
                <span className="text-[11px] text-slate-400">Recent Form</span>
                <div className="flex items-center gap-1 font-mono text-[10px]">
                  {player.recentForm.map((f, i) => (
                    <span
                      key={i}
                      className={`px-1.5 py-0.5 rounded font-bold ${
                        f === '100' || f === '3W+'
                          ? 'bg-purple-500/20 text-purple-300'
                          : f === '50+'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : f === 'W'
                          ? 'bg-cyan-500/20 text-cyan-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400 group-hover:text-emerald-400">
              <span>View full profile & analytics</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Player Modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg ring-2 ring-emerald-500/40"
                  style={{ backgroundColor: selectedPlayer.avatarBg }}
                >
                  {selectedPlayer.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">{selectedPlayer.name}</h3>
                  <p className="text-xs text-slate-400">{selectedPlayer.teamName}</p>
                  <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                    {selectedPlayer.role} · {selectedPlayer.battingStyle}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedPlayer(null)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              {/* ICC Rankings Breakdown */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-around text-center">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Test Rank</span>
                  <span className="font-mono text-sm font-bold text-white">
                    {selectedPlayer.iccRank.test ? `#${selectedPlayer.iccRank.test}` : '-'}
                  </span>
                </div>
                <div className="h-6 w-px bg-slate-800" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">ODI Rank</span>
                  <span className="font-mono text-sm font-bold text-emerald-400">
                    {selectedPlayer.iccRank.odi ? `#${selectedPlayer.iccRank.odi}` : '-'}
                  </span>
                </div>
                <div className="h-6 w-px bg-slate-800" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">T20I Rank</span>
                  <span className="font-mono text-sm font-bold text-cyan-400">
                    {selectedPlayer.iccRank.t20i ? `#${selectedPlayer.iccRank.t20i}` : '-'}
                  </span>
                </div>
              </div>

              {/* Full Statistics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
                <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-sans block">Matches</span>
                  <span className="text-base font-extrabold text-white">{selectedPlayer.stats.matches}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-sans block">Total Runs</span>
                  <span className="text-base font-extrabold text-emerald-400">{selectedPlayer.stats.runs.toLocaleString()}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-sans block">Batting Avg</span>
                  <span className="text-base font-extrabold text-amber-400">{selectedPlayer.stats.battingAverage}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-sans block">Strike Rate</span>
                  <span className="text-base font-extrabold text-cyan-400">{selectedPlayer.stats.strikeRate}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-sans block">Centuries (100)</span>
                  <span className="text-base font-extrabold text-purple-400">{selectedPlayer.stats.centuries}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-sans block">Fifties (50)</span>
                  <span className="text-base font-extrabold text-slate-200">{selectedPlayer.stats.fifties}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-sans block">Wickets</span>
                  <span className="text-base font-extrabold text-white">{selectedPlayer.stats.wickets}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-sans block">Best Bowling</span>
                  <span className="text-base font-extrabold text-slate-200">{selectedPlayer.stats.bestBowling || 'N/A'}</span>
                </div>
              </div>

              {/* Bowling Style */}
              <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-xs">
                <span className="text-slate-400">Bowling Style: </span>
                <span className="font-semibold text-slate-200">{selectedPlayer.bowlingStyle}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedPlayer(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
