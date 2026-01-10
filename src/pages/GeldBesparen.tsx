import { Link } from "react-router-dom";
import { useSEO, createArticleSchema, createBreadcrumbSchema } from '@/hooks/useSEO';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { 
  Percent, 
  ShoppingCart, 
  Zap, 
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Home,
  Car,
  Utensils,
  Shirt,
  Smartphone,
  Film
} from "lucide-react";

const GeldBesparen = () => {
  useSEO({
    title: 'Geld Besparen - Tips om Honderden Euro\'s te Besparen | FinOverzicht',
    description: 'Praktische bespaartips die direct resultaat opleveren. Bespaar €400-900 per maand met slimme keuzes. Ontdek tips per categorie.',
    canonical: 'https://www.finoverzicht.nl/geld-besparen',
    jsonLd: [
      createArticleSchema(
        'Geld Besparen - Praktische Tips om Honderden Euro\'s te Besparen',
        'Praktische bespaartips die direct resultaat opleveren. Bespaar €400-900 per maand met slimme keuzes.',
        'https://www.finoverzicht.nl/geld-besparen',
        '2024-01-15'
      ),
      createBreadcrumbSchema([
        { name: 'Home', url: 'https://www.finoverzicht.nl/' },
        { name: 'Geld Besparen', url: 'https://www.finoverzicht.nl/geld-besparen' }
      ])
    ]
  });

  const besparingCategories = [
    {
      icon: Home,
      title: "Wonen",
      monthlyPotential: "€50-200",
      tips: [
        { tip: "Vergelijk energieleveranciers jaarlijks", saving: "€30-50/maand" },
        { tip: "Zet thermostaat 1 graad lager", saving: "€10-20/maand" },
        { tip: "Gebruik LED-lampen", saving: "€5-10/maand" },
        { tip: "Korter douchen (5 min)", saving: "€10-15/maand" }
      ]
    },
    {
      icon: ShoppingCart,
      title: "Boodschappen",
      monthlyPotential: "€100-200",
      tips: [
        { tip: "Maak een weekmenu en boodschappenlijst", saving: "€30-50/maand" },
        { tip: "Koop huismerken i.p.v. A-merken", saving: "€40-60/maand" },
        { tip: "Gebruik aanbiedingen apps", saving: "€20-30/maand" },
        { tip: "Voorkom voedselverspilling", saving: "€20-30/maand" }
      ]
    },
    {
      icon: Car,
      title: "Vervoer",
      monthlyPotential: "€50-150",
      tips: [
        { tip: "Carpoolen naar werk", saving: "€30-50/maand" },
        { tip: "Zuinig rijden", saving: "€20-30/maand" },
        { tip: "Vergelijk autoverzekeringen", saving: "€15-30/maand" },
        { tip: "Fiets korte afstanden", saving: "€10-20/maand" }
      ]
    },
    {
      icon: Utensils,
      title: "Eten & Drinken",
      monthlyPotential: "€100-300",
      tips: [
        { tip: "Kook thuis i.p.v. bezorgen", saving: "€50-100/maand" },
        { tip: "Neem lunch mee naar werk", saving: "€60-100/maand" },
        { tip: "Drink water i.p.v. frisdrank", saving: "€15-20/maand" },
        { tip: "Maak eigen koffie", saving: "€30-60/maand" }
      ]
    },
    {
      icon: Smartphone,
      title: "Abonnementen",
      monthlyPotential: "€30-80",
      tips: [
        { tip: "Audit alle abonnementen maandelijks", saving: "€10-30/maand" },
        { tip: "Deel streaming met familie", saving: "€10-20/maand" },
        { tip: "Overweeg sim-only telefoon", saving: "€10-20/maand" },
        { tip: "Zeg ongebruikte apps op", saving: "€5-15/maand" }
      ]
    },
    {
      icon: Film,
      title: "Entertainment",
      monthlyPotential: "€50-150",
      tips: [
        { tip: "Gratis evenementen bezoeken", saving: "€20-40/maand" },
        { tip: "Bibliotheek i.p.v. boeken kopen", saving: "€10-20/maand" },
        { tip: "Matinee voorstellingen", saving: "€10-20/maand" },
        { tip: "Thuis entertainment organiseren", saving: "€20-50/maand" }
      ]
    }
  ];

  const quickWins = [
    { action: "Zeg 3 ongebruikte abonnementen op", saving: "€30-50/maand", difficulty: "Makkelijk" },
    { action: "Stap over naar goedkopere energie", saving: "€30-60/maand", difficulty: "Makkelijk" },
    { action: "Neem 3x per week lunch mee", saving: "€40-60/maand", difficulty: "Medium" },
    { action: "Deel Netflix met familie", saving: "€10-15/maand", difficulty: "Makkelijk" },
    { action: "Drink kraanwater op werk", saving: "€20-30/maand", difficulty: "Makkelijk" },
    { action: "Kook 2x extra per week thuis", saving: "€40-80/maand", difficulty: "Medium" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-emerald-500/10 via-background to-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Percent className="w-4 h-4" />
                Geld Besparen
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Bespaar Honderden Euro's{" "}
                <span className="text-primary">Per Maand</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Praktische bespaartips die direct resultaat opleveren. Geen extreme maatregelen, 
                wel slimme keuzes die je portemonnee spekken.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/auth">
                    Start met Besparen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg">
                  <Link to="/sparen-tips">Spaartips</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Total Savings Potential */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Totale Besparingspotentieel
              </h2>
              <div className="text-5xl md:text-6xl font-bold text-primary-foreground mb-2">
                €400-900
              </div>
              <p className="text-xl text-primary-foreground/80">
                per maand als je alle tips toepast
              </p>
            </div>
          </div>
        </section>

        {/* Quick Wins */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Quick Wins: Direct Resultaat
                </h2>
                <p className="text-xl text-muted-foreground">
                  Begin met deze eenvoudige acties voor snelle besparingen
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {quickWins.map((win, index) => (
                  <Card key={index} className="bg-card hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-foreground">{win.action}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${
                          win.difficulty === 'Makkelijk' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {win.difficulty}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-primary">{win.saving}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Savings by Category */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Besparen per Categorie
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Gedetailleerde tips met concrete besparingsbedragen
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {besparingCategories.map((category, index) => (
                <Card key={index} className="bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <category.icon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                      </div>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-3 mb-4 text-center">
                      <span className="text-sm text-muted-foreground">Potentieel:</span>
                      <span className="text-lg font-bold text-primary ml-2">{category.monthlyPotential}</span>
                    </div>
                    <ul className="space-y-3">
                      {category.tips.map((item, tipIndex) => (
                        <li key={tipIndex} className="flex justify-between items-start text-sm">
                          <span className="text-muted-foreground flex-1">{item.tip}</span>
                          <span className="text-primary font-medium ml-2 whitespace-nowrap">{item.saving}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mindset Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Lightbulb className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  De Bespaar-Mindset
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">💡 Denk in Uurloon</h3>
                    <p className="text-muted-foreground mb-4">
                      Verdien je €20 per uur? Dan kost die €100 schoenen 5 uur werk. 
                      Is het dat waard?
                    </p>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">
                        Formule: Prijs ÷ Uurloon = Werkuren
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">⏰ De 24-Uur Regel</h3>
                    <p className="text-muted-foreground mb-4">
                      Wacht 24 uur bij aankopen boven €50. Impulsaankopen verminder je 
                      zo met 80%.
                    </p>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">
                        Boven €100? Wacht een week!
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">🎯 Kosten per Gebruik</h3>
                    <p className="text-muted-foreground mb-4">
                      Een jas van €200 die je 200x draagt kost €1 per keer. 
                      Kwaliteit loont vaak.
                    </p>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">
                        Formule: Prijs ÷ Verwacht gebruik = Kosten per gebruik
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">📊 Track Alles</h3>
                    <p className="text-muted-foreground mb-4">
                      Wat je meet, kun je verbeteren. Houd al je uitgaven bij en 
                      ontdek waar je geld lekt.
                    </p>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">
                        Gebruik{" "}
                        <Link to="/huishoudboekje" className="text-primary hover:underline">FinOverzicht</Link>{" "}
                        - het is gratis! Bekijk ook onze{" "}
                        <Link to="/uitgaven-beheren" className="text-primary hover:underline">uitgaven tips</Link>.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Yearly Impact */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                Het Jaarlijkse Effect
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-primary mb-2">€1.200</div>
                    <p className="text-muted-foreground">per jaar bij €100/maand besparen</p>
                    <p className="text-sm text-foreground mt-2">= Een weekje vakantie</p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-primary mb-2">€3.600</div>
                    <p className="text-muted-foreground">per jaar bij €300/maand besparen</p>
                    <p className="text-sm text-foreground mt-2">= Een goede tweedehands auto</p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-primary mb-2">€6.000</div>
                    <p className="text-muted-foreground">per jaar bij €500/maand besparen</p>
                    <p className="text-sm text-foreground mt-2">= Begin van je huisfonds</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <Percent className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Begin Vandaag met Besparen
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Met FinOverzicht zie je precies waar je geld naartoe gaat en waar je kunt besparen.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link to="/auth">
                Gratis Starten
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

export default GeldBesparen;
