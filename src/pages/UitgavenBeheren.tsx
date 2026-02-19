import { Link } from "react-router-dom";
import { useSEO, createArticleSchema, createBreadcrumbSchema } from '@/hooks/useSEO';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { 
  CreditCard, 
  TrendingDown, 
  PieChart, 
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Target,
  BarChart3,
  ShoppingCart,
  Home,
  Car,
  Utensils,
  Smartphone
} from "lucide-react";

const UitgavenBeheren = () => {
  useSEO({
    title: 'Uitgaven Beheren - Grip op je Geld | FinOverzicht',
    description: 'Leer hoe je je uitgaven effectief beheert. Van uitgaven categoriseren tot slim besparen. Krijg controle over waar je geld naartoe gaat.',
    canonical: 'https://www.finoverzicht.nl/uitgaven-beheren',
    jsonLd: [
      createArticleSchema(
        'Uitgaven Beheren - Krijg Grip op je Geld',
        'Leer hoe je je uitgaven effectief beheert. Van uitgaven categoriseren tot slim besparen. Krijg controle over waar je geld naartoe gaat.',
        'https://www.finoverzicht.nl/uitgaven-beheren',
        '2025-01-10'
      ),
      createBreadcrumbSchema([
        { name: 'Home', url: 'https://www.finoverzicht.nl/' },
        { name: 'Uitgaven Beheren', url: 'https://www.finoverzicht.nl/uitgaven-beheren' }
      ])
    ]
  });

  const uitgavenCategories = [
    {
      icon: Home,
      title: "Wonen",
      percentage: "30-35%",
      examples: ["Huur/hypotheek", "Energie", "Water", "Gemeentebelastingen"],
      tip: "Dit zou je grootste uitgavenpost moeten zijn, maar niet meer dan 35% van je inkomen."
    },
    {
      icon: ShoppingCart,
      title: "Boodschappen",
      percentage: "10-15%",
      examples: ["Supermarkt", "Drogisterij", "Huishoudelijke producten"],
      tip: "Maak een weekmenu en boodschappenlijst om voedselverspilling te voorkomen."
    },
    {
      icon: Car,
      title: "Vervoer",
      percentage: "10-15%",
      examples: ["Brandstof", "OV", "Autoverzekering", "Onderhoud"],
      tip: "Overweeg carpoolen of fietsen voor korte afstanden."
    },
    {
      icon: Utensils,
      title: "Eten & Drinken",
      percentage: "5-10%",
      examples: ["Uit eten", "Bezorging", "Koffie buitenshuis"],
      tip: "Hier zit vaak de meeste besparingspotentieel - €3 koffie per dag is €90/maand!"
    },
    {
      icon: Smartphone,
      title: "Abonnementen",
      percentage: "5-8%",
      examples: ["Telefoon", "Streaming", "Sportschool", "Software"],
      tip: "Audit je abonnementen maandelijks - veel mensen betalen voor diensten die ze niet gebruiken."
    },
    {
      icon: CreditCard,
      title: "Persoonlijk",
      percentage: "5-10%",
      examples: ["Kleding", "Hobby's", "Entertainment", "Cadeaus"],
      tip: "Gebruik de 24-uur regel: wacht een dag voor aankopen boven €50."
    }
  ];

  const uitgavenTips = [
    {
      title: "Track elke uitgave",
      description: "Houd minimaal een maand elke uitgave bij, ook de kleinste. Je zult verbaasd zijn waar je geld naartoe gaat.",
      icon: BarChart3
    },
    {
      title: "Categoriseer slim",
      description: "Verdeel je uitgaven in vaste lasten (huur, verzekeringen) en variabele uitgaven (boodschappen, uit eten). Focus op de variabele kosten.",
      icon: PieChart
    },
    {
      title: "Stel limieten in",
      description: "Bepaal vooraf hoeveel je per categorie wilt uitgeven. Dit voorkomt impulsaankopen en houdt je op koers.",
      icon: Target
    },
    {
      title: "Review wekelijks",
      description: "Bekijk elke week je uitgaven. Zo vang je overschrijdingen vroeg op en kun je bijsturen.",
      icon: TrendingDown
    }
  ];

  const veelgemaakteFouten = [
    {
      fout: "Kleine uitgaven negeren",
      gevolg: "Die €3 koffie per dag is €1.095 per jaar",
      oplossing: "Track ook de kleine uitgaven - ze tellen op!"
    },
    {
      fout: "Geen onderscheid maken",
      gevolg: "Je weet niet waar je kunt besparen",
      oplossing: "Categoriseer elke uitgave voor inzicht"
    },
    {
      fout: "Impulsaankopen",
      gevolg: "Budget overschrijdingen elke maand",
      oplossing: "Wacht 24 uur bij aankopen boven €50"
    },
    {
      fout: "Geen buffer voor variabele kosten",
      gevolg: "Stress bij onverwachte uitgaven",
      oplossing: "Reserveer 10% voor flexibele uitgaven"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-rose-500/10 via-background to-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-rose-500/10 text-rose-600 dark:text-rose-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <CreditCard className="w-4 h-4" />
                Uitgaven Beheren
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Krijg Controle over{" "}
                <span className="text-primary">je Uitgaven</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Weet je waar je geld naartoe gaat? Leer hoe je je uitgaven inzichtelijk maakt, 
                categoriseert en onder controle houdt. Van vaste lasten tot dagelijkse aankopen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/auth">
                    Start met Uitgaven Bijhouden
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg">
                  <Link to="/geld-besparen">Bespaartips Bekijken</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Track Expenses */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Waarom Uitgaven Bijhouden?
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
                <p className="text-lg leading-relaxed">
                  De meeste mensen onderschatten hun uitgaven met 20-30%. Door je uitgaven 
                  actief bij te houden, krijg je inzicht in waar je geld naartoe gaat en 
                  ontdek je waar je kunt besparen. Dit is de eerste stap naar{" "}
                  <Link to="/budget-beheren" className="text-primary hover:underline">effectief budgetteren</Link>.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lightbulb className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Inzicht</h3>
                    <p className="text-muted-foreground">
                      Zie precies waar je geld naartoe gaat en ontdek verborgen uitgaven.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Controle</h3>
                    <p className="text-muted-foreground">
                      Neem bewuste beslissingen over je geld in plaats van het te laten gebeuren.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingDown className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Besparing</h3>
                    <p className="text-muted-foreground">
                      Identificeer onnodige uitgaven en bespaar gemiddeld €200-400 per maand.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Uitgaven Categorieën en Richtlijnen
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Een gezonde verdeling van je uitgaven over verschillende categorieën
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {uitgavenCategories.map((category, index) => (
                <Card key={index} className="bg-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <category.icon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                      </div>
                      <span className="text-primary font-bold">{category.percentage}</span>
                    </div>
                    <ul className="space-y-1 mb-4">
                      {category.examples.map((example, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                          {example}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-primary/5 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">Tip:</span> {category.tip}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Tips voor Effectief Uitgavenbeheer
                </h2>
                <p className="text-xl text-muted-foreground">
                  Bewezen strategieën om je uitgaven onder controle te houden
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {uitgavenTips.map((tip, index) => (
                  <Card key={index} className="bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <tip.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">{tip.title}</h3>
                          <p className="text-muted-foreground text-sm">{tip.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="py-20 bg-gradient-to-br from-destructive/5 to-orange-500/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Veelgemaakte Fouten bij Uitgavenbeheer
                </h2>
              </div>
              <div className="space-y-4">
                {veelgemaakteFouten.map((item, index) => (
                  <Card key={index} className="bg-card border-l-4 border-l-destructive/50">
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <span className="text-xs text-destructive font-medium">FOUT</span>
                          <h3 className="text-foreground font-semibold">{item.fout}</h3>
                        </div>
                        <div>
                          <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">GEVOLG</span>
                          <p className="text-muted-foreground text-sm">{item.gevolg}</p>
                        </div>
                        <div>
                          <span className="text-xs text-primary font-medium">OPLOSSING</span>
                          <p className="text-foreground text-sm font-medium">{item.oplossing}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 50/30/20 Rule */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <PieChart className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  De 50/30/20 Regel voor Uitgaven
                </h2>
                <p className="text-xl text-muted-foreground">
                  Een eenvoudige richtlijn voor het verdelen van je inkomen
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-card text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-red-500 mb-2">50%</div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Noodzakelijk</h3>
                    <p className="text-sm text-muted-foreground">
                      Huur, energie, boodschappen, verzekeringen, vervoer naar werk
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-yellow-500 mb-2">30%</div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Wensen</h3>
                    <p className="text-sm text-muted-foreground">
                      Uit eten, streaming, hobby's, kleding, entertainment
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-green-500 mb-2">20%</div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Sparen</h3>
                    <p className="text-sm text-muted-foreground">
                      Noodfonds, pensioen, beleggingen, schulden aflossen
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="bg-muted/50 rounded-lg p-6">
                <p className="text-muted-foreground text-center">
                  💡 Lees meer over{" "}
                  <Link to="/budget-beheren" className="text-primary hover:underline">budgetteren met de 50/30/20 regel</Link>{" "}
                  of ontdek{" "}
                  <Link to="/sparen-tips" className="text-primary hover:underline">spaartips</Link>{" "}
                  om je 20% te maximaliseren.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Pages */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Gerelateerde Onderwerpen
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link to="/vaste-lasten-overzicht" className="block group">
                  <Card className="bg-card h-full hover:shadow-lg transition-all group-hover:border-primary">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        Vaste Lasten Overzicht
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Krijg inzicht in je maandelijkse vaste kosten en waar je kunt optimaliseren.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <Link to="/geld-besparen" className="block group">
                  <Card className="bg-card h-full hover:shadow-lg transition-all group-hover:border-primary">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        Geld Besparen
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Praktische tips om honderden euro's per maand te besparen.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <Link to="/huishoudboekje" className="block group">
                  <Card className="bg-card h-full hover:shadow-lg transition-all group-hover:border-primary">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        Huishoudboekje
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Begin met een digitaal huishoudboekje om al je financiën bij te houden.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <CreditCard className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Begin Vandaag met Uitgaven Bijhouden
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Met FinOverzicht categoriseer je je uitgaven automatisch en krijg je direct inzicht 
              in waar je geld naartoe gaat.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link to="/auth">
                Gratis Beginnen
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

export default UitgavenBeheren;