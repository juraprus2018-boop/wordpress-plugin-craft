import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wallet, BarChart3, PieChart, Shield } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-7 w-7 text-primary" />
            <span className="font-heading font-bold text-xl">FinOverzicht</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost">Inloggen</Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button>Gratis starten</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading text-4xl lg:text-6xl font-bold mb-6">
              Krijg grip op je <span className="text-gradient">financiën</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Beheer je inkomsten en uitgaven overzichtelijk. Zie in één oogopslag waar je geld naartoe gaat met duidelijke grafieken en KPI's.
            </p>
            <Link to="/auth?mode=signup">
              <Button size="lg" className="text-lg px-8">
                Gratis account aanmaken
              </Button>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-center mb-12">Waarom FinOverzicht?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-4">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">Duidelijk Dashboard</h3>
                <p className="text-muted-foreground">
                  Zie direct je totale inkomsten, uitgaven en netto resultaat in overzichtelijke KPI's.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-4">
                  <PieChart className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">Slimme Categorieën</h3>
                <p className="text-muted-foreground">
                  Organiseer je transacties in categorieën en zie precies waar je geld naartoe gaat.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">100% Gratis</h3>
                <p className="text-muted-foreground">
                  Alle functies zijn volledig gratis beschikbaar. Geen verborgen kosten.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 FinOverzicht. Alle rechten voorbehouden.</p>
        </div>
      </footer>
    </div>
  );
}