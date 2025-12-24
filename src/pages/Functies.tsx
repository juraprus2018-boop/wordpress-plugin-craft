import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  TrendingDown,
  CreditCard, 
  Users, 
  Download,
  Moon,
  Tag,
  Calendar,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: 'Dashboard met KPIs',
    description: 'Bekijk in één oogopslag je totale inkomsten, uitgaven, netto resultaat en spaarpercentage. Alle bedragen worden automatisch genormaliseerd naar maandbedragen.',
    color: 'primary',
  },
  {
    icon: TrendingUp,
    title: 'Inkomsten bijhouden',
    description: 'Registreer al je inkomstenbronnen zoals salaris, freelance werk, uitkeringen of andere inkomsten. Stel de frequentie in van maandelijks tot jaarlijks.',
    color: 'success',
  },
  {
    icon: TrendingDown,
    title: 'Uitgaven beheren',
    description: 'Houd al je vaste lasten en uitgaven bij. Categoriseer ze voor beter inzicht en zie precies waar je geld naartoe gaat.',
    color: 'destructive',
  },
  {
    icon: CreditCard,
    title: 'Schulden volgen',
    description: 'Beheer je schulden en leningen. Zie de voortgang van je aflossing met een visuele voortgangsbalk en registreer betalingen.',
    color: 'warning',
  },
  {
    icon: Tag,
    title: 'Categorieën',
    description: 'Organiseer je inkomsten en uitgaven met aanpasbare categorieën. Maak je eigen categorieën aan met kleuren naar keuze.',
    color: 'info',
  },
  {
    icon: Users,
    title: 'Gezinsleden',
    description: 'Voeg gezinsleden toe en koppel transacties aan specifieke personen. Ideaal voor huishoudens om overzicht te houden.',
    color: 'primary',
  },
  {
    icon: Calendar,
    title: 'Frequenties',
    description: 'Stel in hoe vaak een inkomst of uitgave voorkomt: maandelijks, per kwartaal, halfjaarlijks of jaarlijks. Alles wordt automatisch omgerekend.',
    color: 'success',
  },
  {
    icon: Download,
    title: 'Exporteren',
    description: 'Download je gegevens als PDF of Excel bestand. Handig voor je administratie of om te delen met anderen.',
    color: 'info',
  },
  {
    icon: Moon,
    title: 'Donker thema',
    description: 'Werk je liever in donkere modus? Schakel eenvoudig tussen licht, donker of systeemvoorkeur.',
    color: 'primary',
  },
];

export default function Functies() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-transparent to-info/5">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Alle functies van FinOverzicht
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Ontdek alle mogelijkheden om je financiën overzichtelijk te beheren. Volledig gratis, zonder verborgen kosten.
            </p>
            <Link to="/auth?mode=signup">
              <Button size="lg" className="text-lg px-8">
                Gratis starten
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => {
                const colorClasses: Record<string, string> = {
                  primary: 'bg-primary/10 text-primary',
                  success: 'bg-success/10 text-success',
                  destructive: 'bg-destructive/10 text-destructive',
                  warning: 'bg-warning/10 text-warning',
                  info: 'bg-info/10 text-info',
                };
                
                return (
                  <div 
                    key={feature.title} 
                    className="p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow"
                  >
                    <div className={`p-3 rounded-xl w-fit mb-4 ${colorClasses[feature.color]}`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl font-bold text-center mb-12">
                Waarom FinOverzicht?
              </h2>
              
              <div className="space-y-4">
                {[
                  '100% gratis — geen premium versie, geen verborgen kosten',
                  'Eenvoudig te gebruiken — geen ingewikkelde instellingen',
                  'Privacy-vriendelijk — jouw data blijft van jou',
                  'Werkt op alle apparaten — desktop, tablet en mobiel',
                  'Geen advertenties — focus op je financiën',
                  'Nederlandse taal — volledig in het Nederlands',
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Klaar om te beginnen?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Maak vandaag nog je gratis account aan.
            </p>
            <Link to="/auth?mode=signup">
              <Button size="lg" className="text-lg px-8">
                Gratis account aanmaken
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
