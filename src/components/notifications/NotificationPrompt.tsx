import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, X } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';

const PROMPT_DELAY = 5000; // 5 seconds after page load
const DISMISS_KEY = 'notification-prompt-dismissed';
const DISMISS_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days

export const NotificationPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const { permission, isSupported, hasAskedPermission, requestPermission } = useNotifications();

  useEffect(() => {
    if (!isSupported || permission === 'granted' || permission === 'denied') {
      return;
    }

    // Check if dismissed recently
    const dismissedAt = localStorage.getItem(DISMISS_KEY);
    if (dismissedAt && Date.now() - parseInt(dismissedAt) < DISMISS_DURATION) {
      return;
    }

    // Don't show if we've already asked
    if (hasAskedPermission) {
      return;
    }

    const timer = setTimeout(() => setShowPrompt(true), PROMPT_DELAY);
    return () => clearTimeout(timer);
  }, [isSupported, permission, hasAskedPermission]);

  const handleEnable = async () => {
    await requestPermission();
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96 animate-in slide-in-from-top duration-300">
      <div className="bg-card border rounded-xl shadow-lg p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 bg-primary/10 rounded-lg p-2">
            <Bell className="h-5 w-5 text-primary" />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">Herinneringen inschakelen?</p>
            <p className="text-xs text-muted-foreground mt-1">
              Ontvang meldingen voor aankomende betalingen en wanneer schulden bijna afbetaald zijn.
            </p>
            
            <div className="flex gap-2 mt-3">
              <Button size="sm" onClick={handleEnable}>
                Inschakelen
              </Button>
              <Button size="sm" variant="ghost" onClick={handleDismiss}>
                Niet nu
              </Button>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 hover:bg-muted rounded-full transition-colors"
            aria-label="Sluiten"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};
