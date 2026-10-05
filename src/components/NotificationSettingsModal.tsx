import React, { useState } from 'react';
import {
  Bell,
  X,
  Volume2,
  VolumeX,
  Shield,
  Star,
  Check,
  Smartphone,
  Flame,
  Send
} from 'lucide-react';
import { useCricket } from '../context/CricketContext';

interface NotificationSettingsModalProps {
  onClose: () => void;
}

export const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({ onClose }) => {
  const {
    notificationSettings,
    updateNotificationSettings,
    requestPushNotificationPermission
  } = useCricket();

  const [testSent, setTestSent] = useState(false);

  const handleTestAlert = () => {
    setTestSent(true);
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('🏏 CricPulse Test Alert: SIX!', {
        body: 'Virat Kohli hits a towering 94m six over long-on! Notifications working smoothly.',
        icon: '/favicon.ico'
      });
    }
    setTimeout(() => setTestSent(false), 2500);
  };

  const handleEnablePush = async () => {
    await requestPushNotificationPermission();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-400" />
            <h3 className="font-extrabold text-base text-white">Notification Preferences</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4">
          {/* Browser Push Permission Banner */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Smartphone className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <p className="font-bold text-xs text-white">Browser Push Notifications</p>
                <p className="text-[11px] text-slate-400">Receive alerts even when tab is backgrounded</p>
              </div>
            </div>

            <button
              onClick={handleEnablePush}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                notificationSettings.pushEnabled
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
              }`}
            >
              {notificationSettings.pushEnabled ? 'Enabled ✓' : 'Enable'}
            </button>
          </div>

          {/* Granular Toggles */}
          <div className="space-y-2.5 text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Match Event Alerts
            </span>

            {/* Wickets */}
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/40 border border-slate-800 cursor-pointer hover:bg-slate-800/40 transition-colors">
              <span className="text-slate-200 font-medium">Wickets & Breakthroughs</span>
              <input
                type="checkbox"
                checked={notificationSettings.wickets}
                onChange={(e) => updateNotificationSettings({ wickets: e.target.checked })}
                className="w-4 h-4 accent-emerald-500 rounded"
              />
            </label>

            {/* Sixes */}
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/40 border border-slate-800 cursor-pointer hover:bg-slate-800/40 transition-colors">
              <span className="text-slate-200 font-medium">Sixes (Maximums)</span>
              <input
                type="checkbox"
                checked={notificationSettings.sixes}
                onChange={(e) => updateNotificationSettings({ sixes: e.target.checked })}
                className="w-4 h-4 accent-emerald-500 rounded"
              />
            </label>

            {/* Fours */}
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/40 border border-slate-800 cursor-pointer hover:bg-slate-800/40 transition-colors">
              <span className="text-slate-200 font-medium">Fours & Boundaries</span>
              <input
                type="checkbox"
                checked={notificationSettings.fours}
                onChange={(e) => updateNotificationSettings({ fours: e.target.checked })}
                className="w-4 h-4 accent-emerald-500 rounded"
              />
            </label>

            {/* Milestones */}
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/40 border border-slate-800 cursor-pointer hover:bg-slate-800/40 transition-colors">
              <span className="text-slate-200 font-medium">Batting Milestones (50s & 100s)</span>
              <input
                type="checkbox"
                checked={notificationSettings.milestones}
                onChange={(e) => updateNotificationSettings({ milestones: e.target.checked })}
                className="w-4 h-4 accent-emerald-500 rounded"
              />
            </label>

            {/* Close Finishes */}
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/40 border border-slate-800 cursor-pointer hover:bg-slate-800/40 transition-colors">
              <span className="text-slate-200 font-medium">Death Over Thrillers (&lt;30 runs needed)</span>
              <input
                type="checkbox"
                checked={notificationSettings.closeFinishes}
                onChange={(e) => updateNotificationSettings({ closeFinishes: e.target.checked })}
                className="w-4 h-4 accent-emerald-500 rounded"
              />
            </label>

            {/* Sound effect toggle */}
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/40 border border-slate-800 cursor-pointer hover:bg-slate-800/40 transition-colors">
              <span className="text-slate-200 font-medium flex items-center gap-1.5">
                {notificationSettings.soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
                Stadium Audio Cue (Boundary & Wicket Chime)
              </span>
              <input
                type="checkbox"
                checked={notificationSettings.soundEnabled}
                onChange={(e) => updateNotificationSettings({ soundEnabled: e.target.checked })}
                className="w-4 h-4 accent-emerald-500 rounded"
              />
            </label>
          </div>

          {/* Test notification button */}
          <button
            onClick={handleTestAlert}
            className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{testSent ? 'Sent Test Push Alert!' : 'Send Test Notification'}</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
        >
          Save & Apply Preferences
        </button>
      </div>
    </div>
  );
};
