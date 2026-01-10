import { Link } from "react-router-dom";
import { useSEO, createArticleSchema, createBreadcrumbSchema } from '@/hooks/useSEO';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  ArrowRight,
  CheckCircle,
  Calendar,
  BarChart3,
  FileText,
  PieChart,
  Target
} from "lucide-react";

const Huishoudboekje = () => {
  useSEO({
    title: 'Digitaal Huishoudboekje - Gratis Online Huishoudboekje | FinOverzicht',
    description: 'Het moderne digitale huishoudboekje. Houd je inkomsten en uitgaven bij, categoriseer transacties en krijg inzicht in je financiën. 100% gratis.',
    canonical: 'https://www.finoverzicht.nl/huishoudboekje',
    jsonLd: [
      createArticleSchema(
        'Het Moderne Digitale Huishoudboekje',
        'Houd je inkomsten en uitgaven bij, categoriseer transacties en krijg inzicht in je financiën met FinOverzicht.',
        'https://www.finoverzicht.nl/huishoudboekje',
        '2024-01-10'
      ),
      createBreadcrumbSchema([
        { name: 'Home', url: 'https://www.finoverzicht.nl/' },
        { name: 'Huishoudboekje', url: 'https://www.finoverzicht.nl/huishoudboekje' }
      ])
    ]
  });

  const features = [
    {
      icon: FileText,
      title: "Inkomsten & Uitgaven",
      description: "Houd al je financiële transacties bij op één centrale plek."
    },
    {
      icon: Users,
      title: "Gezinsbeheer",
      description: "Beheer de financiën van het hele gezin met individuele en gedeelde uitgaven."
    },
    {
      icon: PieChart,
      title: "Categorieën",
      description: "Organiseer uitgaven in categorieën voor beter inzicht."
    },
    {
      icon: Calendar,
      title: "Terugkerende Transacties",
      description: "Automatiseer vaste lasten en inkomsten."
    },
    {
      icon: BarChart3,
      title: "Overzichten",
      description: "Bekijk grafieken en statistieken van je financiële situatie."
    },
    {
      icon: Target,
      title: "Doelen Stellen",
      description: "Stel spaardoelen en volg je voortgang."
    }
  ];

  const compareItems = [
    { feature: "Kosten", paper: "Gratis", excel: "Microsoft 365 abonnement", app: "Gratis" },
    { feature: "Automatische berekeningen", paper: "Nee", excel: "Ja", app: "Ja" },
    { feature: "Overal toegankelijk", paper: "Nee", excel: "Met cloud", app: "Ja, op elk apparaat" },
    { feature: "Grafieken & inzichten", paper: "Nee", excel: "Handmatig maken", app: "Automatisch" },
    { feature: "Gezinsbeheer", paper: "Lastig", excel: "Complex", app: "Ingebouwd" },
    { feature: "Back-ups", paper: "Nee", excel: "Handmatig", app: "Automatisch" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-500/10 via-background to-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                Huishoudboekje
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Het Moderne{" "}
                <span className="text-primary">Digitale Huishoudboekje</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Vergeet pen en papier. Met FinOverzicht heb je een compleet digitaal huishoudboekje 
                dat automatisch berekent, categoriseert en inzicht geeft in je financiën.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/auth">
                    Gratis Huishoudboekje Starten
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg">
                  <Link to="/functies">Alle Functies</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* What is Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Wat is een Huishoudboekje?
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="text-lg leading-relaxed mb-6">
                  Een huishoudboekje is een overzicht van al je inkomsten en uitgaven. Het helpt je om:
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="bg-card">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-4">Inzicht krijgen</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Waar gaat je geld naartoe?</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Hoeveel geef je uit per categorie?</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Wat zijn je vaste lasten?</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="bg-card">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-4">Controle houden</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Blijf binnen je budget</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Voorkom verrassingen</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>Bereik financiële doelen</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                <p className="text-lg leading-relaxed">
                  Vroeger deed men dit met pen en papier, later met Excel. Nu is er FinOverzicht: 
                  een gratis, gebruiksvriendelijke app die alles automatisch doet. Ontdek ook onze tips voor{" "}
                  <Link to="/budget-beheren" className="text-primary hover:underline">budget beheren</Link>,{" "}
                  <Link to="/uitgaven-beheren" className="text-primary hover:underline">uitgaven beheren</Link>{" "}
                  en{" "}
                  <Link to="/sparen-tips" className="text-primary hover:underline">slim sparen</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Functies van ons Huishoudboekje
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Alles wat je nodig hebt om je huishoudfinanciën te beheren
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <Card key={index} className="bg-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Papier vs Excel vs FinOverzicht
                </h2>
                <p className="text-xl text-muted-foreground">
                  Waarom een digitaal huishoudboekje de beste keuze is
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-semibold text-foreground">Functie</th>
                      <th className="text-center p-4 font-semibold text-foreground">📝 Papier</th>
                      <th className="text-center p-4 font-semibold text-foreground">📊 Excel</th>
                      <th className="text-center p-4 font-semibold text-primary">✨ FinOverzicht</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compareItems.map((item, index) => (
                      <tr key={index} className="border-b border-border">
                        <td className="p-4 text-foreground font-medium">{item.feature}</td>
                        <td className="p-4 text-center text-muted-foreground">{item.paper}</td>
                        <td className="p-4 text-center text-muted-foreground">{item.excel}</td>
                        <td className="p-4 text-center text-primary font-medium">{item.app}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* For Whom Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
                Voor Wie is een Huishoudboekje?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Gezinnen</h3>
                    <p className="text-muted-foreground">
                      Beheer de financiën van het hele gezin. Verdeel uitgaven per gezinslid 
                      en houd gedeelde kosten bij zoals boodschappen en huur.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">👤</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Alleenstaanden</h3>
                    <p className="text-muted-foreground">
                      Krijg grip op je eigen financiën. Perfect voor starters die voor 
                      het eerst op zichzelf wonen.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">👫</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Stellen</h3>
                    <p className="text-muted-foreground">
                      Beheer samen jullie financiën met gedeelde en individuele uitgaven. 
                      Transparantie over geld in je relatie.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">🎓</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Studenten</h3>
                    <p className="text-muted-foreground">
                      Leer omgaan met je studiefinanciering en bijbaantjes. 
                      Begin vroeg met goede financiële gewoontes.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How to Start Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
                Hoe Begin je met een Huishoudboekje?
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Maak een gratis account</h3>
                    <p className="text-muted-foreground">
                      Registreer in 30 seconden met je e-mailadres. Geen creditcard nodig, 
                      geen verplichtingen.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Voeg je inkomsten toe</h3>
                    <p className="text-muted-foreground">
                      Begin met je maandelijkse inkomen: salaris, toeslagen, bijverdiensten. 
                      Stel terugkerende inkomsten in voor automatische registratie.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Registreer je uitgaven</h3>
                    <p className="text-muted-foreground">
                      Voeg vaste lasten toe (huur, verzekeringen) en variabele uitgaven 
                      (boodschappen, uit eten). Categoriseer voor overzicht.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Bekijk je overzicht</h3>
                    <p className="text-muted-foreground">
                      Je dashboard toont direct hoeveel je overhoudt, waar je geld naartoe gaat, 
                      en waar je kunt besparen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <BookOpen className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Start je Digitale Huishoudboekje
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Sluit je aan bij duizenden Nederlanders die hun financiën beheren met FinOverzicht.
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

export default Huishoudboekje;
