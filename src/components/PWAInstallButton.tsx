import React, { useState } from 'react';
import { Download, Share2, PlusSquare, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'navbar' | 'hero' | 'banner';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'navbar' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed and running standalone, hide the prompt
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    if (variant === 'hero') {
      return (
        <button
          onClick={install}
          id="hero-install-app-btn"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-brand-primary font-semibold text-sm border border-brand-primary/20 shadow-xs hover:bg-[#f0fdfa] transition active:scale-[0.98]"
        >
          <Download className="w-4 h-4 text-brand-primary" />
          <span>Install Web App</span>
        </button>
      );
    }

    return (
      <button
        onClick={install}
        id="navbar-install-app-btn"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-primary/10 text-brand-primary font-medium text-xs hover:bg-brand-primary/15 transition active:scale-[0.98]"
        title="Install Functional Rehab Lab for fast mobile access"
      >
        <Download className="w-3.5 h-3.5 text-brand-primary" />
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari flow (provide native instructions)
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          id="ios-install-guide-btn"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-primary/10 text-brand-primary font-medium text-xs hover:bg-brand-primary/15 transition"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Add to Home</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-gray-100">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center font-bold text-xs">
                    FRL
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Install on iPhone / iPad</h3>
                    <p className="text-xs text-gray-500">Quick home-screen access</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                  aria-label="Close guide"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3.5 text-sm text-gray-600">
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-gray-50">
                  <div className="w-6 h-6 rounded-full bg-brand-primary/10 text-brand-primary font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <p className="text-xs leading-relaxed">
                    Tap the <strong className="text-gray-900 font-semibold">Share</strong> button in Safari's bottom toolbar (<Share2 className="w-3.5 h-3.5 inline mx-0.5 text-brand-primary" />).
                  </p>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-gray-50">
                  <div className="w-6 h-6 rounded-full bg-brand-primary/10 text-brand-primary font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <p className="text-xs leading-relaxed">
                    Scroll down and tap <strong className="text-gray-900 font-semibold">Add to Home Screen</strong> (<PlusSquare className="w-3.5 h-3.5 inline mx-0.5 text-brand-primary" />).
                  </p>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-gray-50">
                  <div className="w-6 h-6 rounded-full bg-brand-primary/10 text-brand-primary font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <p className="text-xs leading-relaxed">
                    Tap <strong className="text-gray-900 font-semibold">Add</strong> in the top right to launch Functional Rehab Lab like a native app.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full py-2.5 rounded-xl bg-brand-primary text-white font-medium text-sm hover:bg-brand-hover transition active:scale-[0.99]"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
