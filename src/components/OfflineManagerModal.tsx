import React from 'react';
import {
  WifiOff,
  Wifi,
  Download,
  Trash2,
  CheckCircle,
  X,
  FileText,
  Calendar,
  HardDrive
} from 'lucide-react';
import { useCricket } from '../context/CricketContext';
import { Match } from '../types/cricket';

interface OfflineManagerModalProps {
  onClose: () => void;
  onOpenMatch: (match: Match) => void;
}

export const OfflineManagerModal: React.FC<OfflineManagerModalProps> = ({ onClose, onOpenMatch }) => {
  const {
    isOfflineMode,
    toggleOfflineMode,
    offlineCachedMatchIds,
    removeCachedMatch,
    matches
  } = useCricket();

  const cachedMatches = matches.filter(m => offlineCachedMatchIds.includes(m.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <WifiOff className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-base text-white">Offline Match Center</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4">
          {/* Offline Simulation Toggle */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {isOfflineMode ? (
                <WifiOff className="w-5 h-5 text-amber-400" />
              ) : (
                <Wifi className="w-5 h-5 text-emerald-400" />
              )}
              <div>
                <p className="font-bold text-xs text-white">Offline Test Mode</p>
                <p className="text-[11px] text-slate-400">
                  {isOfflineMode ? 'Browsing cached matches offline' : 'Connected to live stream'}
                </p>
              </div>
            </div>

            <button
              onClick={toggleOfflineMode}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                isOfflineMode
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {isOfflineMode ? 'Turn Online' : 'Go Offline'}
            </button>
          </div>

          {/* Storage Stat */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-slate-500" />
              <span>{cachedMatches.length} Matches & Schedules Cached</span>
            </span>
            <span className="font-mono text-[11px] text-emerald-400">Local Cache OK</span>
          </div>

          {/* Cached Matches List */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {cachedMatches.length === 0 ? (
              <p className="text-center py-6 text-xs text-slate-500">
                No scorecards cached yet. Tap the download icon on any match card to save it.
              </p>
            ) : (
              cachedMatches.map((m) => (
                <div
                  key={m.id}
                  className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors"
                >
                  <div
                    onClick={() => {
                      onOpenMatch(m);
                      onClose();
                    }}
                    className="cursor-pointer flex-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{m.team1.flagEmoji}</span>
                      <span className="text-xs font-bold text-white">
                        {m.team1.shortName} vs {m.team2.shortName}
                      </span>
                      <span className="text-base">{m.team2.flagEmoji}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                      {m.league} · {m.statusText}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 ml-2">
                    <button
                      onClick={() => {
                        onOpenMatch(m);
                        onClose();
                      }}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                    >
                      View
                    </button>
                    <button
                      onClick={() => removeCachedMatch(m.id)}
                      className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                      title="Delete from cache"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
        >
          Close Offline Manager
        </button>
      </div>
    </div>
  );
};
