import React from 'react';
import { Radio, ChevronRight, Share2, Flame } from 'lucide-react';
import { useCricket } from '../context/CricketContext';
import { Match } from '../types/cricket';

interface LiveTickerProps {
  onSelectMatch: (match: Match) => void;
  onShareMatch: (match: Match) => void;
}

export const LiveTicker: React.FC<LiveTickerProps> = ({ onSelectMatch, onShareMatch }) => {
  const { matches } = useCricket();
  const liveMatches = matches.filter(m => m.status === 'LIVE');

  if (liveMatches.length === 0) return null;

  return (
    <div className="w-full bg-slate-900/90 border-b border-slate-800/80 py-2.5 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider shrink-0">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span>Live Ticker</span>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth flex-1 py-1">
          {liveMatches.map((m) => {
            const innings = m.currentInnings === 2 && m.innings2 ? m.innings2 : m.innings1;
            return (
              <div
                key={m.id}
                onClick={() => onSelectMatch(m)}
                className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-slate-700 cursor-pointer shrink-0 transition-all hover:bg-slate-800/40 group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{m.team1.flagEmoji}</span>
                  <span className="text-xs font-bold text-slate-200">{m.team1.shortName}</span>
                  <span className="text-xs font-mono text-slate-400">vs</span>
                  <span className="text-base">{m.team2.flagEmoji}</span>
                  <span className="text-xs font-bold text-slate-200">{m.team2.shortName}</span>
                </div>

                <div className="h-4 w-px bg-slate-800" />

                <div className="flex items-baseline gap-1.5 font-mono text-xs">
                  <span className="font-bold text-emerald-400">
                    {innings.teamShort} {innings.runs}/{innings.wickets}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    ({innings.overs} ov)
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onShareMatch(m);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-white transition-opacity"
                  title="Share Scorecard"
                >
                  <Share2 className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
