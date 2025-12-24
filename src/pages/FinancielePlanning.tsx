import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { 
  Map, 
  Target, 
  TrendingUp, 
  ArrowRight,
  CheckCircle,
  Calendar,
  Home,
  GraduationCap,
  Plane,
  Baby,
  Briefcase,
  Clock
} from "lucide-react";

const FinancielePlanning = () => {
  const lifeGoals = [
    {
      icon: Home,
      title: "Huis Kopen",
      timeline: "5-10 jaar",
      tips: [
        "Spaar minimaal 5% eigen inbreng",
        "Verbeter je BKR-score",
        "Onderzoek koopsubsidies",
        "Bereken je maximale hypotheek"
      ]
    },
    {
      icon: Baby,
      title: "Gezin Starten",
      timeline: "2-5 jaar",
      tips: [
        "Bouw een babyfonds van €5.000+",
        "Onderzoek kinderbijslag en toeslagen",
        "Plan voor kinderopvangkosten",
        "Overweeg levensverzekering"
      ]
    },
    {
      icon: GraduationCap,
      title: "Studie/Opleiding",
      timeline: "1-3 jaar",
      tips: [
        "Onderzoek studiefinanciering",
        "Vergelijk opleidingen op ROI",
        "Kijk naar werkgeversbijdragen",
        "Spaar voor bijkomende kosten"
      ]
    },
    {
      icon: Plane,
      title: "Grote Reis",
      timeline: "1-2 jaar",
      tips: [
        "Bepaal je reisbudget vooraf",
        "Spaar maandelijks een vast bedrag",
        "Boek vroeg voor korting",
        "Creëer een apart reisspaarrekening"
      ]
    },
    {
      icon: Briefcase,
      title: "Eigen Bedrijf",
      timeline: "1-5 jaar",
      tips: [
        "Bouw een buffer van 6-12 maanden",
        "Start als side-hustle",
        "Onderzoek subsidies en leningen",
        "Maak een businessplan"
      ]
    },
    {
      icon: Clock,
      title: "Pensioen",
      timeline: "20-40 jaar",
      tips: [
        "Start zo vroeg mogelijk",
        "Benut werkgeverspensioen maximaal",
        "Overweeg extra pensioensparen",
        "Diversifieer je beleggingen"
      ]
    }
  ];

  const planningSteps = [
    {
      step: "1",
      title: "Bepaal je huidige situatie",
      description: "Breng al je bezittingen, schulden, inkomsten en uitgaven in kaart. Dit is je startpunt."
    },
    {
      step: "2",
      title: "Stel concrete doelen",
      description: "Wat wil je bereiken? Maak je doelen SMART: Specifiek, Meetbaar, Acceptabel, Realistisch, Tijdgebonden."
    },
    {
      step: "3",
      title: "Maak een tijdlijn",
      description: "Wanneer wil je elk doel bereiken? Prioriteer op basis van urgentie en belang."
    },
    {
      step: "4",
      title: "Bereken wat je nodig hebt",
      description: "Hoeveel moet je sparen per maand om je doelen te bereiken? Wees realistisch."
    },
    {
      step: "5",
      title: "Automatiseer",
      description: "Zet automatische overboekingen op naar je spaarrekeningen. Pay yourself first!"
    },
    {
      step: "6",
      title: "Evalueer regelmatig",
      description: "Bekijk elk kwartaal je voortgang en pas je plan aan waar nodig."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-purple-500/10 via-background to-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Map className="w-4 h-4" />
                Financiële Planning
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Plan je Financiële{" "}
                <span className="text-primary">Toekomst</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Van dromen naar concrete doelen. Leer hoe je een financieel plan maakt 
                dat je helpt je levensdoelen te bereiken.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/auth">
                    Start je Financieel Plan
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

        {/* What is Financial Planning */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Wat is Financiële Planning?
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="text-lg leading-relaxed mb-6">
                  Financiële planning is het proces van het stellen van financiële doelen en het 
                  maken van een plan om deze te bereiken. Het gaat verder dan alleen budgetteren - 
                  het is een roadmap voor je financiële toekomst.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card className="bg-card">
                    <CardContent className="p-6 text-center">
                      <Target className="w-10 h-10 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">Doelen Stellen</h3>
                      <p className="text-sm text-muted-foreground">
                        Bepaal wat je wilt bereiken op korte, middellange en lange termijn.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card">
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="w-10 h-10 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">Strategie Maken</h3>
                      <p className="text-sm text-muted-foreground">
                        Ontwikkel een plan met concrete stappen om je doelen te bereiken.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card">
                    <CardContent className="p-6 text-center">
                      <Calendar className="w-10 h-10 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">Voortgang Volgen</h3>
                      <p className="text-sm text-muted-foreground">
                        Monitor regelmatig en pas je plan aan waar nodig.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Life Goals Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Plannen voor Levensdoelen
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Specifieke tips voor veelvoorkomende financiële doelen
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {lifeGoals.map((goal, index) => (
                <Card key={index} className="bg-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <goal.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{goal.title}</h3>
                        <span className="text-sm text-muted-foreground">Horizon: {goal.timeline}</span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {goal.tips.map((tip, tipIndex) => (
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

        {/* Planning Steps */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Maak je Financieel Plan in 6 Stappen
                </h2>
              </div>
              <div className="space-y-6">
                {planningSteps.map((item, index) => (
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
          </div>
        </section>

        {/* SMART Goals */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  SMART Doelen Stellen
                </h2>
                <p className="text-xl text-muted-foreground">
                  Maak je doelen concreet en haalbaar
                </p>
              </div>
              <div className="grid md:grid-cols-5 gap-4">
                <Card className="bg-card">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">S</div>
                    <h3 className="font-semibold text-foreground mb-1">Specifiek</h3>
                    <p className="text-xs text-muted-foreground">Wat precies?</p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">M</div>
                    <h3 className="font-semibold text-foreground mb-1">Meetbaar</h3>
                    <p className="text-xs text-muted-foreground">Hoeveel?</p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">A</div>
                    <h3 className="font-semibold text-foreground mb-1">Acceptabel</h3>
                    <p className="text-xs text-muted-foreground">Wil je het echt?</p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">R</div>
                    <h3 className="font-semibold text-foreground mb-1">Realistisch</h3>
                    <p className="text-xs text-muted-foreground">Is het haalbaar?</p>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">T</div>
                    <h3 className="font-semibold text-foreground mb-1">Tijdgebonden</h3>
                    <p className="text-xs text-muted-foreground">Wanneer?</p>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-8 bg-card rounded-lg p-6 border border-border">
                <h4 className="font-semibold text-foreground mb-4">Voorbeeld:</h4>
                <div className="space-y-2 text-muted-foreground">
                  <p>❌ <span className="line-through">"Ik wil meer sparen"</span></p>
                  <p>✅ <span className="text-foreground">"Ik spaar €10.000 voor een autoreservering door €400 per maand opzij te zetten, bereikt op 1 januari 2027"</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Time Horizons */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
                Plan voor Verschillende Tijdshorizonten
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">🎯</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Korte Termijn</h3>
                    <p className="text-sm text-muted-foreground mb-4">0-2 jaar</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Noodfonds opbouwen</li>
                      <li>• Kleine schulden aflossen</li>
                      <li>• Vakantie sparen</li>
                      <li>• Nieuwe laptop/telefoon</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">📈</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Middellange Termijn</h3>
                    <p className="text-sm text-muted-foreground mb-4">2-10 jaar</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Auto kopen</li>
                      <li>• Huis sparen</li>
                      <li>• Trouwen</li>
                      <li>• Opleiding volgen</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="bg-card">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">🏆</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Lange Termijn</h3>
                    <p className="text-sm text-muted-foreground mb-4">10+ jaar</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Pensioenopbouw</li>
                      <li>• Kinderen studie</li>
                      <li>• Financiële onafhankelijkheid</li>
                      <li>• Erfenis plannen</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <Map className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Begin met Plannen voor je Toekomst
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              FinOverzicht helpt je om je financiële doelen te stellen, te volgen en te bereiken.
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

export default FinancielePlanning;
