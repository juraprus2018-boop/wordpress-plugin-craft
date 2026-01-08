import { useState } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  Settings, 
  Users, 
  Calendar,
  BarChart3,
  Landmark,
  Bell,
  Download,
  Palette,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  Wallet,
  Play,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  MousePointer,
  Plus,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Animated step component
function AnimatedStep({ 
  step, 
  title, 
  description, 
  icon: Icon, 
  color,
  delay 
}: { 
  step: number; 
  title: string; 
  description: string; 
  icon: React.ElementType;
  color: string;
  delay: number;
}) {
  return (
    <div 
      className="relative flex items-start gap-4 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Step number with animated pulse */}
      <div className="relative">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg",
          color
        )}>
          {step}
        </div>
        <div className={cn(
          "absolute inset-0 rounded-2xl animate-ping opacity-20",
          color
        )} style={{ animationDuration: '2s', animationDelay: `${delay + 500}ms` }} />
      </div>
      
      <div className="flex-1 pt-1">
        <div className="flex items-center gap-2 mb-1">
          <Icon className="h-5 w-5 text-muted-foreground" />
          <h4 className="font-heading font-semibold text-lg">{title}</h4>
        </div>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// Interactive demo component
function InteractiveDemo({ title, children }: { title: string; children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <div className="relative rounded-2xl border border-border/50 bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/30">
        <span className="text-sm font-medium">{title}</span>
        <Button 
          size="sm" 
          variant="ghost" 
          className="gap-2"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Eye className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isPlaying ? 'Bekijken' : 'Afspelen'}
        </Button>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

// Collapsible section
function CollapsibleSection({ 
  icon: Icon, 
  title, 
  description, 
  color, 
  bgColor,
  children,
  defaultOpen = false
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  color: string;
  bgColor: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="rounded-2xl border border-border/50 bg-card overflow-hidden hover:shadow-lg transition-shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-muted/30 transition-colors"
      >
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", bgColor)}>
          <Icon className={cn("h-6 w-6", color)} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground truncate">{description}</p>
        </div>
        <ChevronDown className={cn(
          "h-5 w-5 text-muted-foreground transition-transform shrink-0",
          isOpen && "rotate-180"
        )} />
      </button>
      
      <div className={cn(
        "overflow-hidden transition-all duration-300",
        isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="p-5 pt-0 border-t border-border/50">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function HandleidingPublic() {
  useSEO({
    title: 'Handleiding - FinOverzicht | Leer alle functies kennen',
    description: 'Complete handleiding voor FinOverzicht. Leer stap voor stap hoe je je financiën beheert met onze gratis huishoudboekje app.',
  });

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Hero */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <HelpCircle className="h-4 w-4" />
              Complete gebruikershandleiding
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Leer FinOverzicht
              <span className="text-primary"> in 5 minuten</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ontdek alle functies en begin direct met het beheren van je financiën. 
              Van eerste stappen tot geavanceerde tips.
            </p>
          </div>

          {/* Quick Start Section */}
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <h2 className="font-heading text-2xl font-bold">Snel starten</h2>
            </div>
            
            <Card className="bg-gradient-to-br from-primary/5 via-transparent to-transparent border-primary/20 overflow-hidden">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <AnimatedStep 
                      step={1} 
                      title="Maak een account" 
                      description="Registreer gratis met je e-mailadres. Geen creditcard nodig."
                      icon={Users}
                      color="bg-emerald-500"
                      delay={0}
                    />
                    <AnimatedStep 
                      step={2} 
                      title="Voeg inkomsten toe" 
                      description="Begin met je salaris en andere bronnen van inkomen."
                      icon={TrendingUp}
                      color="bg-blue-500"
                      delay={150}
                    />
                    <AnimatedStep 
                      step={3} 
                      title="Registreer uitgaven" 
                      description="Voeg je vaste lasten toe: huur, verzekeringen, abonnementen."
                      icon={TrendingDown}
                      color="bg-coral"
                      delay={300}
                    />
                    <AnimatedStep 
                      step={4} 
                      title="Bekijk je overzicht" 
                      description="Je dashboard toont direct je financiële situatie."
                      icon={LayoutDashboard}
                      color="bg-violet-500"
                      delay={450}
                    />
                  </div>
                  
                  {/* Animated preview */}
                  <div className="hidden md:flex items-center justify-center">
                    <div className="relative w-full max-w-sm">
                      {/* Simulated dashboard preview */}
                      <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden animate-scale-in">
                        <div className="p-4 border-b border-border/50 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <Wallet className="h-4 w-4 text-primary-foreground" />
                          </div>
                          <span className="font-heading font-semibold">Dashboard</span>
                        </div>
                        <div className="p-4 space-y-3">
                          {/* KPI cards simulation */}
                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                              <div className="text-xs text-muted-foreground">Inkomsten</div>
                              <div className="font-bold text-emerald-600">€ 3.200</div>
                            </div>
                            <div className="p-3 rounded-xl bg-coral/10 border border-coral/20">
                              <div className="text-xs text-muted-foreground">Uitgaven</div>
                              <div className="font-bold text-coral">€ 2.150</div>
                            </div>
                          </div>
                          {/* Balance bar */}
                          <div className="p-3 rounded-xl bg-muted/50">
                            <div className="flex justify-between text-xs mb-2">
                              <span className="text-muted-foreground">Netto resultaat</span>
                              <span className="font-medium text-primary">+€ 1.050</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-primary to-emerald-500 w-[67%] rounded-full" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Floating elements */}
                      <div className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center animate-bounce" style={{ animationDuration: '3s' }}>
                        <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                  <Link to="/auth?mode=signup">
                    <Button size="lg" className="gap-2 rounded-xl shadow-glow">
                      <Sparkles className="h-4 w-4" />
                      Gratis beginnen
                    </Button>
                  </Link>
                  <a href="#functies">
                    <Button size="lg" variant="outline" className="gap-2 rounded-xl">
                      Alle functies bekijken
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Features Section */}
          <section id="functies" className="mb-20 scroll-mt-32">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <h2 className="font-heading text-2xl font-bold">Alle functies uitgelegd</h2>
            </div>
            
            <div className="space-y-4">
              <CollapsibleSection
                icon={LayoutDashboard}
                title="Dashboard"
                description="Je centrale overzicht van alle financiën"
                color="text-primary"
                bgColor="bg-primary/10"
                defaultOpen={true}
              >
                <div className="space-y-4">
                  <InteractiveDemo title="Dashboard overzicht">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Eye className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">KPI-kaarten</p>
                          <p className="text-sm text-muted-foreground">
                            Bovenaan zie je 6 kaarten met je belangrijkste cijfers: inkomsten, uitgaven, 
                            nettoresultaat, schulden, leningen en spaarquote.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Filter op gezinslid</p>
                          <p className="text-sm text-muted-foreground">
                            Rechtsboven kun je filteren: "Samen" toont alles, of kies een specifiek gezinslid 
                            om alleen hun financiën te zien.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <BarChart3 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Grafieken</p>
                          <p className="text-sm text-muted-foreground">
                            Cashflow-grafiek, jaarprojectie, inkomen vs. uitgaven taart en uitgaven per categorie.
                          </p>
                        </div>
                      </div>
                    </div>
                  </InteractiveDemo>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                icon={TrendingUp}
                title="Inkomsten"
                description="Beheer al je bronnen van inkomen"
                color="text-emerald-500"
                bgColor="bg-emerald-500/10"
              >
                <div className="space-y-4">
                  <InteractiveDemo title="Inkomen toevoegen">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border/50">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                          <Plus className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Klik op "Toevoegen"</p>
                          <p className="text-sm text-muted-foreground">Open het formulier voor nieuw inkomen</p>
                        </div>
                        <MousePointer className="h-5 w-5 text-muted-foreground animate-bounce" />
                      </div>
                      
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span><strong>Naam:</strong> Geef een beschrijvende naam (bijv. "Salaris")</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span><strong>Categorie:</strong> Kies uit Salaris, Bijverdiensten, Uitkeringen of Overig</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span><strong>Frequentie:</strong> Maandelijks, per kwartaal, halfjaarlijks of jaarlijks</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span><strong>Gezinslid:</strong> Optioneel - koppel aan een specifiek gezinslid</span>
                        </li>
                      </ul>
                    </div>
                  </InteractiveDemo>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                icon={TrendingDown}
                title="Uitgaven"
                description="Houd al je vaste lasten bij"
                color="text-coral"
                bgColor="bg-coral/10"
              >
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Voeg al je terugkerende uitgaven toe. De app rekent alles automatisch om naar maandbedragen.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {['Wonen (huur/hypotheek)', 'Verzekeringen', 'Abonnementen', 'Boodschappen', 'Vervoer', 'Entertainment'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
                        <CheckCircle2 className="h-4 w-4 text-coral" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <p className="text-sm font-medium text-amber-600 dark:text-amber-400 flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Tip: Gedeelde uitgaven
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Markeer een uitgave als "Gedeeld" en de kosten worden automatisch verdeeld over alle gezinsleden.
                    </p>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                icon={CreditCard}
                title="Schulden & Leningen"
                description="Beheer schulden en leningen apart"
                color="text-amber-500"
                bgColor="bg-amber-500/10"
              >
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-border/50 bg-card">
                      <div className="flex items-center gap-2 mb-3">
                        <CreditCard className="h-5 w-5 text-destructive" />
                        <h4 className="font-medium">Schulden</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Informele schulden zoals openstaande rekeningen of geld dat je aan iemand verschuldigd bent.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border border-border/50 bg-card">
                      <div className="flex items-center gap-2 mb-3">
                        <Landmark className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">Leningen</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Formele leningen zoals persoonlijke leningen, autoleningen of hypotheken.
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Registreer betalingen om je voortgang te volgen. De voortgangsbalk toont hoeveel procent je al hebt afgelost.
                  </p>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                icon={Users}
                title="Gezinsleden"
                description="Voeg huisgenoten of gezinsleden toe"
                color="text-violet-500"
                bgColor="bg-violet-500/10"
              >
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Beheer de financiën van je hele huishouden door gezinsleden toe te voegen.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-violet-500 mt-0.5 shrink-0" />
                      <span>Ga naar <strong>Instellingen → Gezinsleden</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-violet-500 mt-0.5 shrink-0" />
                      <span>Geef elk lid een naam en kies een kleur</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-violet-500 mt-0.5 shrink-0" />
                      <span>Filter het dashboard om per lid te bekijken</span>
                    </li>
                  </ul>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                icon={Calendar}
                title="Frequenties"
                description="Hoe werken frequenties?"
                color="text-blue-500"
                bgColor="bg-blue-500/10"
              >
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Niet alle inkomsten en uitgaven zijn maandelijks. FinOverzicht rekent alles om naar maandbedragen.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-muted/50">
                      <span className="font-medium">Maandelijks (1x)</span>
                      <p className="text-xs text-muted-foreground">Bedrag ÷ 1</p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/50">
                      <span className="font-medium">Per kwartaal (3x)</span>
                      <p className="text-xs text-muted-foreground">Bedrag ÷ 3</p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/50">
                      <span className="font-medium">Halfjaarlijks (6x)</span>
                      <p className="text-xs text-muted-foreground">Bedrag ÷ 6</p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/50">
                      <span className="font-medium">Jaarlijks (12x)</span>
                      <p className="text-xs text-muted-foreground">Bedrag ÷ 12</p>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                icon={Palette}
                title="Categorieën & Thema"
                description="Pas de app aan naar jouw smaak"
                color="text-pink-500"
                bgColor="bg-pink-500/10"
              >
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Categorieën</h4>
                      <p className="text-sm text-muted-foreground">
                        Standaardcategorieën worden automatisch aangemaakt. Voeg eigen categorieën toe via Instellingen.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Thema</h4>
                      <p className="text-sm text-muted-foreground">
                        Kies tussen Licht, Donker of Systeem (volgt je apparaat).
                      </p>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                icon={Download}
                title="Installatie & Export"
                description="Installeer als app en exporteer data"
                color="text-indigo-500"
                bgColor="bg-indigo-500/10"
              >
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-border/50">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Als app installeren
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• iPhone: Tik op "Deel" → "Zet op beginscherm"</li>
                        <li>• Android: Tik op menu → "Installeren"</li>
                        <li>• Desktop: Installatie-icoon in adresbalk</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-xl border border-border/50">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Data exporteren
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Excel (.xlsx) voor spreadsheets</li>
                        <li>• PDF voor afdrukken</li>
                        <li>• Handig voor belastingaangifte</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                icon={Bell}
                title="Notificaties"
                description="Ontvang herinneringen voor betalingen"
                color="text-orange-500"
                bgColor="bg-orange-500/10"
              >
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Schakel pushnotificaties in om herinneringen te ontvangen voor aflossingen.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                      <span>Ga naar <strong>Instellingen → Notificaties</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                      <span>Sta notificaties toe in je browser</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                      <span>Werkt het beste als PWA (geïnstalleerde app)</span>
                    </li>
                  </ul>
                </div>
              </CollapsibleSection>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
              <CardContent className="p-8 md:p-12">
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                  Klaar om te beginnen?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Start vandaag nog met het beheren van je financiën. 
                  100% gratis, geen creditcard nodig.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/auth?mode=signup">
                    <Button size="lg" className="gap-2 rounded-xl shadow-glow">
                      <Sparkles className="h-4 w-4" />
                      Gratis account aanmaken
                    </Button>
                  </Link>
                  <Link to="/functies">
                    <Button size="lg" variant="outline" className="gap-2 rounded-xl">
                      Meer over functies
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      
      <PublicFooter />
    </div>
  );
}