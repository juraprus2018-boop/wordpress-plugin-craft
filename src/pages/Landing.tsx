import { Link } from 'react-router-dom';
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
  LineChart
} from 'lucide-react';

export default function Landing() {
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
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 text-sm font-medium mb-8 animate-fade-in">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-foreground">100% Gratis — Geen creditcard nodig</span>
              </div>
              
              {/* Main heading */}
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
                Krijg grip op je
                <br />
                <span className="text-gradient">financiën</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                FinOverzicht helpt iedereen die zijn financiën op orde wil hebben. 
                Zie in één oogopslag wat er binnenkomt en wat er uitgaat.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
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

              {/* Trust indicators */}
              <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <span className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                    <CheckCircle2 className="h-3 w-3 text-success" />
                  </div>
                  Geen verborgen kosten
                </span>
                <span className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                    <CheckCircle2 className="h-3 w-3 text-success" />
                  </div>
                  Direct aan de slag
                </span>
                <span className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                    <CheckCircle2 className="h-3 w-3 text-success" />
                  </div>
                  Veilig en privé
                </span>
              </div>
            </div>
          </div>
          
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </section>

        {/* Stats Section */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "100%", label: "Gratis" },
                { value: "< 2min", label: "Account aanmaken" },
                { value: "∞", label: "Transacties" },
                { value: "24/7", label: "Toegang" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-heading text-3xl md:text-4xl font-bold text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
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
                Gemaakt voor jouw situatie
              </h2>
              <p className="text-lg text-muted-foreground">
                Of je nu student bent, samenwonend, of een gezin hebt — FinOverzicht past bij jou.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Wallet,
                  title: "Starters",
                  description: "Net begonnen met werken? Leer goed omgaan met je eerste salaris en bouw gezonde financiële gewoontes op."
                },
                {
                  icon: Users,
                  title: "Gezinnen",
                  description: "Houd de financiën van het hele gezin bij. Zie per persoon wat er binnenkomt en uitgaat."
                },
                {
                  icon: Target,
                  title: "Spaarders",
                  description: "Wil je meer sparen? Krijg inzicht in je uitgaven en ontdek waar je kunt besparen."
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
                Alles wat je nodig hebt
              </h2>
              <p className="text-lg text-muted-foreground">
                Krachtige functies om je financiën volledig in kaart te brengen.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: BarChart3,
                  title: "Overzichtelijk Dashboard",
                  description: "Zie direct je totale inkomsten, uitgaven en netto resultaat in duidelijke KPI's."
                },
                {
                  icon: PieChart,
                  title: "Slimme Categorieën",
                  description: "Organiseer je transacties in categorieën en zie precies waar je geld naartoe gaat."
                },
                {
                  icon: TrendingUp,
                  title: "Inkomsten Bijhouden",
                  description: "Registreer al je inkomstenbronnen, van salaris tot bijverdiensten."
                },
                {
                  icon: CreditCard,
                  title: "Schulden Beheren",
                  description: "Houd je schulden bij en zie je voortgang. Registreer betalingen en volg je aflossing."
                },
                {
                  icon: Clock,
                  title: "Terugkerende Betalingen",
                  description: "Stel frequenties in: maandelijks, per kwartaal of jaarlijks. Automatisch genormaliseerd."
                },
                {
                  icon: LineChart,
                  title: "Visuele Grafieken",
                  description: "Bekijk je financiële data in mooie grafieken en krijg direct inzicht."
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
                In 3 stappen aan de slag
              </h2>
              <p className="text-lg text-muted-foreground">
                Direct beginnen met je financieel overzicht.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 relative">
                {/* Connecting line */}
                <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-0.5 bg-primary/30" style={{ left: '16.67%', right: '16.67%' }} />
                
                {[
                  { step: "1", title: "Maak een account", desc: "Registreer gratis met je e-mailadres. Geen creditcard nodig." },
                  { step: "2", title: "Voeg je gegevens toe", desc: "Voer je inkomsten, uitgaven en eventuele schulden in." },
                  { step: "3", title: "Krijg overzicht", desc: "Bekijk je dashboard en zie direct waar je staat." }
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

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="hero-glow glow-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow" />
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto">
              <div className="relative rounded-2xl p-12 text-center bg-primary/5 border border-primary/20">
                <Sparkles className="h-8 w-8 text-primary mx-auto mb-6" />
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                  Klaar om te beginnen?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
                  Maak vandaag nog je gratis account aan en krijg grip op je financiën.
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
