import { Link } from "react-router-dom";
import { useSEO } from '@/hooks/useSEO';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { 
  Receipt, 
  Home, 
  Zap, 
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Shield,
  Wifi,
  Car,
  Heart,
  Smartphone,
  Droplets
} from "lucide-react";

const VasteLastenOverzicht = () => {
  useSEO({
    title: 'Vaste Lasten Overzicht - Alle Kosten op een Rij | FinOverzicht',
    description: 'Compleet overzicht van vaste lasten in Nederland. Ontdek welke kosten normaal zijn en waar je kunt besparen op huur, energie en verzekeringen.',
    canonical: 'https://www.finoverzicht.nl/vaste-lasten-overzicht'
  });

  const vasteLasten = [
    {
      icon: Home,
      category: "Wonen",
      items: [
        { name: "Huur of hypotheek", typical: "€800-1.500", priority: "Essentieel" },
        { name: "Servicekosten/VvE", typical: "€50-200", priority: "Essentieel" },
        { name: "Gemeentelijke belastingen", typical: "€30-80", priority: "Essentieel" },
        { name: "Waterschapsbelasting", typical: "€25-50", priority: "Essentieel" }
      ]
    },
    {
      icon: Zap,
      category: "Energie",
      items: [
        { name: "Elektriciteit", typical: "€80-150", priority: "Essentieel" },
        { name: "Gas", typical: "€100-200", priority: "Essentieel" },
        { name: "Water", typical: "€20-40", priority: "Essentieel" }
      ]
    },
    {
      icon: Shield,
      category: "Verzekeringen",
      items: [
        { name: "Zorgverzekering", typical: "€120-150", priority: "Verplicht" },
        { name: "Aansprakelijkheidsverzekering", typical: "€5-10", priority: "Aangeraden" },
        { name: "Inboedelverzekering", typical: "€10-25", priority: "Aangeraden" },
        { name: "Opstalverzekering", typical: "€15-40", priority: "Bij koophuis" }
      ]
    },
    {
      icon: Wifi,
      category: "Telecom",
      items: [
        { name: "Internet", typical: "€30-60", priority: "Standaard" },
        { name: "Mobiele telefoon", typical: "€15-40", priority: "Standaard" },
        { name: "TV-abonnement", typical: "€0-30", priority: "Optioneel" }
      ]
    },
    {
      icon: Car,
      category: "Vervoer",
      items: [
        { name: "Autoverzekering", typical: "€40-120", priority: "Bij auto" },
        { name: "Wegenbelasting", typical: "€20-80", priority: "Bij auto" },
        { name: "OV-abonnement", typical: "€100-350", priority: "Optioneel" },
        { name: "Parkeervergunning", typical: "€20-150", priority: "Locatie" }
      ]
    },
    {
      icon: Smartphone,
      category: "Abonnementen",
      items: [
        { name: "Streaming (Netflix/Spotify)", typical: "€10-30", priority: "Optioneel" },
        { name: "Sportschool", typical: "€20-50", priority: "Optioneel" },
        { name: "Krant/tijdschrift", typical: "€10-30", priority: "Optioneel" },
        { name: "Cloud opslag", typical: "€2-10", priority: "Optioneel" }
      ]
    }
  ];

  const optimizationTips = [
    {
      title: "Vergelijk jaarlijks",
      description: "Energieleveranciers, verzekeringen en telecomproviders - vergelijk elk jaar en stap over als het voordeliger is.",
      potential: "€200-500/jaar"
    },
    {
      title: "Bundel waar mogelijk",
      description: "Sommige aanbieders geven korting als je meerdere producten afneemt (internet + TV, auto + inboedel).",
      potential: "€50-150/jaar"
    },
    {
      title: "Verhoog eigen risico",
      description: "Een hoger eigen risico bij verzekeringen verlaagt je premie. Alleen doen als je een noodfonds hebt.",
      potential: "€100-300/jaar"
    },
    {
      title: "Check je verbruik",
      description: "Past je energiecontract bij je werkelijke verbruik? Betaal je voor data die je niet gebruikt?",
      potential: "€50-200/jaar"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-indigo-500/10 via-background to-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Receipt className="w-4 h-4" />
                Vaste Lasten
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Compleet Overzicht van{" "}
                <span className="text-primary">Vaste Lasten</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Welke vaste lasten heb je en wat zijn normale bedragen? Krijg inzicht en 
                ontdek waar je kunt besparen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/auth">
                    Registreer je Vaste Lasten
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg">
                  <Link to="/geld-besparen">Bespaartips</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* What Are Fixed Costs */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Wat Zijn Vaste Lasten?
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
                <p className="text-lg leading-relaxed">
                  Vaste lasten zijn terugkerende kosten die je elke maand (of elk jaar) betaalt. 
                  Ze vormen de basis van je budget en zijn vaak moeilijk te vermijden.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                      <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Verplicht</h3>
                    <p className="text-muted-foreground text-sm">
                      Huur, zorgverzekering, gemeentelijke belastingen - niet onderhandelbaar.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center mb-4">
                      <Receipt className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Noodzakelijk</h3>
                    <p className="text-muted-foreground text-sm">
                      Energie, internet, telefoon - nodig, maar wel te optimaliseren.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                      <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Optioneel</h3>
                    <p className="text-muted-foreground text-sm">
                      Streaming, sportschool, abonnementen - keuzes die je kunt heroverwegen.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Fixed Costs Overview */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Overzicht Vaste Lasten per Categorie
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Typische bedragen voor een gemiddeld Nederlands huishouden
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {vasteLasten.map((category, index) => (
                <Card key={index} className="bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <category.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{category.category}</h3>
                    </div>
                    <div className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-center text-sm border-b border-border pb-2 last:border-0">
                          <div>
                            <span className="text-foreground">{item.name}</span>
                            <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                              item.priority === 'Essentieel' || item.priority === 'Verplicht'
                                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                : item.priority === 'Aangeraden' || item.priority === 'Standaard'
                                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            }`}>
                              {item.priority}
                            </span>
                          </div>
                          <span className="text-primary font-medium">{item.typical}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Total Overview */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Wat Zijn Normale Totale Vaste Lasten?
              </h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-card">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">€1.200-1.800</div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Alleenstaand</h3>
                    <p className="text-sm text-muted-foreground">Huur, basis verzekeringen, energie</p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">€1.800-2.500</div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Stel zonder kinderen</h3>
                    <p className="text-sm text-muted-foreground">Gedeelde woonlasten, dubbele verzekeringen</p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">€2.200-3.500</div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Gezin met kinderen</h3>
                    <p className="text-sm text-muted-foreground">Grotere woning, kinderopvang, extra verzekeringen</p>
                  </CardContent>
                </Card>
              </div>
              <div className="bg-muted/50 rounded-lg p-6">
                <p className="text-muted-foreground text-center">
                  💡 <strong>Vuistregel:</strong> Vaste lasten zouden niet meer dan 50-60% van je netto inkomen moeten zijn. 
                  Bij €2.500 netto zijn vaste lasten tot €1.500 gezond.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Optimization Tips */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Vaste Lasten Optimaliseren
                </h2>
                <p className="text-xl text-muted-foreground">
                  Tips om je vaste lasten te verlagen zonder in te leveren
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {optimizationTips.map((tip, index) => (
                  <Card key={index} className="bg-card">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-foreground">{tip.title}</h3>
                        <span className="text-primary font-bold text-sm">{tip.potential}</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{tip.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Checklist: Heb je Alles?
              </h2>
              <Card className="bg-card">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "Huur of hypotheek",
                      "Zorgverzekering",
                      "Aansprakelijkheidsverzekering",
                      "Energie (gas & elektra)",
                      "Water",
                      "Gemeentelijke belastingen",
                      "Internet/telefoon",
                      "Inboedelverzekering",
                      "Eventueel autoverzekering",
                      "Eventueel OV-abonnement",
                      "Streaming abonnementen",
                      "Andere abonnementen"
                    ].map((item, index) => (
                      <label key={index} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 rounded border-border" />
                        <span className="text-foreground">{item}</span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <Receipt className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Houd je Vaste Lasten Bij
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Met FinOverzicht zie je in één oogopslag al je vaste lasten en hoeveel er overblijft.
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

export default VasteLastenOverzicht;
