import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Twitter,
  Send,
  Download,
  Flame,
  Award,
  ExternalLink
} from 'lucide-react';
import { Match } from '../types/cricket';

interface ShareHighlightModalProps {
  match: Match;
  onClose: () => void;
}

export const ShareHighlightModal: React.FC<ShareHighlightModalProps> = ({ match, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [selectedHighlightIndex, setSelectedHighlightIndex] = useState(0);

  const activeHighlight = match.highlightMoments[selectedHighlightIndex] || {
    title: `${match.team1.shortName} vs ${match.team2.shortName} Thriller`,
    over: match.innings2 ? `${match.innings2.overs} ov` : `${match.innings1.overs} ov`,
    description: match.statusText,
    type: 'turnaround'
  };

  const shareText = `🏏 What a match! ${match.team1.name} vs ${match.team2.name} at ${match.venue}!\n\n🔥 Highlight: ${activeHighlight.title} - ${activeHighlight.description}\n\n⚡ Live Status: ${match.statusText}\n\nFollow live ball-by-ball on CricPulse!`;
  const shareUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTwitter = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=Cricket,CricPulse,${match.team1.shortName}vs${match.team2.shortName}`;
    window.open(tweetUrl, '_blank');
  };

  const handleShareWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
    window.open(waUrl, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `CricPulse: ${match.team1.shortName} vs ${match.team2.shortName}`,
          text: shareText,
          url: shareUrl
        });
      } catch {
        // User cancelled or failed
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 sm:p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base text-white">Share Match Highlights</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Highlight Selector Pills */}
        {match.highlightMoments.length > 0 && (
          <div className="mt-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Select Key Moment
            </span>
            <div className="flex flex-wrap gap-2">
              {match.highlightMoments.map((moment, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedHighlightIndex(idx)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                    selectedHighlightIndex === idx
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {moment.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Visual Share Card Preview */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 border border-emerald-500/30 shadow-inner">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800/80">
            <span className="font-bold tracking-wider text-emerald-400 uppercase text-[10px]">
              CRICPULSE HIGHLIGHT REEL
            </span>
            <span>{match.league}</span>
          </div>

          <div className="py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{match.team1.flagEmoji}</span>
                <span className="font-extrabold text-sm text-white">{match.team1.shortName}</span>
                <span className="font-mono text-xs text-slate-300">
                  {match.innings1.runs}/{match.innings1.wickets}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-bold">vs</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-slate-300">
                  {match.innings2 ? `${match.innings2.runs}/${match.innings2.wickets}` : 'Yet to Bat'}
                </span>
                <span className="font-extrabold text-sm text-white">{match.team2.shortName}</span>
                <span className="text-xl">{match.team2.flagEmoji}</span>
              </div>
            </div>

            <div className="mt-3 p-3 rounded-lg bg-slate-900/90 border border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  {activeHighlight.title}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Over {activeHighlight.over}</span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {activeHighlight.description}
              </p>
            </div>

            <p className="text-[11px] text-emerald-400 font-semibold mt-2.5">
              ⚡ {match.statusText}
            </p>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="mt-5 space-y-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleShareTwitter}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/30 text-[#1DA1F2] border border-[#1DA1F2]/40 text-xs font-semibold transition-colors"
            >
              <Twitter className="w-4 h-4 fill-current" />
              <span>Share to X / Twitter</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 text-xs font-semibold transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Highlight Text & Link'}</span>
            </button>

            <button
              onClick={handleNativeShare}
              className="p-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
              title="Native Device Share"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
