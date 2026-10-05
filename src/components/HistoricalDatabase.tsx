import React, { useState } from 'react';
import {
  Trophy,
  History,
  Calendar,
  Award,
  ChevronRight,
  Search,
  ExternalLink,
  Sparkles,
  MapPin
} from 'lucide-react';
import { useCricket } from '../context/CricketContext';
import { HistoricalTournament } from '../types/cricket';

export const HistoricalDatabase: React.FC = () => {
  const { historicalTournaments } = useCricket();
  const [selectedFormat, setSelectedFormat] = useState<string>('ALL');
  const [searchYear, setSearchYear] = useState<string>('');
  const [activeTournament, setActiveTournament] = useState<HistoricalTournament | null>(null);

  const filteredTournaments = historicalTournaments.filter((t) => {
    const matchesFormat = selectedFormat === 'ALL' || t.format === selectedFormat;
    const matchesSearch =
      t.name.toLowerCase().includes(searchYear.toLowerCase()) ||
      t.year.toString().includes(searchYear) ||
      t.winner.toLowerCase().includes(searchYear.toLowerCase());
    return matchesFormat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <History className="w-6 h-6 text-amber-400" />
            <span>Past Season Archives & Historic Finals</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Relive iconic championship moments, final scores, tournament MVPs, and historic clutch finishes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Format Selector */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
            {['ALL', 'T20', 'ODI'].map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  selectedFormat === fmt
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {fmt === 'ALL' ? 'All Formats' : fmt}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-44">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search year or champion..."
              value={searchYear}
              onChange={(e) => setSearchYear(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Tournaments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTournaments.map((tourney) => (
          <div
            key={tourney.id}
            onClick={() => setActiveTournament(tourney)}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800/90 hover:border-amber-500/40 cursor-pointer transition-all duration-200 shadow-md group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-black text-amber-400">
                    {tourney.year}
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="text-xs font-semibold text-slate-300">
                    {tourney.format} Format
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  {tourney.edition}
                </span>
              </div>

              <div className="py-4 space-y-2">
                <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                  {tourney.name}
                </h3>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Champion:</span>
                    <strong className="text-amber-400 font-extrabold text-sm flex items-center gap-1">
                      🏆 {tourney.winner}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-1">
                    <span className="text-slate-400">Runner-up:</span>
                    <span className="text-slate-300">{tourney.runnerUp}</span>
                  </div>
                </div>

                <p className="text-xs text-emerald-400 font-mono font-medium pt-1">
                  ⚡ {tourney.finalScore}
                </p>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {tourney.summary}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500 group-hover:text-white transition-colors">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{tourney.venue}</span>
              </span>
              <span className="flex items-center gap-1 text-amber-400 font-semibold">
                <span>View Full Archive</span>
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Tournament Details Modal */}
      {activeTournament && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400">{activeTournament.year} Season Archive</span>
                <h3 className="text-lg font-black text-white">{activeTournament.name}</h3>
              </div>
              <button
                onClick={() => setActiveTournament(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-400">Final Outcome:</span>
                  <span className="text-slate-300 font-mono">{activeTournament.venue}</span>
                </div>
                <p className="font-bold text-sm text-emerald-400 font-mono">
                  {activeTournament.finalScore}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Player of the Tournament
                </span>
                <p className="text-sm font-semibold text-white bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
                  🏅 {activeTournament.playerOfTournament}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Tournament Storyline
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-800">
                  {activeTournament.summary}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Historic Highlights
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeTournament.historicHighlights.map((hh, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{hh}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => setActiveTournament(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
            >
              Close Archive
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
