import React, { useState } from 'react';
import {
  X,
  Radio,
  Share2,
  Download,
  CheckCircle,
  MessageSquare,
  FileText,
  Activity,
  Flame,
  Award,
  Send,
  Smile,
  Clock,
  MapPin,
  TrendingUp,
  Play
} from 'lucide-react';
import { Match, BallCommentary } from '../types/cricket';
import { useCricket } from '../context/CricketContext';
import { TEAMS } from '../data/mockCricketData';

interface MatchDetailModalProps {
  match: Match;
  onClose: () => void;
  onOpenShare: (match: Match) => void;
}

export const MatchDetailModal: React.FC<MatchDetailModalProps> = ({ match, onClose, onOpenShare }) => {
  const {
    cacheMatchForOffline,
    offlineCachedMatchIds,
    stepManualBall,
    liveChatMessages,
    sendChatMessage,
    reactToChatMessage,
    currentUser,
    userPredictions,
    submitPrediction
  } = useCricket();

  const [activeTab, setActiveTab] = useState<'commentary' | 'scorecard' | 'chat' | 'prediction'>('commentary');
  const [chatInput, setChatInput] = useState('');
  const [predictedWinner, setPredictedWinner] = useState(match.team1.id);
  const [predictedBatsman, setPredictedBatsman] = useState(
    match.innings2?.batting[0]?.name || match.innings1.batting[0]?.name || 'Virat Kohli'
  );

  const isCached = offlineCachedMatchIds.includes(match.id);
  const chatList = liveChatMessages[match.id] || [];
  const currentPrediction = userPredictions[match.id];

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendChatMessage(match.id, chatInput);
    setChatInput('');
  };

  const handlePredictionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitPrediction(match.id, predictedWinner, predictedBatsman);
  };

  const innings1 = match.innings1;
  const innings2 = match.innings2;
  const currentInnings = match.currentInnings === 2 && innings2 ? innings2 : innings1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3">
            <span className="text-xl">{match.team1.flagEmoji}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-white">
                  {match.team1.name} vs {match.team2.name}
                </h3>
                {match.status === 'LIVE' && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    LIVE
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                {match.league} · {match.matchNumber} · {match.venue}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Cache offline */}
            <button
              onClick={() => cacheMatchForOffline(match.id)}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                isCached
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                  : 'border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white'
              }`}
              title="Save for offline viewing"
            >
              {isCached ? <CheckCircle className="w-4 h-4" /> : <Download className="w-4 h-4" />}
              <span className="hidden sm:inline">{isCached ? 'Saved' : 'Save Offline'}</span>
            </button>

            {/* Share highlight */}
            <button
              onClick={() => onOpenShare(match)}
              className="p-2 rounded-lg border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Share Highlight Card"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Close modal */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Scoreboard Hero Panel */}
        <div className="p-4 sm:p-6 bg-gradient-to-b from-slate-950 to-slate-900 border-b border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Innings 1 Score */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{match.team1.flagEmoji}</span>
                <div>
                  <h4 className="font-bold text-sm text-slate-200">{match.team1.name}</h4>
                  <span className="text-[11px] text-slate-400">1st Innings</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono text-xl sm:text-2xl font-black text-white">
                  {innings1.runs}/{innings1.wickets}
                </span>
                <span className="block font-mono text-xs text-slate-400">
                  {innings1.overs} overs (RR: {innings1.runRate})
                </span>
              </div>
            </div>

            {/* Innings 2 Score */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{match.team2.flagEmoji}</span>
                <div>
                  <h4 className="font-bold text-sm text-slate-200">{match.team2.name}</h4>
                  <span className="text-[11px] text-slate-400">
                    {innings2 ? (innings2.target ? `Target: ${innings2.target}` : '2nd Innings') : 'Yet to bat'}
                  </span>
                </div>
              </div>
              <div className="text-right">
                {innings2 ? (
                  <>
                    <span className="font-mono text-xl sm:text-2xl font-black text-emerald-400">
                      {innings2.runs}/{innings2.wickets}
                    </span>
                    <span className="block font-mono text-xs text-slate-400">
                      {innings2.overs} overs (RR: {innings2.runRate})
                    </span>
                  </>
                ) : (
                  <span className="text-xs text-slate-500 font-mono">Yet to Bat</span>
                )}
              </div>
            </div>
          </div>

          {/* Status Kicker & Simulation Button */}
          <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
              <p className="text-sm font-semibold text-emerald-400">{match.statusText}</p>
            </div>

            {match.status === 'LIVE' && (
              <button
                onClick={() => stepManualBall(match.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-colors"
                title="Deliver the next simulated ball immediately"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Simulate Next Ball</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-800 px-4 bg-slate-900/60 overflow-x-auto">
          <button
            onClick={() => setActiveTab('commentary')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'commentary'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Ball-by-Ball & Worm</span>
          </button>

          <button
            onClick={() => setActiveTab('scorecard')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'scorecard'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Full Scorecard</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'chat'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Match Day Chat ({chatList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('prediction')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'prediction'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Fan Prediction {currentPrediction && '✓'}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: Ball-by-Ball Commentary */}
          {activeTab === 'commentary' && (
            <div className="space-y-6">
              {/* Worm / Key Overs Bar Visual */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Recent Over Progression
                  </span>
                  <span className="text-[11px] text-slate-500">Live Delivery Tracker</span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto py-2">
                  {match.commentary.slice(0, 10).map((c, idx) => (
                    <div
                      key={c.id || idx}
                      className={`flex flex-col items-center justify-center min-w-10 h-12 rounded-lg border text-center transition-all ${
                        c.isWicket
                          ? 'bg-red-500/20 border-red-500/50 text-red-300 font-bold'
                          : c.boundaryType === 'six'
                          ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 font-extrabold'
                          : c.boundaryType === 'four'
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold'
                          : c.runs === 0
                          ? 'bg-slate-900 border-slate-800 text-slate-400'
                          : 'bg-slate-800 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="font-mono text-sm">
                        {c.isWicket ? 'W' : c.runs}
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono">
                        {c.over}.{c.ball}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commentary Feed */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Live Commentary Stream
                </h4>
                {match.commentary.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">
                    Match has not commenced yet. Commentary will start on first ball.
                  </p>
                ) : (
                  match.commentary.map((ball) => (
                    <div
                      key={ball.id}
                      className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                            Over {ball.over}.{ball.ball}
                          </span>
                          <span className="text-xs font-semibold text-slate-200">
                            {ball.bowlerName} to {ball.batsmanName}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {ball.isWicket && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-red-600 text-white uppercase">
                              Wicket
                            </span>
                          )}
                          {ball.boundaryType === 'six' && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-purple-600 text-white uppercase">
                              6 Runs!
                            </span>
                          )}
                          {ball.boundaryType === 'four' && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-600 text-white uppercase">
                              4 Runs!
                            </span>
                          )}
                          <span className="text-[10px] text-slate-500 font-mono">{ball.timestamp}</span>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-1">
                        {ball.commentaryText}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Full Scorecard */}
          {activeTab === 'scorecard' && (
            <div className="space-y-8">
              {/* Innings 1 Scorecard */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{match.team1.flagEmoji}</span>
                    <h4 className="font-bold text-sm text-white">
                      {innings1.teamName} Innings ({innings1.runs}/{innings1.wickets} in {innings1.overs} ov)
                    </h4>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    Extras: {innings1.extras.total} (w {innings1.extras.wides}, nb {innings1.extras.noBalls}, b {innings1.extras.byes}, lb {innings1.extras.legByes})
                  </span>
                </div>

                {/* Batting Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-medium">
                        <th className="py-2 pr-4">Batter</th>
                        <th className="py-2 pr-4">Dismissal</th>
                        <th className="py-2 px-2 text-right font-mono">R</th>
                        <th className="py-2 px-2 text-right font-mono">B</th>
                        <th className="py-2 px-2 text-right font-mono">4s</th>
                        <th className="py-2 px-2 text-right font-mono">6s</th>
                        <th className="py-2 pl-2 text-right font-mono">SR</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {innings1.batting.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-800/30">
                          <td className="py-2.5 pr-4 font-semibold text-slate-200">
                            {b.name} {!b.isOut && <span className="text-emerald-400">*</span>}
                          </td>
                          <td className="py-2.5 pr-4 text-slate-400 text-[11px]">
                            {b.dismissalInfo || 'not out'}
                          </td>
                          <td className="py-2.5 px-2 text-right font-mono font-bold text-white">{b.runs}</td>
                          <td className="py-2.5 px-2 text-right font-mono text-slate-400">{b.balls}</td>
                          <td className="py-2.5 px-2 text-right font-mono text-slate-300">{b.fours}</td>
                          <td className="py-2.5 px-2 text-right font-mono text-slate-300">{b.sixes}</td>
                          <td className="py-2.5 pl-2 text-right font-mono text-slate-400">{b.strikeRate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Bowling Table */}
                <div className="overflow-x-auto pt-3">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-medium">
                        <th className="py-2 pr-4">Bowler</th>
                        <th className="py-2 px-2 text-right font-mono">O</th>
                        <th className="py-2 px-2 text-right font-mono">M</th>
                        <th className="py-2 px-2 text-right font-mono">R</th>
                        <th className="py-2 px-2 text-right font-mono">W</th>
                        <th className="py-2 pl-2 text-right font-mono">ECON</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {innings1.bowling.map((bw) => (
                        <tr key={bw.id} className="hover:bg-slate-800/30">
                          <td className="py-2.5 pr-4 font-semibold text-slate-200">{bw.name}</td>
                          <td className="py-2.5 px-2 text-right font-mono text-slate-300">{bw.overs}</td>
                          <td className="py-2.5 px-2 text-right font-mono text-slate-400">{bw.maidens}</td>
                          <td className="py-2.5 px-2 text-right font-mono text-slate-300">{bw.runs}</td>
                          <td className="py-2.5 px-2 text-right font-mono font-bold text-cyan-400">{bw.wickets}</td>
                          <td className="py-2.5 pl-2 text-right font-mono text-slate-400">{bw.economy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Innings 2 Scorecard (if started) */}
              {innings2 && (
                <div className="space-y-3 pt-6 border-t border-slate-800">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{match.team2.flagEmoji}</span>
                      <h4 className="font-bold text-sm text-white">
                        {innings2.teamName} Innings ({innings2.runs}/{innings2.wickets} in {innings2.overs} ov)
                      </h4>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      Extras: {innings2.extras.total} (w {innings2.extras.wides}, nb {innings2.extras.noBalls})
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 font-medium">
                          <th className="py-2 pr-4">Batter</th>
                          <th className="py-2 pr-4">Dismissal</th>
                          <th className="py-2 px-2 text-right font-mono">R</th>
                          <th className="py-2 px-2 text-right font-mono">B</th>
                          <th className="py-2 px-2 text-right font-mono">4s</th>
                          <th className="py-2 px-2 text-right font-mono">6s</th>
                          <th className="py-2 pl-2 text-right font-mono">SR</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/50">
                        {innings2.batting.map((b) => (
                          <tr key={b.id} className="hover:bg-slate-800/30">
                            <td className="py-2.5 pr-4 font-semibold text-slate-200">
                              {b.name} {!b.isOut && <span className="text-emerald-400">*</span>}
                            </td>
                            <td className="py-2.5 pr-4 text-slate-400 text-[11px]">
                              {b.dismissalInfo || 'not out'}
                            </td>
                            <td className="py-2.5 px-2 text-right font-mono font-bold text-emerald-400">{b.runs}</td>
                            <td className="py-2.5 px-2 text-right font-mono text-slate-400">{b.balls}</td>
                            <td className="py-2.5 px-2 text-right font-mono text-slate-300">{b.fours}</td>
                            <td className="py-2.5 px-2 text-right font-mono text-slate-300">{b.sixes}</td>
                            <td className="py-2.5 pl-2 text-right font-mono text-slate-400">{b.strikeRate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Live Fan Chat Commentary */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-[400px]">
              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {chatList.map((msg) => (
                  <div key={msg.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <img
                          src={msg.userAvatar}
                          alt={msg.userName}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="font-bold text-xs text-slate-200">{msg.userName}</span>
                        {msg.userTeamFlair && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-emerald-400 font-mono">
                            {msg.userTeamFlair}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{msg.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-300 pl-7">{msg.message}</p>

                    {/* Quick Reactions */}
                    <div className="flex items-center gap-1.5 pl-7 mt-2">
                      {['🔥', '🏏', '🎯', '👏', '🏆'].map((emoji) => {
                        const count = msg.reactions[emoji] || 0;
                        return (
                          <button
                            key={emoji}
                            onClick={() => reactToChatMessage(match.id, msg.id, emoji)}
                            className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800/50 hover:bg-slate-800 text-[11px] text-slate-300 border border-slate-700/50 transition-colors"
                          >
                            <span>{emoji}</span>
                            {count > 0 && <span className="font-mono text-[10px]">{count}</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input Form */}
              <form onSubmit={handleSendChat} className="mt-3 flex items-center gap-2 pt-2 border-t border-slate-800">
                <input
                  type="text"
                  placeholder="Share live match banter or commentary..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: Fan Prediction */}
          {activeTab === 'prediction' && (
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-4">
              <div>
                <h4 className="font-bold text-sm text-white">Daily Match Prediction Challenge</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Pick the match winner and top batter to climb the global fan leaderboard and earn 100 points!
                </p>
              </div>

              {currentPrediction ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Your Prediction is Locked In!</span>
                  </div>
                  <div className="mt-2 text-xs text-slate-300 space-y-1">
                    <p>
                      Predicted Winner:{' '}
                      <strong className="text-white">
                        {TEAMS.find((t) => t.id === currentPrediction.predictedWinnerId)?.name || 'Selected Team'}
                      </strong>
                    </p>
                    <p>
                      Top Performer: <strong className="text-white">{currentPrediction.predictedTopBatsman}</strong>
                    </p>
                    <p className="text-amber-400 text-[11px] pt-1 font-mono">
                      +100 Points added to your Leaderboard standing!
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handlePredictionSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Who will win this match?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPredictedWinner(match.team1.id)}
                        className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-colors ${
                          predictedWinner === match.team1.id
                            ? 'border-emerald-500 bg-emerald-500/10 text-white'
                            : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className="text-2xl">{match.team1.flagEmoji}</span>
                        <div>
                          <p className="font-bold text-xs">{match.team1.name}</p>
                          <span className="text-[10px] text-slate-400">{match.team1.shortName}</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPredictedWinner(match.team2.id)}
                        className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-colors ${
                          predictedWinner === match.team2.id
                            ? 'border-emerald-500 bg-emerald-500/10 text-white'
                            : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className="text-2xl">{match.team2.flagEmoji}</span>
                        <div>
                          <p className="font-bold text-xs">{match.team2.name}</p>
                          <span className="text-[10px] text-slate-400">{match.team2.shortName}</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Predicted Top Run Scorer / Key Performer
                    </label>
                    <select
                      value={predictedBatsman}
                      onChange={(e) => setPredictedBatsman(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Virat Kohli">Virat Kohli (IND)</option>
                      <option value="Rohit Sharma">Rohit Sharma (IND)</option>
                      <option value="Glenn Maxwell">Glenn Maxwell (AUS)</option>
                      <option value="Steve Smith">Steve Smith (AUS)</option>
                      <option value="Travis Head">Travis Head (AUS)</option>
                      <option value="Jasprit Bumrah">Jasprit Bumrah (IND)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
                  >
                    Lock In Prediction & Earn Points
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
