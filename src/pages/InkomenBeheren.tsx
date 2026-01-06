import { Link } from "react-router-dom";
import { useSEO } from '@/hooks/useSEO';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { 
  Wallet, 
  TrendingUp, 
  Briefcase, 
  ArrowRight,
  CheckCircle,
  Euro,
  Gift,
  Building,
  Users,
  Calculator,
  PiggyBank
} from "lucide-react";

const InkomenBeheren = () => {
  useSEO({
    title: 'Inkomen Beheren - Tips voor Meer Verdienen | FinOverzicht',
    description: 'Leer hoe je je inkomen maximaliseert en beheert. Van salarisonderhandeling tot meerdere inkomstenbronnen en toeslagen.',
    canonical: 'https://www.finoverzicht.nl/inkomen-beheren'
  });

  const incomeTypes = [
    {
      icon: Briefcase,
      title: "Salaris",
      description: "Je maandelijkse loon uit loondienst",
      tips: [
        "Onderhandel bij aanname en jaarlijks",
        "Vraag naar secundaire arbeidsvoorwaarden",
        "Benut pensioenregelingen maximaal",
        "Vraag naar opleidingsbudget"
      ]
    },
    {
      icon: Building,
      title: "Freelance/ZZP",
      description: "Inkomsten uit eigen onderneming",
      tips: [
        "Houd 30-40% apart voor belastingen",
        "Factureer op tijd en consequent",
        "Bouw een buffer van 6 maanden",
        "Investeer in je zichtbaarheid"
      ]
    },
    {
      icon: Gift,
      title: "Toeslagen",
      description: "Overheidstoeslagen waar je recht op hebt",
      tips: [
        "Controleer je recht op zorgtoeslag",
        "Vraag huurtoeslag aan indien mogelijk",
        "Check kinderopvangtoeslag",
        "Vergeet kindgebonden budget niet"
      ]
    },
    {
      icon: TrendingUp,
      title: "Passief Inkomen",
      description: "Inkomen uit beleggingen of verhuur",
      tips: [
        "Start met indexfondsen",
        "Overweeg dividend aandelen",
        "Kijk naar vastgoed mogelijkheden",
        "Bouw een passief inkomen portfolio"
      ]
    }
  ];

  const budgetRules = [
    {
      title: "50/30/20 Regel",
      allocation: [
        { category: "Vaste lasten", percentage: 50, color: "bg-red-500" },
        { category: "Persoonlijk", percentage: 30, color: "bg-yellow-500" },
        { category: "Sparen", percentage: 20, color: "bg-green-500" }
      ]
    }
  ];

  const salaryTips = [
    { tip: "Onderhandel altijd bij een nieuwe baan", impact: "5-15% hoger startsalaris" },
    { tip: "Vraag jaarlijks om loonsverhoging", impact: "3-5% per jaar" },
    { tip: "Benchmark je salaris online", impact: "Weet wat je waard bent" },
    { tip: "Vraag naar bonus structuur", impact: "Extra 5-20% inkomen" },
    { tip: "Onderhandel over secundaire voorwaarden", impact: "Fietsplan, telefoon, opleidingen" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-cyan-500/10 via-background to-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Wallet className="w-4 h-4" />
                Inkomen Beheren
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Maximaliseer en Beheer{" "}
                <span className="text-primary">je Inkomen</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Van salarisonderhandeling tot meerdere inkomstenbronnen. Leer hoe je meer 
                verdient en slim omgaat met wat je binnenkomt.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/auth">
                    Beheer je Inkomen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg">
                  <Link to="/budget-beheren">Budgettips</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Income Types */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Soorten Inkomen
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Diversifieer je inkomstenbronnen voor financiële stabiliteit
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {incomeTypes.map((type, index) => (
                <Card key={index} className="bg-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <type.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{type.title}</h3>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {type.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2 text-muted-foreground text-sm">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Salary Negotiation */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Euro className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Salarisonderhandeling Tips
                </h2>
                <p className="text-xl text-muted-foreground">
                  Meer verdienen begint met durven vragen
                </p>
              </div>
              <div className="space-y-4">
                {salaryTips.map((item, index) => (
                  <Card key={index} className="bg-card">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                            {index + 1}
                          </div>
                          <span className="text-foreground font-medium">{item.tip}</span>
                        </div>
                        <span className="text-primary font-semibold text-sm">{item.impact}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Budget Allocation */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Calculator className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Hoe Verdeel je je Inkomen?
                </h2>
              </div>
              {budgetRules.map((rule, index) => (
                <Card key={index} className="bg-card mb-8">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-6 text-center">{rule.title}</h3>
                    <div className="flex gap-2 mb-6 h-8 rounded-lg overflow-hidden">
                      {rule.allocation.map((item, itemIndex) => (
                        <div 
                          key={itemIndex} 
                          className={`${item.color} flex items-center justify-center text-white font-bold text-sm`}
                          style={{ width: `${item.percentage}%` }}
                        >
                          {item.percentage}%
                        </div>
                      ))}
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      {rule.allocation.map((item, itemIndex) => (
                        <div key={itemIndex} className="text-center">
                          <div className={`w-4 h-4 ${item.color} rounded mx-auto mb-2`} />
                          <p className="font-semibold text-foreground">{item.category}</p>
                          <p className="text-sm text-muted-foreground">{item.percentage}%</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="bg-muted/50 rounded-lg p-6">
                <h4 className="font-semibold text-foreground mb-4">Voorbeeld bij €2.500 netto:</h4>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-red-500">€1.250</p>
                    <p className="text-sm text-muted-foreground">Vaste lasten</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-500">€750</p>
                    <p className="text-sm text-muted-foreground">Persoonlijk</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-500">€500</p>
                    <p className="text-sm text-muted-foreground">Sparen</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Multiple Income Streams */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Meerdere Inkomstenbronnen
                </h2>
                <p className="text-xl text-muted-foreground">
                  Verminder risico door je inkomen te spreiden
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">💼 Naast je Baan</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Freelance werk in je expertise</li>
                      <li>• Online cursussen geven</li>
                      <li>• Consulting opdrachten</li>
                      <li>• Content creatie (blog, YouTube)</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">📈 Passief Inkomen</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Dividend uit aandelen</li>
                      <li>• Rente op spaarrekeningen</li>
                      <li>• Huurinkomsten</li>
                      <li>• Royalties (boeken, muziek)</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">🎓 Vaardigheden Monetiseren</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Bijles of coaching</li>
                      <li>• Fotografie/videografie</li>
                      <li>• Vertaalwerk</li>
                      <li>• Webdesign</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">🏠 Met je Bezittingen</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Kamer verhuren (Airbnb)</li>
                      <li>• Auto delen (SnappCar)</li>
                      <li>• Spullen verhuren</li>
                      <li>• Parkeerplaats verhuren</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Toeslagen Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Gift className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Vergeet je Toeslagen Niet
              </h2>
                <p className="text-xl text-muted-foreground">
                  Miljoenen Nederlanders laten geld liggen
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Zorgtoeslag</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Bijdrage in de kosten van je zorgverzekering
                    </p>
                    <p className="text-primary font-bold">Tot €150/maand</p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Huurtoeslag</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Bijdrage in je huurkosten
                    </p>
                    <p className="text-primary font-bold">Tot €400/maand</p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Kinderopvangtoeslag</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Bijdrage in kinderopvangkosten
                    </p>
                    <p className="text-primary font-bold">Tot 96% vergoed</p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Kindgebonden Budget</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Extra bijdrage voor gezinnen met kinderen
                    </p>
                    <p className="text-primary font-bold">Tot €300/maand per kind</p>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-8 text-center">
                <Button asChild variant="outline">
                  <a href="https://www.belastingdienst.nl/toeslagen" target="_blank" rel="noopener noreferrer">
                    Check je recht op toeslagen →
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <PiggyBank className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Krijg Grip op je Inkomen
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Met FinOverzicht houd je al je inkomstenbronnen bij en zie je precies wat je verdient.
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

export default InkomenBeheren;
