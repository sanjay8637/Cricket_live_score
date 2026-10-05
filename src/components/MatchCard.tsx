import React from 'react';
import {
  Radio,
  Flame,
  Clock,
  MapPin,
  Share2,
  Bookmark,
  BookmarkCheck,
  Download,
  CheckCircle,
  Play,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { Match } from '../types/cricket';
import { useCricket } from '../context/CricketContext';

interface MatchCardProps {
  match: Match;
  onOpenDetail: (match: Match) => void;
  onOpenShare: (match: Match) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onOpenDetail, onOpenShare }) => {
  const {
    currentUser,
    toggleFavoriteTeam,
    offlineCachedMatchIds,
    cacheMatchForOffline,
    stepManualBall,
    userPredictions
  } = useCricket();

  const isFavorite = currentUser?.favoriteTeams?.includes(match.team1.id) ||
                     currentUser?.favoriteTeams?.includes(match.team2.id);

  const isCached = offlineCachedMatchIds.includes(match.id);
  const userPrediction = userPredictions[match.id];

  const innings1 = match.innings1;
  const innings2 = match.innings2;
  const currentInnings = match.currentInnings === 2 && innings2 ? innings2 : innings1;

  // Active batter & bowler for live display
  const activeStriker = currentInnings.batting.find(b => b.isStriker) || currentInnings.batting[0];
  const activeBowler = currentInnings.bowling.find(b => b.isCurrent) || currentInnings.bowling[0];

  return (
    <div
      onClick={() => onOpenDetail(match)}
      className="group relative rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 hover:border-slate-700/80 transition-all duration-200 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-emerald-950/20 cursor-pointer flex flex-col justify-between"
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between p-4 pb-3 border-b border-slate-800/60 bg-slate-950/40">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-300">
              {match.league}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-[11px] text-slate-400 font-medium">
              {match.matchNumber} ({match.format})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {match.status === 'LIVE' && (
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold tracking-wider uppercase animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                LIVE
              </span>
            )}
            {match.status === 'UPCOMING' && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold tracking-wider uppercase">
                <Clock className="w-2.5 h-2.5" />
                UPCOMING
              </span>
            )}
            {match.status === 'FINISHED' && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-bold tracking-wider uppercase">
                FINAL
              </span>
            )}

            {/* Offline cache button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                cacheMatchForOffline(match.id);
              }}
              title={isCached ? 'Downloaded for offline access' : 'Download for offline access'}
              className={`p-1.5 rounded-lg border transition-colors ${
                isCached
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                  : 'border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              {isCached ? <CheckCircle className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
            </button>

            {/* Share Highlight */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenShare(match);
              }}
              className="p-1.5 rounded-lg border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Share Highlight Card"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Teams and Scores Section */}
        <div className="p-4 space-y-3.5">
          {/* Team 1 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl drop-shadow-sm">{match.team1.flagEmoji}</span>
              <div>
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                  {match.team1.name}
                  {currentUser?.favoriteTeams?.includes(match.team1.id) && (
                    <span className="text-[10px] text-amber-400" title="Favorite Team">★</span>
                  )}
                </h4>
                <p className="text-[11px] text-slate-400">{match.team1.shortName}</p>
              </div>
            </div>

            <div className="text-right">
              {match.status === 'UPCOMING' ? (
                <span className="text-xs text-slate-500 font-mono">Yet to bat</span>
              ) : (
                <div className="flex flex-col items-end">
                  <span className="font-mono text-base font-extrabold text-white">
                    {innings1.runs}/{innings1.wickets}
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">
                    ({innings1.overs} ov)
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Team 2 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl drop-shadow-sm">{match.team2.flagEmoji}</span>
              <div>
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                  {match.team2.name}
                  {currentUser?.favoriteTeams?.includes(match.team2.id) && (
                    <span className="text-[10px] text-amber-400" title="Favorite Team">★</span>
                  )}
                </h4>
                <p className="text-[11px] text-slate-400">{match.team2.shortName}</p>
              </div>
            </div>

            <div className="text-right">
              {match.status === 'UPCOMING' ? (
                <span className="text-xs text-slate-500 font-mono">Yet to bat</span>
              ) : innings2 ? (
                <div className="flex flex-col items-end">
                  <span className="font-mono text-base font-extrabold text-emerald-400">
                    {innings2.runs}/{innings2.wickets}
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">
                    ({innings2.overs} ov)
                  </span>
                </div>
              ) : (
                <span className="text-xs text-slate-500 font-mono">Yet to bat</span>
              )}
            </div>
          </div>

          {/* Match Status / Context Kicker */}
          <div className="pt-2 border-t border-slate-800/60">
            <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 shrink-0" />
              <span>{match.statusText}</span>
            </p>

            {match.status === 'LIVE' && match.requiredRunRate && (
              <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400 font-mono">
                <span>Current RR: <strong className="text-slate-200">{currentInnings.runRate}</strong></span>
                <span>Req RR: <strong className="text-amber-400">{match.requiredRunRate}</strong></span>
              </div>
            )}
          </div>

          {/* Active Striker & Bowler Snapshot (for LIVE matches) */}
          {match.status === 'LIVE' && activeStriker && (
            <div className="bg-slate-950/60 rounded-xl p-2.5 border border-slate-800/60 flex items-center justify-between text-xs">
              <div className="truncate pr-2">
                <span className="text-slate-400 text-[10px] uppercase block tracking-wider">At the Crease</span>
                <span className="font-semibold text-white truncate block">
                  {activeStriker.name} <strong className="text-emerald-400 font-mono">{activeStriker.runs}*</strong> ({activeStriker.balls})
                </span>
              </div>
              {activeBowler && (
                <div className="text-right pl-2 border-l border-slate-800/80 shrink-0">
                  <span className="text-slate-400 text-[10px] uppercase block tracking-wider">Bowler</span>
                  <span className="font-semibold text-slate-200">
                    {activeBowler.name.split(' ').pop()} <strong className="font-mono text-cyan-400">{activeBowler.wickets}/{activeBowler.runs}</strong>
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Venue & Location */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span className="flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
              <span className="truncate">{match.venue}, {match.city}</span>
            </span>

            {userPrediction && (
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 whitespace-nowrap">
                Prediction Made ✓
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer Action Bar */}
      <div className="p-3 bg-slate-950/60 border-t border-slate-800/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Quick simulation step button */}
          {match.status === 'LIVE' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                stepManualBall(match.id);
              }}
              className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/50 px-2.5 py-1 rounded-md transition-colors flex items-center gap-1"
              title="Simulate next ball"
            >
              <Play className="w-2.5 h-2.5 fill-current" />
              <span>Next Ball</span>
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenShare(match);
            }}
            className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800/50 transition-colors"
          >
            <Share2 className="w-3 h-3" />
            <span>Share</span>
          </button>
        </div>

        <button
          onClick={() => onOpenDetail(match)}
          className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
        >
          <span>Live Match Center</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
