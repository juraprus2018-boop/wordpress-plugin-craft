import { Link } from "react-router-dom";
import { useSEO } from '@/hooks/useSEO';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { 
  PieChart, 
  Target, 
  TrendingUp, 
  Calculator, 
  CheckCircle, 
  ArrowRight,
  Lightbulb,
  BarChart3,
  Wallet
} from "lucide-react";

const BudgetBeheren = () => {
  useSEO({
    title: 'Budget Beheren - Tips voor Budgetteren | FinOverzicht',
    description: 'Leer hoe je een budget opstelt en beheert. De 50/30/20 regel, veelgemaakte fouten en praktische tips voor financieel succes.',
    canonical: 'https://www.finoverzicht.nl/budget-beheren'
  });

  const budgetTips = [
    {
      icon: Calculator,
      title: "50/30/20 Regel",
      description: "Verdeel je inkomen: 50% vaste lasten, 30% persoonlijke uitgaven, 20% sparen."
    },
    {
      icon: Target,
      title: "Stel Doelen",
      description: "Bepaal concrete financiële doelen om gemotiveerd te blijven."
    },
    {
      icon: BarChart3,
      title: "Monitor Regelmatig",
      description: "Bekijk wekelijks je uitgaven om op koers te blijven."
    },
    {
      icon: Wallet,
      title: "Noodfonds",
      description: "Bouw een buffer op van minimaal 3 maanden aan vaste lasten."
    }
  ];

  const budgetSteps = [
    {
      step: "1",
      title: "Breng je inkomsten in kaart",
      description: "Noteer al je inkomstenbronnen: salaris, bijverdiensten, toeslagen en andere vaste inkomsten."
    },
    {
      step: "2",
      title: "Lijst je vaste lasten op",
      description: "Huur/hypotheek, verzekeringen, abonnementen, energie - alles wat maandelijks terugkomt."
    },
    {
      step: "3",
      title: "Analyseer variabele uitgaven",
      description: "Boodschappen, kleding, entertainment - hier zit vaak de meeste besparingspotentieel."
    },
    {
      step: "4",
      title: "Stel categorieën in",
      description: "Verdeel je budget over categorieën en bepaal maximale bedragen per categorie."
    },
    {
      step: "5",
      title: "Evalueer en pas aan",
      description: "Bekijk maandelijks je budget en pas aan waar nodig. Flexibiliteit is key!"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <PieChart className="w-4 h-4" />
                Budget & Financiën
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Budget Beheren: De Complete Gids voor{" "}
                <span className="text-primary">Financiële Controle</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Leer hoe je een effectief budget opstelt en beheert. Van beginners tips tot 
                geavanceerde strategieën - alles wat je nodig hebt om je financiën onder controle te krijgen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/auth">
                    Start Gratis met Budgetteren
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg">
                  <Link to="/functies">Bekijk Functies</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* What is Budget Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Wat is Budget Beheren?
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="text-lg leading-relaxed mb-6">
                  Budget beheren is het proces van het plannen, monitoren en controleren van je inkomsten 
                  en uitgaven. Het is de basis van gezonde persoonlijke financiën en helpt je om:
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <span>Inzicht te krijgen in waar je geld naartoe gaat</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <span>Financiële doelen te stellen en te bereiken</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <span>Schulden af te bouwen en vermogen op te bouwen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <span>Stress over geld te verminderen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <span>Voorbereid te zijn op onverwachte uitgaven</span>
                  </li>
                </ul>
                <p className="text-lg leading-relaxed">
                  Met FinOverzicht maak je budgetteren eenvoudig. Onze gratis tool helpt je om je 
                  inkomsten en uitgaven bij te houden, categorieën te maken en je voortgang te monitoren.
                  Bekijk ook onze tips over{" "}
                  <Link to="/uitgaven-beheren" className="text-primary hover:underline">uitgaven beheren</Link>{" "}
                  en{" "}
                  <Link to="/geld-besparen" className="text-primary hover:underline">geld besparen</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Budget Tips Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Essentiële Budgettips
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Bewezen strategieën om je budget effectief te beheren
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {budgetTips.map((tip, index) => (
                <Card key={index} className="bg-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <tip.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{tip.title}</h3>
                    <p className="text-muted-foreground">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Step by Step Guide */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Budget Opstellen in 5 Stappen
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Volg deze stappen om vandaag nog te beginnen met budgetteren
              </p>
            </div>
            <div className="max-w-4xl mx-auto space-y-6">
              {budgetSteps.map((item, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1 pb-6 border-b border-border last:border-0">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 50/30/20 Rule Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Lightbulb className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  De 50/30/20 Budgetregel
                </h2>
                <p className="text-xl text-muted-foreground">
                  Een eenvoudige maar effectieve manier om je budget te verdelen
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-card text-center">
                  <CardContent className="p-8">
                    <div className="text-5xl font-bold text-primary mb-4">50%</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Vaste Lasten</h3>
                    <p className="text-muted-foreground">
                      Huur, hypotheek, verzekeringen, boodschappen, energie en andere noodzakelijke uitgaven.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card text-center">
                  <CardContent className="p-8">
                    <div className="text-5xl font-bold text-secondary mb-4">30%</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Persoonlijk</h3>
                    <p className="text-muted-foreground">
                      Entertainment, uit eten, hobby's, kleding en andere persoonlijke uitgaven.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card text-center">
                  <CardContent className="p-8">
                    <div className="text-5xl font-bold text-accent mb-4">20%</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Sparen</h3>
                    <p className="text-muted-foreground">
                      Noodfonds, pensioen, investeringen en het aflossen van schulden.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Veelgemaakte Fouten bij Budgetteren
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-destructive/5 border-destructive/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">❌ Geen buffer inbouwen</h3>
                    <p className="text-muted-foreground">
                      Altijd een kleine marge aanhouden voor onverwachte uitgaven voorkomt stress.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-destructive/5 border-destructive/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">❌ Te streng beginnen</h3>
                    <p className="text-muted-foreground">
                      Een te strak budget houd je niet vol. Begin realistisch en verscherp geleidelijk.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-destructive/5 border-destructive/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">❌ Kleine uitgaven negeren</h3>
                    <p className="text-muted-foreground">
                      Kleine dagelijkse uitgaven tellen op. Die €3 koffie is €60 per maand!
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-destructive/5 border-destructive/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">❌ Niet bijhouden</h3>
                    <p className="text-muted-foreground">
                      Een budget werkt alleen als je het actief bijhoudt. Gebruik een app zoals FinOverzicht!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Begin Vandaag nog met Budgetteren
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              FinOverzicht maakt budgetteren eenvoudig en gratis. Start nu en krijg grip op je financiën.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link to="/auth">
                Maak Gratis Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
};

export default BudgetBeheren;
