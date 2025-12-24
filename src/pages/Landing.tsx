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
  Clock
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-info/5" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Shield className="h-4 w-4" />
                100% Gratis — Geen creditcard nodig
              </div>
              
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Krijg grip op je <span className="text-gradient">financiën</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                FinOverzicht helpt iedereen die zijn financiën op orde wil hebben. Zie in één oogopslag wat er binnenkomt en wat er uitgaat.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth?mode=signup">
                  <Button size="lg" className="text-lg px-8 w-full sm:w-auto">
                    Gratis account aanmaken
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/functies">
                  <Button size="lg" variant="outline" className="text-lg px-8 w-full sm:w-auto">
                    Bekijk functies
                  </Button>
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Geen verborgen kosten
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Direct aan de slag
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Veilig en privé
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Voor wie Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Voor iedereen die financieel overzicht wil
              </h2>
              <p className="text-lg text-muted-foreground">
                Of je nu student bent, samenwonend, of een gezin hebt — FinOverzicht past bij jouw situatie.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-8 rounded-2xl border border-border text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                  <Wallet className="h-8 w-8" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">Starters</h3>
                <p className="text-muted-foreground">
                  Net begonnen met werken? Leer goed omgaan met je eerste salaris en bouw gezonde financiële gewoontes op.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border text-center">
                <div className="w-16 h-16 rounded-2xl bg-info/10 text-info flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">Gezinnen</h3>
                <p className="text-muted-foreground">
                  Houd de financiën van het hele gezin bij. Zie per persoon wat er binnenkomt en uitgaat.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border text-center">
                <div className="w-16 h-16 rounded-2xl bg-success/10 text-success flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">Spaarders</h3>
                <p className="text-muted-foreground">
                  Wil je meer sparen? Krijg inzicht in je uitgaven en ontdek waar je kunt besparen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Alles wat je nodig hebt
              </h2>
              <p className="text-lg text-muted-foreground">
                Krachtige functies om je financiën volledig in kaart te brengen.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors">
                <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">Overzichtelijk Dashboard</h3>
                <p className="text-muted-foreground">
                  Zie direct je totale inkomsten, uitgaven en netto resultaat in duidelijke KPI's.
                </p>
              </div>

              <div className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors">
                <div className="p-3 rounded-xl bg-info/10 text-info w-fit mb-4 group-hover:scale-110 transition-transform">
                  <PieChart className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">Slimme Categorieën</h3>
                <p className="text-muted-foreground">
                  Organiseer je transacties in categorieën en zie precies waar je geld naartoe gaat.
                </p>
              </div>

              <div className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors">
                <div className="p-3 rounded-xl bg-success/10 text-success w-fit mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">Inkomsten Bijhouden</h3>
                <p className="text-muted-foreground">
                  Registreer al je inkomstenbronnen, van salaris tot bijverdiensten.
                </p>
              </div>

              <div className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors">
                <div className="p-3 rounded-xl bg-destructive/10 text-destructive w-fit mb-4 group-hover:scale-110 transition-transform">
                  <CreditCard className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">Schulden Beheren</h3>
                <p className="text-muted-foreground">
                  Houd je schulden bij en zie je voortgang. Registreer betalingen en volg je aflossing.
                </p>
              </div>

              <div className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors">
                <div className="p-3 rounded-xl bg-warning/10 text-warning w-fit mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">Terugkerende Betalingen</h3>
                <p className="text-muted-foreground">
                  Stel frequenties in: maandelijks, per kwartaal of jaarlijks. Automatisch genormaliseerd.
                </p>
              </div>

              <div className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors">
                <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">Gezinsleden</h3>
                <p className="text-muted-foreground">
                  Voeg gezinsleden toe en zie per persoon wat er binnenkomt en uitgaat.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                In 3 stappen aan de slag
              </h2>
              <p className="text-lg text-muted-foreground">
                Direct beginnen met je financieel overzicht.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Maak een account</h3>
                <p className="text-muted-foreground text-sm">
                  Registreer gratis met je e-mailadres. Geen creditcard nodig.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Voeg je gegevens toe</h3>
                <p className="text-muted-foreground text-sm">
                  Voer je inkomsten, uitgaven en eventuele schulden in.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Krijg overzicht</h3>
                <p className="text-muted-foreground text-sm">
                  Bekijk je dashboard en zie direct waar je staat.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 to-info/10 rounded-3xl p-12 border border-primary/20">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Klaar om te beginnen?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Maak vandaag nog je gratis account aan en krijg grip op je financiën.
              </p>
              <Link to="/auth?mode=signup">
                <Button size="lg" className="text-lg px-8">
                  Gratis account aanmaken
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
