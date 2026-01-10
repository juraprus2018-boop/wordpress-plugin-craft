import { Link } from "react-router-dom";
import { useSEO, createArticleSchema, createBreadcrumbSchema } from '@/hooks/useSEO';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { 
  PiggyBank, 
  TrendingUp, 
  Lightbulb, 
  ArrowRight,
  Coffee,
  ShoppingBag,
  Utensils,
  Car,
  Home,
  Smartphone,
  Zap,
  CheckCircle
} from "lucide-react";

const SparenTips = () => {
  useSEO({
    title: 'Spaartips - Slim Sparen voor Financiële Vrijheid | FinOverzicht',
    description: 'Slimme spaartips voor meer financiële vrijheid. Van dagelijkse besparingen tot spaardoelen en de 10% regel. Start vandaag.',
    canonical: 'https://www.finoverzicht.nl/sparen-tips',
    jsonLd: [
      createArticleSchema(
        'Slim Sparen voor Financiële Vrijheid',
        'Slimme spaartips voor meer financiële vrijheid. Van dagelijkse besparingen tot spaardoelen en de 10% regel.',
        'https://www.finoverzicht.nl/sparen-tips',
        '2024-01-12'
      ),
      createBreadcrumbSchema([
        { name: 'Home', url: 'https://www.finoverzicht.nl/' },
        { name: 'Spaartips', url: 'https://www.finoverzicht.nl/sparen-tips' }
      ])
    ]
  });

  const sparenCategories = [
    {
      icon: Coffee,
      title: "Dagelijkse Uitgaven",
      tips: [
        "Neem lunch mee naar werk in plaats van kopen",
        "Zet koffie thuis in een thermosfles",
        "Drink kraanwater in plaats van flesjes",
        "Koop huismerken in de supermarkt"
      ]
    },
    {
      icon: ShoppingBag,
      title: "Boodschappen",
      tips: [
        "Maak een boodschappenlijst en houd je eraan",
        "Vergelijk prijzen met apps zoals Supermarktscanner",
        "Koop seizoensgebonden producten",
        "Voorkom voedselverspilling met meal prep"
      ]
    },
    {
      icon: Utensils,
      title: "Uit Eten & Entertainment",
      tips: [
        "Kook vaker thuis met vrienden",
        "Zoek naar kortingsbonnen en deals",
        "Kies voor matinee voorstellingen",
        "Organiseer potluck diners"
      ]
    },
    {
      icon: Car,
      title: "Vervoer",
      tips: [
        "Overweeg carpoolen met collega's",
        "Gebruik de fiets voor korte afstanden",
        "Vergelijk autoverzekeringen jaarlijks",
        "Rijd zuinig en bespaar brandstof"
      ]
    },
    {
      icon: Home,
      title: "Wonen",
      tips: [
        "Onderhandel over je huur bij verlenging",
        "Vergelijk energieleveranciers elk jaar",
        "Installeer LED-verlichting",
        "Zet de thermostaat 1 graad lager"
      ]
    },
    {
      icon: Smartphone,
      title: "Abonnementen",
      tips: [
        "Audit al je abonnementen maandelijks",
        "Deel streaming diensten met familie",
        "Overweeg prepaid telefoon",
        "Zeg ongebruikte abonnementen op"
      ]
    }
  ];

  const sparenMilestones = [
    { amount: "€1.000", description: "Eerste noodfonds - voor kleine onverwachte uitgaven" },
    { amount: "€3.000", description: "Basis noodfonds - 1 maand aan vaste lasten" },
    { amount: "€10.000", description: "Uitgebreid noodfonds - 3 maanden buffer" },
    { amount: "€25.000", description: "Financiële zekerheid - ruimte voor grote aankopen" },
    { amount: "€50.000+", description: "Vermogensopbouw - start met investeren" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-green-500/10 via-background to-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <PiggyBank className="w-4 h-4" />
                Sparen & Besparen
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Slimme Spaartips voor{" "}
                <span className="text-primary">Meer Financiële Vrijheid</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Ontdek praktische tips om meer te sparen zonder in te leveren op kwaliteit van leven. 
                Van kleine dagelijkse besparingen tot grote financiële beslissingen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/auth">
                    Start met Sparen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg">
                  <Link to="/budget-beheren">Budget Tips</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Save Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Waarom Sparen Belangrijk Is
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Noodgevallen</h3>
                    <p className="text-muted-foreground">
                      Een financiële buffer beschermt je tegen onverwachte kosten zoals reparaties of medische uitgaven.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Toekomst</h3>
                    <p className="text-muted-foreground">
                      Sparen voor pensioen, een huis of studie geeft je financiële zekerheid voor de lange termijn.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lightbulb className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Vrijheid</h3>
                    <p className="text-muted-foreground">
                      Financiële vrijheid betekent keuzes kunnen maken zonder geldstress - zoals een sabbatical of carrièreswitch.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Saving Tips by Category */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Spaartips per Categorie
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Praktische tips om te besparen op de grootste uitgavenposten
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {sparenCategories.map((category, index) => (
                <Card key={index} className="bg-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <category.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {category.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Savings Milestones */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Spaardoelen: Mijlpalen om Naar te Streven
                </h2>
                <p className="text-xl text-muted-foreground">
                  Werk stap voor stap naar financiële zekerheid
                </p>
              </div>
              <div className="space-y-4">
                {sparenMilestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-6 p-4 bg-card rounded-lg border border-border">
                    <div className="w-24 text-right">
                      <span className="text-2xl font-bold text-primary">{milestone.amount}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground">{milestone.description}</p>
                    </div>
                    <div className="hidden md:block">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Wins Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Quick Wins: Direct €100+ per Maand Besparen
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-primary mb-2">€30-50</div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Energievergelijking</h3>
                    <p className="text-muted-foreground text-sm">
                      Vergelijk jaarlijks je energiecontract en stap over naar een goedkopere aanbieder.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-primary mb-2">€20-40</div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Telefoonabonnement</h3>
                    <p className="text-muted-foreground text-sm">
                      Overweeg sim-only of check of je huidige bundel past bij je gebruik.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-primary mb-2">€15-30</div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Streaming Bundelen</h3>
                    <p className="text-muted-foreground text-sm">
                      Deel Netflix, Spotify of Disney+ met familie of vrienden.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-primary mb-2">€50-100</div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Verzekeringen</h3>
                    <p className="text-muted-foreground text-sm">
                      Vergelijk autoverzekering, zorgverzekering en inboedelverzekering jaarlijks.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Pay Yourself First */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <PiggyBank className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                De Gouden Regel: Betaal Jezelf Eerst
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Zet direct na je salaris een vast bedrag opzij. Niet wat overblijft, maar wat je 
                vooraf bepaalt. Automatiseer dit via een automatische overschrijving naar je spaarrekening.
              </p>
              <div className="bg-card border border-border rounded-lg p-8 max-w-xl mx-auto">
                <h3 className="text-lg font-semibold text-foreground mb-4">Tip: De 10% Regel</h3>
                <p className="text-muted-foreground mb-4">
                  Begin met minimaal 10% van je netto inkomen te sparen. Verdien je €2.500 netto? 
                  Zet dan €250 per maand automatisch opzij. Na een jaar heb je al €3.000 gespaard!
                </p>
                <p className="text-sm text-muted-foreground">
                  Leer meer over{" "}
                  <Link to="/uitgaven-beheren" className="text-primary hover:underline">uitgaven beheren</Link>{" "}
                  om je spaarruimte te vergroten.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Begin Vandaag met Slim Sparen
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Met FinOverzicht houd je moeiteloos bij hoeveel je spaart en waar je kunt besparen.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link to="/auth">
                Start Gratis
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

export default SparenTips;
