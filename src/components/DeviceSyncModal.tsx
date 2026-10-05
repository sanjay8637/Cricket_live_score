import React, { useState } from 'react';
import {
  Smartphone,
  Copy,
  Check,
  Download,
  Upload,
  X,
  ShieldCheck,
  RefreshCw,
  QrCode
} from 'lucide-react';
import { useCricket } from '../context/CricketContext';

interface DeviceSyncModalProps {
  onClose: () => void;
}

export const DeviceSyncModal: React.FC<DeviceSyncModalProps> = ({ onClose }) => {
  const { exportSyncData, importSyncData, currentUser } = useCricket();
  const [syncCode, setSyncCode] = useState(() => exportSyncData());
  const [importCode, setImportCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [syncError, setSyncError] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(syncCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImport = () => {
    setSyncError(false);
    const success = importSyncData(importCode);
    if (success) {
      setSyncSuccess(true);
      setTimeout(() => {
        setSyncSuccess(false);
        onClose();
      }, 1500);
    } else {
      setSyncError(true);
    }
  };

  const handleRegenerate = () => {
    setSyncCode(exportSyncData());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-cyan-400" />
            <h3 className="font-extrabold text-base text-white">Multi-Device Sync</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4">
          <p className="text-xs text-slate-400 leading-relaxed">
            Sync your favorite teams, custom alerts, leaderboard points, and offline scorecards seamlessly across your phone, tablet, and desktop without passwords.
          </p>

          {/* Export Current Device Token */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">Your Device Sync Token</span>
              <button
                onClick={handleRegenerate}
                className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
                title="Refresh token"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Refresh</span>
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                readOnly
                value={syncCode}
                className="w-full px-3 py-2 text-xs font-mono bg-slate-900 border border-slate-800 rounded-lg text-slate-300 pr-10 focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                title="Copy token"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <p className="text-[10px] text-slate-500">
              Copy this token and paste on your other device below to restore all account data instantly.
            </p>
          </div>

          {/* Import Code From Another Device */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-200 block">
              Restore From Another Device
            </span>

            <textarea
              rows={3}
              placeholder="Paste sync token here..."
              value={importCode}
              onChange={(e) => setImportCode(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
            />

            {syncError && (
              <p className="text-[11px] text-red-400 font-semibold">
                Invalid sync token format. Please re-check the token string.
              </p>
            )}

            {syncSuccess && (
              <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>Successfully synced across devices! Reloading profile...</span>
              </p>
            )}

            <button
              onClick={handleImport}
              disabled={!importCode.trim()}
              className="w-full py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import & Sync Data</span>
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};
