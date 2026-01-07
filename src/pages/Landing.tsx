import { Link } from 'react-router-dom';
import { useSEO, createOrganizationSchema, createWebSiteSchema, createSoftwareApplicationSchema } from '@/hooks/useSEO';
import { Button } from '@/components/ui/button';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { 
  BarChart3, 
  PieChart, 
  Shield, 
  TrendingUp, 
  CreditCard, 
  Users, 
  CheckCircle2,
  ArrowRight,
  Wallet,
  Target,
  Clock,
  Sparkles,
  Zap,
  LineChart,
  Smartphone
} from 'lucide-react';

export default function Landing() {
  useSEO({
    title: 'FinOverzicht - Gratis Inzicht in je Inkomsten en Uitgaven',
    description: 'Maak je financiën inzichtelijk met FinOverzicht. Houd je inkomsten, uitgaven en schulden bij en ontdek wat je kunt sparen. 100% gratis.',
    canonical: 'https://www.finoverzicht.nl/',
    jsonLd: [
      createOrganizationSchema(),
      createWebSiteSchema(),
      createSoftwareApplicationSchema()
    ]
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 pattern-grid" />
          <div className="hero-glow glow-primary top-1/4 -left-32 animate-pulse-slow" />
          <div className="hero-glow glow-primary top-1/3 -right-32 animate-pulse-slow" style={{ animationDelay: '-2s', opacity: 0.2 }} />
          
          {/* Floating shapes */}
          <div className="absolute top-1/4 left-[15%] w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 animate-float hidden lg:block" />
          <div className="absolute bottom-1/3 right-[20%] w-16 h-16 rounded-xl bg-primary/5 border border-primary/10 animate-float-delayed hidden lg:block" />
          <div className="absolute top-1/2 right-[10%] w-12 h-12 rounded-lg bg-primary/5 border border-primary/10 animate-float hidden lg:block" style={{ animationDelay: '-1s' }} />
          
          <div className="container mx-auto px-4 relative pt-24">
            <div className="max-w-4xl mx-auto text-center">
              {/* Main heading */}
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight animate-fade-in">
                Inzicht in je
                <br />
                <span className="text-gradient">financiën</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
                Maak je inkomsten en uitgaven inzichtelijk. Houd eventueel je schulden bij 
                en ontdek hoeveel je kunt sparen.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Link to="/auth?mode=signup">
                  <Button size="lg" className="text-lg px-8 h-14 rounded-full bg-primary hover:bg-primary/90 transition-colors text-primary-foreground font-semibold w-full sm:w-auto shadow-lg shadow-primary/25">
                    Gratis starten
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/functies">
                  <Button size="lg" variant="outline" className="text-lg px-8 h-14 rounded-full w-full sm:w-auto border-border/50 hover:bg-muted/50">
                    Bekijk functies
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </section>

        {/* How to use Section */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                  Gebruik het zoals jij wilt
                </h2>
                <p className="text-muted-foreground">
                  FinOverzicht werkt op twee manieren — kies wat bij jou past.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* App Option */}
                <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Smartphone className="h-7 w-7" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-2">📱 Als app op je telefoon</h3>
                  <p className="text-muted-foreground mb-4">
                    Installeer FinOverzicht als app op je startscherm. Opent snel, werkt offline en je blijft automatisch ingelogd.
                  </p>
                  <Link to="/install">
                    <Button variant="outline" className="rounded-full">
                      App installeren
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                
                {/* Website Option */}
                <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all">
                  <div className="w-14 h-14 rounded-xl bg-info/10 text-info flex items-center justify-center mb-4">
                    <BarChart3 className="h-7 w-7" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-2">💻 Via de website</h3>
                  <p className="text-muted-foreground mb-4">
                    Log gewoon in via de browser op je computer, tablet of telefoon. Geen installatie nodig.
                  </p>
                  <Link to="/auth">
                    <Button variant="outline" className="rounded-full">
                      Inloggen / Aanmelden
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Waarom gratis Section */}
        <section className="py-20 bg-primary/5 border-y border-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                    Waarom is FinOverzicht gratis?
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Veel mensen hebben geen duidelijk beeld van hun financiële situatie. Hoeveel komt er binnen? Waar gaat het naartoe? En wat blijft er over?
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    FinOverzicht maakt dit inzichtelijk. Door je inkomsten en uitgaven bij te houden, zie je precies waar je staat. En dat inzicht is de eerste stap naar beter sparen.
                  </p>
                </div>
                <div className="bg-card rounded-2xl p-8 border border-border">
                  <div className="text-6xl font-heading font-bold text-primary mb-4">€0</div>
                  <p className="text-lg font-medium text-foreground mb-2">Volledig gratis</p>
                  <p className="text-muted-foreground">Geen verborgen kosten, geen premium versie. Gewoon gratis inzicht in je financiën.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Voor wie Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 pattern-dots" />
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Users className="h-3.5 w-3.5" />
                Voor iedereen
              </div>
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
                Voor wie is FinOverzicht?
              </h2>
              <p className="text-lg text-muted-foreground">
                Iedereen die inzicht wil in wat er binnenkomt en uitgaat.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Wallet,
                  title: "Starters",
                  description: "Net begonnen met werken? Houd je inkomsten en uitgaven bij en zie wat je overhoudt."
                },
                {
                  icon: Users,
                  title: "Gezinnen",
                  description: "Maak de financiën van het hele huishouden inzichtelijk. Koppel transacties aan gezinsleden."
                },
                {
                  icon: Target,
                  title: "Spaarders",
                  description: "Wil je weten hoeveel je kunt sparen? Zie precies wat er binnenkomt en uitgaat."
                }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-muted/30 relative overflow-hidden">
          <div className="hero-glow glow-primary -bottom-64 left-1/4 animate-pulse-slow" />
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Zap className="h-3.5 w-3.5" />
                Functies
              </div>
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
                Simpel overzicht, meer inzicht
              </h2>
              <p className="text-lg text-muted-foreground">
                De functies die je nodig hebt om je financiën inzichtelijk te maken.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: BarChart3,
                  title: "Dashboard",
                  description: "Zie in één oogopslag je totale inkomsten, uitgaven en wat je overhoudt."
                },
                {
                  icon: PieChart,
                  title: "Categorieën",
                  description: "Organiseer je transacties in categorieën en zie waar je geld naartoe gaat."
                },
                {
                  icon: TrendingUp,
                  title: "Inkomsten",
                  description: "Houd al je inkomstenbronnen bij: salaris, bijverdiensten, toeslagen, etc."
                },
                {
                  icon: CreditCard,
                  title: "Schulden (optioneel)",
                  description: "Houd je schulden bij en registreer aflossingen om je voortgang te zien."
                },
                {
                  icon: Clock,
                  title: "Frequenties",
                  description: "Maandelijks, per kwartaal of jaarlijks - alles wordt omgerekend naar maandbedragen."
                },
                {
                  icon: LineChart,
                  title: "Grafieken",
                  description: "Bekijk je inkomsten en uitgaven in overzichtelijke grafieken."
                }
              ].map((feature, i) => (
                <div 
                  key={i}
                  className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="p-3 rounded-xl w-fit mb-4 bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                Simpel
              </div>
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
                Zo werkt het
              </h2>
              <p className="text-lg text-muted-foreground">
                In 3 simpele stappen inzicht in je financiën.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 relative">
                {/* Connecting line */}
                <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-0.5 bg-primary/30" style={{ left: '16.67%', right: '16.67%' }} />
                
                {[
                  { step: "1", title: "Maak een account", desc: "Registreer gratis met je e-mailadres." },
                  { step: "2", title: "Voer je gegevens in", desc: "Voeg je inkomsten en uitgaven toe. Schulden zijn optioneel." },
                  { step: "3", title: "Bekijk je overzicht", desc: "Zie wat er binnenkomt, wat er uitgaat en wat je kunt sparen." }
                ].map((item, i) => (
                  <div key={i} className="text-center relative">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold relative z-10 bg-primary text-primary-foreground"
                    >
                      {item.step}
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                    <Shield className="h-3.5 w-3.5" />
                    Veiligheid
                  </div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                    Jouw gegevens zijn veilig bij ons
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    We nemen je privacy serieus. Je financiële gegevens worden versleuteld opgeslagen 
                    en worden nooit gedeeld met derden. Je hebt altijd volledige controle over je data.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "SSL-versleutelde verbinding",
                      "Data wordt veilig opgeslagen",
                      "Geen delen met derden",
                      "Je data blijft van jou"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        </div>
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-2xl" />
                  <div className="relative glass rounded-2xl p-8 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
                      <Shield className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <h3 className="font-heading font-bold text-2xl mb-2">100% Privé</h3>
                    <p className="text-muted-foreground">
                      Alleen jij hebt toegang tot je financiële gegevens
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Donatie Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">☕</span>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                Heeft FinOverzicht je geholpen?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                FinOverzicht is en blijft gratis. Maar vind je het fijn om te gebruiken en wil je ons steunen? 
                Dan mag je altijd een vrijwillige donatie doen. Elk bedrag wordt gewaardeerd!
              </p>
              <a 
                href="https://tikkie.me/pay/JOUW-TIKKIE-LINK" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="rounded-full px-8 h-12 border-primary/30 hover:bg-primary/10 hover:border-primary/50">
                  <span className="mr-2">💚</span>
                  Doneer via Tikkie
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="hero-glow glow-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow" />
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto">
              <div className="relative rounded-2xl p-12 text-center bg-primary/5 border border-primary/20">
                <Sparkles className="h-8 w-8 text-primary mx-auto mb-6" />
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                  Klaar voor inzicht?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
                  Maak je financiën inzichtelijk. Gratis en in een paar minuten.
                </p>
                <Link to="/auth?mode=signup">
                  <Button size="lg" className="text-lg px-8 h-14 rounded-full bg-primary hover:bg-primary/90 transition-colors text-primary-foreground font-semibold shadow-lg shadow-primary/25">
                    Gratis account aanmaken
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
