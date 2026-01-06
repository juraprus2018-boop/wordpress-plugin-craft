import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Smartphone, Check, Share, Plus, MoreVertical, Chrome, ArrowLeft, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Check platform
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isAndroidDevice = /Android/.test(navigator.userAgent);
    const isSafariBrowser = isIOSDevice && /Safari/.test(navigator.userAgent) && !/CriOS|FxiOS|OPiOS|EdgiOS/.test(navigator.userAgent);
    
    setIsIOS(isIOSDevice);
    setIsAndroid(isAndroidDevice);
    setIsSafari(isSafariBrowser);

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const handleOpenApp = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  if (isInstalled) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center border-0 shadow-xl">
          <CardHeader className="pb-4">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-success/10">
              <Check className="h-10 w-10 text-success" />
            </div>
            <CardTitle className="text-2xl">App Geïnstalleerd! 🎉</CardTitle>
            <CardDescription className="text-base">
              FinOverzicht staat nu op je startscherm.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleOpenApp} className="w-full" size="lg">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open de App
            </Button>
            <p className="text-sm text-muted-foreground">
              Je wordt automatisch ingelogd gehouden in de app.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to={user ? "/dashboard" : "/"}>
            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="font-semibold">App Installeren</h1>
            <p className="text-sm text-muted-foreground">Zet FinOverzicht op je startscherm</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-lg">
        {/* App Preview Card */}
        <Card className="mb-8 overflow-hidden border-0 shadow-xl">
          <div className="bg-gradient-to-br from-primary to-primary/80 p-8 text-center text-primary-foreground">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Smartphone className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold mb-2">FinOverzicht</h2>
            <p className="text-primary-foreground/80">Jouw financiën, altijd bij de hand</p>
          </div>
          
          {deferredPrompt && (
            <CardContent className="p-4">
              <Button onClick={handleInstallClick} className="w-full" size="lg">
                <Download className="h-5 w-5 mr-2" />
                Nu Installeren
              </Button>
            </CardContent>
          )}
        </Card>

        {/* Installation Instructions */}
        <div className="space-y-6">
          {isIOS && (
            <Card className="border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-700 to-black flex items-center justify-center">
                    <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  </div>
                  iPhone & iPad
                </CardTitle>
                <CardDescription>
                  {isSafari 
                    ? "Volg deze stappen om te installeren"
                    : "Open eerst Safari om te kunnen installeren"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isSafari && (
                  <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 text-sm">
                    <p className="font-medium text-warning">⚠️ Safari vereist</p>
                    <p className="text-muted-foreground mt-1">
                      PWA installatie werkt alleen vanuit Safari. Kopieer de URL en open deze in Safari.
                    </p>
                  </div>
                )}
                
                <div className="space-y-3">
                  <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Tik op het Deel-icoon</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                        Onderaan het scherm: <Share className="h-4 w-4" />
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Scroll en tik op "Zet op beginscherm"</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Plus className="h-4 w-4" /> Zet op beginscherm
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Tik op "Voeg toe"</p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Rechtsboven in het scherm
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {isAndroid && !deferredPrompt && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <Chrome className="h-5 w-5 text-white" />
                  </div>
                  Android (Chrome)
                </CardTitle>
                <CardDescription>
                  Volg deze stappen in Chrome
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Tik op het menu-icoon</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                        Drie puntjes rechtsboven: <MoreVertical className="h-4 w-4" />
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Tik op "App installeren"</p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Of "Toevoegen aan startscherm"
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Bevestig de installatie</p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Tik op "Installeren"
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!isIOS && !isAndroid && !deferredPrompt && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Chrome className="h-5 w-5 text-white" />
                  </div>
                  Desktop Browser
                </CardTitle>
                <CardDescription>
                  Installeer via Chrome, Edge of een andere browser
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Kijk naar de adresbalk</p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Rechts zie je een installatie-icoon
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Klik op "Installeren"</p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Of via menu → "App installeren"
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Benefits */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Voordelen van de app</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  { icon: "🚀", title: "Snelle toegang", desc: "Direct openen vanaf je startscherm" },
                  { icon: "📱", title: "Volledig scherm", desc: "Geen browser-interface, meer ruimte" },
                  { icon: "🔔", title: "Notificaties", desc: "Ontvang herinneringen voor betalingen" },
                  { icon: "🔒", title: "Blijf ingelogd", desc: "Automatisch ingelogd in de app" },
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-xl">{benefit.icon}</span>
                    <div>
                      <p className="font-medium">{benefit.title}</p>
                      <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Back Button */}
        <div className="mt-8 pb-8">
          <Link to={user ? "/dashboard" : "/"}>
            <Button variant="outline" className="w-full" size="lg">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Terug naar {user ? "dashboard" : "FinOverzicht"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Install;