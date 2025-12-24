import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { Heart, Target, Users, ArrowRight } from 'lucide-react';

export default function OverOns() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-transparent to-info/5">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Over FinOverzicht
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Wij geloven dat iedereen recht heeft op financieel overzicht, zonder ingewikkelde tools of dure abonnementen.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div>
                <h2 className="font-heading text-3xl font-bold mb-6">Onze missie</h2>
                <p className="text-muted-foreground mb-4">
                  FinOverzicht is ontstaan uit een simpele gedachte: financieel overzicht hoeft niet ingewikkeld te zijn. 
                  Veel mensen worstelen met het bijhouden van hun inkomsten en uitgaven, niet omdat het moeilijk is, 
                  maar omdat de bestaande tools te complex zijn of geld kosten.
                </p>
                <p className="text-muted-foreground mb-4">
                  Daarom hebben we FinOverzicht gemaakt: een eenvoudige, gratis tool waarmee iedereen 
                  grip kan krijgen op zijn of haar financiën. Of je nu student bent met je eerste bijbaantje, 
                  of een gezin dat de maandelijkse kosten wil bijhouden.
                </p>
                <p className="text-muted-foreground">
                  Geen ingewikkelde grafieken, geen onnodige functies, geen abonnementskosten. 
                  Gewoon een helder overzicht van wat er binnenkomt en wat er uitgaat.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Eenvoud</h3>
                  <p className="text-muted-foreground text-sm">
                    Geen overbodige functies. Alleen wat je echt nodig hebt voor financieel overzicht.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="p-3 rounded-xl bg-success/10 text-success w-fit mb-4">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Gratis</h3>
                  <p className="text-muted-foreground text-sm">
                    100% gratis te gebruiken. Geen premium versie, geen verborgen kosten.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="p-3 rounded-xl bg-info/10 text-info w-fit mb-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Voor iedereen</h3>
                  <p className="text-muted-foreground text-sm">
                    Of je nu alleen woont of een gezin hebt, FinOverzicht past bij jouw situatie.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Probeer het zelf
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Ontdek hoe eenvoudig het is om overzicht te krijgen over je financiën.
            </p>
            <Link to="/auth?mode=signup">
              <Button size="lg" className="text-lg px-8">
                Gratis account aanmaken
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
