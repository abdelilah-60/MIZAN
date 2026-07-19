import React, { useState, useEffect } from 'react';

const OfflineBanner: React.FC = () => {
  const [isOffline, setIsOffline] = useState(!window.navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="sticky top-[73px] z-[999] bg-orange-500/90 backdrop-blur-sm border-b border-orange-400/50 py-2.5 px-6 animate-in slide-in-from-top duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
        <span className="text-lg">📡</span>
        <p className="text-sm font-semibold text-white tracking-wide">
          You are currently offline. Changes will be saved locally and synced when internet connection is restored.
        </p>
      </div>
    </div>
  );
};

export default OfflineBanner;
