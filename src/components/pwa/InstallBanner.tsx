import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Download, Smartphone, Share, Plus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link, useLocation } from 'react-router-dom';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'pwa-install-banner-dismissed';
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export const InstallBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  // Don't show banner on install page
  const isInstallPage = location.pathname === '/install';

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check if dismissed recently
    const dismissedAt = localStorage.getItem(DISMISS_KEY);
    if (dismissedAt && Date.now() - parseInt(dismissedAt) < DISMISS_DURATION) {
      return;
    }

    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    // Check if Safari on iOS
    const isSafariBrowser = isIOSDevice && /Safari/.test(navigator.userAgent) && !/CriOS|FxiOS|OPiOS|EdgiOS/.test(navigator.userAgent);
    setIsSafari(isSafariBrowser);

    // Show banner for iOS after delay
    if (isIOSDevice) {
      const timer = setTimeout(() => setShowBanner(true), 3000);
      return () => clearTimeout(timer);
    }

    // Listen for the beforeinstallprompt event (Android/Desktop)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShowBanner(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowBanner(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    }
    setShowBanner(false);
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
    setShowBanner(false);
  };

  // Don't show if not mobile, already installed, banner dismissed, or on install page
  if (!isMobile || isInstalled || !showBanner || isInstallPage) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-safe animate-in slide-in-from-bottom duration-300">
      <div className="bg-card border border-border rounded-2xl shadow-xl p-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
            <Smartphone className="h-6 w-6 text-primary-foreground" />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground">Installeer FinOverzicht</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isIOS 
                ? isSafari 
                  ? <>Tik op <Share className="h-3.5 w-3.5 inline mx-0.5" /> en dan "Zet op beginscherm"</>
                  : "Open in Safari om te installeren"
                : "Voeg toe aan je startscherm"
              }
            </p>
          </div>

          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1.5 -mt-1 -mr-1 hover:bg-muted rounded-full transition-colors"
            aria-label="Sluiten"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="flex gap-2 mt-4">
          {isIOS ? (
            <>
              <Link to="/install" onClick={() => setShowBanner(false)} className="flex-1">
                <Button className="w-full" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Hoe installeer ik?
                </Button>
              </Link>
            </>
          ) : deferredPrompt ? (
            <Button onClick={handleInstallClick} className="flex-1" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Installeren
            </Button>
          ) : (
            <Link to="/install" onClick={() => setShowBanner(false)} className="flex-1">
              <Button className="w-full" size="sm">
                Bekijk instructies
              </Button>
            </Link>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDismiss}
            className="px-4"
          >
            Later
          </Button>
        </div>
      </div>
    </div>
  );
};
