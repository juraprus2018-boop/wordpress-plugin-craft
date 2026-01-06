import { Link } from "react-router-dom";
import { useSEO, createArticleSchema, createBreadcrumbSchema } from '@/hooks/useSEO';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { 
  TrendingDown, 
  Target, 
  Calculator, 
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Phone,
  FileText,
  Scale
} from "lucide-react";

const SchuldenAflossen = () => {
  useSEO({
    title: 'Schulden Aflossen - Effectieve Strategieën | FinOverzicht',
    description: 'Van schulden naar financiële vrijheid. Leer over de sneeuwbal- en avalanchemethode om effectief schulden af te lossen.',
    canonical: 'https://www.finoverzicht.nl/schulden-aflossen',
    jsonLd: [
      createArticleSchema(
        'Schulden Aflossen - Effectieve Strategieën',
        'Van schulden naar financiële vrijheid. Leer over de sneeuwbal- en avalanchemethode om effectief schulden af te lossen.',
        'https://www.finoverzicht.nl/schulden-aflossen',
        '2024-01-20'
      ),
      createBreadcrumbSchema([
        { name: 'Home', url: 'https://www.finoverzicht.nl/' },
        { name: 'Schulden Aflossen', url: 'https://www.finoverzicht.nl/schulden-aflossen' }
      ])
    ]
  });

  const aflosMethods = [
    {
      title: "Sneeuwbalmethode",
      description: "Begin met de kleinste schuld. Na aflossing, gebruik dat bedrag voor de volgende. Motiverend door snelle resultaten.",
      pros: ["Snelle eerste overwinningen", "Psychologisch motiverend", "Eenvoudig te volgen"],
      cons: ["Niet altijd de goedkoopste optie", "Hogere totale rente mogelijk"]
    },
    {
      title: "Avalanchemethode",
      description: "Begin met de schuld met de hoogste rente. Financieel het meest efficiënt.",
      pros: ["Laagste totale kosten", "Snelste schuldvrij", "Wiskundig optimaal"],
      cons: ["Langere tijd tot eerste 'win'", "Kan demotiverend zijn"]
    }
  ];

  const schuldenTips = [
    {
      icon: FileText,
      title: "Breng alles in kaart",
      description: "Maak een compleet overzicht van alle schulden, rentepercetages en minimale aflossingen."
    },
    {
      icon: Phone,
      title: "Neem contact op",
      description: "Bel schuldeisers om te onderhandelen over lagere rente of betalingsregelingen."
    },
    {
      icon: Calculator,
      title: "Budgetteer extra aflossing",
      description: "Bepaal hoeveel je bovenop de minimale aflossing kunt betalen en houd je hieraan."
    },
    {
      icon: Target,
      title: "Stel mijlpalen",
      description: "Vier kleine overwinningen om gemotiveerd te blijven tijdens het aflossen."
    }
  ];

  const warnings = [
    "Nooit nieuwe schulden maken tijdens het aflossen",
    "Altijd minimaal de minimale aflossing betalen",
    "Bouw eerst een klein noodfonds van €1.000",
    "Zoek hulp bij problematische schulden"
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-orange-500/10 via-background to-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <TrendingDown className="w-4 h-4" />
                Schulden Aflossen
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Van Schulden naar{" "}
                <span className="text-primary">Financiële Vrijheid</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Leer effectieve strategieën om schulden af te lossen. Van sneeuwbal tot avalanche - 
                ontdek welke methode het beste bij jou past.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/auth">
                    Start met Schulden Bijhouden
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

        {/* Understanding Debt Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Schulden Begrijpen
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-card border-red-200 dark:border-red-900">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      "Slechte" Schulden
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Creditcard schulden (hoge rente)</li>
                      <li>• Persoonlijke leningen voor consumptie</li>
                      <li>• Rood staan op betaalrekening</li>
                      <li>• Kopen op afbetaling (BKR)</li>
                      <li>• Payday loans</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-card border-green-200 dark:border-green-900">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      "Goede" Schulden
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Hypotheek (waarde opbouw)</li>
                      <li>• Studielening (investering in jezelf)</li>
                      <li>• Zakelijke lening (groei business)</li>
                      <li>• Lening voor waardevolle activa</li>
                      <li>• Lage rente, lange looptijd</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Methods Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Aflosmethodes Vergelijken
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Twee bewezen strategieën om schulden efficiënt af te lossen
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {aflosMethods.map((method, index) => (
                <Card key={index} className="bg-card">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4">{method.title}</h3>
                    <p className="text-muted-foreground mb-6">{method.description}</p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Voordelen:</h4>
                        <ul className="space-y-1">
                          {method.pros.map((pro, i) => (
                            <li key={i} className="flex items-center gap-2 text-muted-foreground text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Nadelen:</h4>
                        <ul className="space-y-1">
                          {method.cons.map((con, i) => (
                            <li key={i} className="flex items-center gap-2 text-muted-foreground text-sm">
                              <AlertTriangle className="w-4 h-4 text-orange-500" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Example Calculation */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Calculator className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Rekenvoorbeeld
                </h2>
                <p className="text-xl text-muted-foreground">
                  Stel je hebt de volgende schulden:
                </p>
              </div>
              <div className="bg-card rounded-lg border border-border overflow-hidden mb-8">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-4 text-left font-semibold text-foreground">Schuld</th>
                      <th className="p-4 text-right font-semibold text-foreground">Bedrag</th>
                      <th className="p-4 text-right font-semibold text-foreground">Rente</th>
                      <th className="p-4 text-right font-semibold text-foreground">Minimum</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="p-4 text-foreground">Creditcard</td>
                      <td className="p-4 text-right text-foreground">€2.000</td>
                      <td className="p-4 text-right text-red-500">18%</td>
                      <td className="p-4 text-right text-muted-foreground">€50</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-4 text-foreground">Persoonlijke lening</td>
                      <td className="p-4 text-right text-foreground">€5.000</td>
                      <td className="p-4 text-right text-orange-500">8%</td>
                      <td className="p-4 text-right text-muted-foreground">€150</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-4 text-foreground">Studielening</td>
                      <td className="p-4 text-right text-foreground">€15.000</td>
                      <td className="p-4 text-right text-green-500">0,5%</td>
                      <td className="p-4 text-right text-muted-foreground">€100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">❄️ Sneeuwbal:</h3>
                    <p className="text-muted-foreground">
                      Focus eerst op de creditcard (€2.000). Na aflossing, pak de €50 + extra 
                      om de persoonlijke lening aan te pakken.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">🏔️ Avalanche:</h3>
                    <p className="text-muted-foreground">
                      Zelfde volgorde in dit geval! De creditcard heeft de hoogste rente (18%) 
                      én is de kleinste schuld.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Tips voor Succesvol Aflossen
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {schuldenTips.map((tip, index) => (
                <Card key={index} className="bg-card">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <tip.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{tip.title}</h3>
                    <p className="text-muted-foreground text-sm">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Warnings Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                  <h2 className="text-2xl font-bold text-foreground">Belangrijke Waarschuwingen</h2>
                </div>
                <ul className="space-y-4">
                  {warnings.map((warning, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                      <span className="text-foreground">{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Scale className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Hulp bij Problematische Schulden
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Kun je de minimale aflossingen niet meer betalen? Schaam je niet en zoek hulp.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-card">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-foreground mb-2">Gemeente</h3>
                    <p className="text-muted-foreground text-sm">
                      Vraag naar schuldhulpverlening bij je gemeente
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-foreground mb-2">Nibud</h3>
                    <p className="text-muted-foreground text-sm">
                      Gratis informatie en tools op nibud.nl
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-foreground mb-2">Geldloket</h3>
                    <p className="text-muted-foreground text-sm">
                      Bel gratis: 0800-8115 voor advies
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
              Houd je Schulden Bij met FinOverzicht
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Registreer al je schulden, volg je voortgang en word stap voor stap schuldenvrij.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link to="/auth">
                Begin Gratis
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

export default SchuldenAflossen;
