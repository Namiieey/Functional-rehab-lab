import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      id="offline-notification-banner"
      className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-6 sm:right-auto z-40 max-w-sm flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-900/90 text-amber-50 backdrop-blur-md shadow-lg border border-amber-700/50 text-xs font-medium animate-in slide-in-from-bottom-3 duration-200"
    >
      <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping shrink-0" />
      <WifiOff className="w-4 h-4 text-amber-300 shrink-0" />
      <p className="leading-tight">
        <strong className="font-semibold">Offline Mode:</strong> Viewing cached clinic information. WhatsApp & calling require active connectivity.
      </p>
    </div>
  );
};
