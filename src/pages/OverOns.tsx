import { Link } from 'react-router-dom';
import { useSEO, createBreadcrumbSchema } from '@/hooks/useSEO';
import { Button } from '@/components/ui/button';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { Heart, Target, Users, ArrowRight } from 'lucide-react';

export default function OverOns() {
  useSEO({
    title: 'Over Ons - FinOverzicht | Inzicht in je Financiën',
    description: 'FinOverzicht maakt je inkomsten en uitgaven inzichtelijk. Gratis, eenvoudig en privacyvriendelijk.',
    canonical: 'https://www.finoverzicht.nl/over-ons',
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "Over FinOverzicht",
        "description": "FinOverzicht maakt je inkomsten en uitgaven inzichtelijk. Gratis, eenvoudig en privacyvriendelijk.",
        "url": "https://www.finoverzicht.nl/over-ons",
        "mainEntity": {
          "@type": "Organization",
          "name": "FinOverzicht",
          "description": "Gratis tool om je inkomsten en uitgaven inzichtelijk te maken",
          "foundingDate": "2024",
          "url": "https://www.finoverzicht.nl"
        }
      },
      createBreadcrumbSchema([
        { name: 'Home', url: 'https://www.finoverzicht.nl/' },
        { name: 'Over Ons', url: 'https://www.finoverzicht.nl/over-ons' }
      ])
    ]
  });

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
              FinOverzicht maakt je inkomsten en uitgaven inzichtelijk, zodat je weet wat je kunt sparen.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div>
                <h2 className="font-heading text-3xl font-bold mb-6">Waarom FinOverzicht?</h2>
                <p className="text-muted-foreground mb-4">
                  FinOverzicht is ontstaan uit een simpele gedachte: inzicht in je financiën hoeft niet ingewikkeld te zijn. 
                  Hoeveel komt er binnen? Waar gaat het naartoe? En wat blijft er over om te sparen?
                </p>
                <p className="text-muted-foreground mb-4">
                  Met FinOverzicht maak je dit inzichtelijk. Houd je inkomsten en uitgaven bij, en eventueel 
                  je schulden als je die hebt. Zo zie je precies waar je staat.
                </p>
                <p className="text-muted-foreground">
                  Geen ingewikkelde functies, geen abonnementskosten. 
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
                    Alleen wat je nodig hebt: inkomsten, uitgaven en optioneel schulden bijhouden.
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
              Maak je inkomsten en uitgaven inzichtelijk en ontdek wat je kunt sparen.
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
