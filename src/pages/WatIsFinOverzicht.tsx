import { Link } from 'react-router-dom';
import { useSEO, createBreadcrumbSchema, createWebPageSchema } from '@/hooks/useSEO';
import { Button } from '@/components/ui/button';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { 
  Eye, 
  Users, 
  Receipt, 
  PiggyBank, 
  TrendingDown, 
  FileText, 
  RefreshCw, 
  Heart, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function WatIsFinOverzicht() {
  useSEO({
    title: 'Wat is FinOverzicht? - Gratis Inzicht in je Financiën',
    description: 'FinOverzicht is een volledig gratis app die je helpt overzicht te krijgen in je inkomsten en uitgaven. Ontdek waarom financieel overzicht zo belangrijk is.',
    canonical: 'https://www.finoverzicht.nl/wat-is-finoverzicht',
    jsonLd: [
      createWebPageSchema(
        'Wat is FinOverzicht?',
        'FinOverzicht is een volledig gratis app die je helpt overzicht te krijgen in je inkomsten en uitgaven.',
        'https://www.finoverzicht.nl/wat-is-finoverzicht'
      ),
      createBreadcrumbSchema([
        { name: 'Home', url: 'https://www.finoverzicht.nl/' },
        { name: 'Wat is FinOverzicht?', url: 'https://www.finoverzicht.nl/wat-is-finoverzicht' }
      ])
    ]
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 pattern-grid" />
          <div className="hero-glow glow-primary top-1/4 -left-32 animate-pulse-slow" />
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                100% Gratis
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Wat is <span className="text-gradient">FinOverzicht</span>?
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                FinOverzicht is een volledig gratis app die je helpt om overzicht te krijgen in je inkomsten en uitgaven. 
                Geen ingewikkelde financiële termen, geen verborgen kosten en geen onnodige functies.
              </p>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Veel mensen denken dat ze hun financiën wel ongeveer kennen. Ze weten wat er binnenkomt en hebben een idee van wat eruit gaat. 
                Maar zolang alles in je hoofd zit, ontstaat er onrust. Kleine uitgaven worden vergeten, abonnementen lopen ongemerkt door en 
                aan het einde van de maand blijft de vraag: <strong className="text-foreground">waar is mijn geld gebleven?</strong>
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                FinOverzicht brengt alles samen in één overzicht. Door je inkomsten en uitgaven naast elkaar te zetten, 
                krijg je niet alleen inzicht in cijfers, maar ook <strong className="text-foreground">rust en controle</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Waarom financieel overzicht Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                    <Eye className="h-3.5 w-3.5" />
                    Inzicht
                  </div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                    Waarom financieel overzicht zo belangrijk is
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Zonder overzicht wordt geld al snel een bron van stress. Je weet niet precies wat je per maand kunt uitgeven, 
                    hoeveel ruimte er is om te sparen of waar je moet bijsturen. Beslissingen worden gemaakt op gevoel, 
                    terwijl geld vraagt om duidelijkheid.
                  </p>
                </div>
                <div className="bg-card rounded-2xl p-8 border border-border">
                  <h3 className="font-heading font-semibold text-xl mb-6">Met FinOverzicht zie je in één oogopslag:</h3>
                  <ul className="space-y-4">
                    {[
                      "Hoeveel geld er binnenkomt",
                      "Waar je geld naartoe gaat",
                      "Welke vaste lasten zwaar drukken",
                      "Welke uitgaven eigenlijk overbodig zijn"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        </div>
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-muted-foreground mt-6 text-sm">
                    Dit inzicht helpt je om bewuste keuzes te maken. Je hoeft niet meer te gokken of te hopen — je weet hoe je ervoor staat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Samen één overzicht Section */}
        <section className="py-20 bg-primary/5 border-y border-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <div className="bg-card rounded-2xl p-8 border border-border">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                      <Users className="h-8 w-8" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl mb-4">Ideaal voor gezinnen</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Via de instellingen kun je eenvoudig je partner of gezinsleden toevoegen, zonder dat zij een apart account hoeven aan te maken. 
                      Iedereen werkt in hetzelfde overzicht, waardoor inkomsten en uitgaven direct inzichtelijk zijn voor alle betrokkenen.
                    </p>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                    <Users className="h-3.5 w-3.5" />
                    Samen
                  </div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                    Samen één overzicht: ideaal voor gezinnen
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    FinOverzicht is perfect te gebruiken met meerdere personen op één account. Dit voorkomt misverstanden, 
                    zorgt voor transparantie en maakt het makkelijker om samen financiële doelen te stellen — 
                    zoals besparen, sparen of het verlagen van vaste lasten.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inzicht in abonnementen Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <Receipt className="h-3.5 w-3.5" />
                  Besparen
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                  Inzicht in abonnementen, besparen en sparen
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Veel mensen betalen ongemerkt te veel. Denk aan abonnementen die nauwelijks worden gebruikt of 
                  kleine vaste kosten die samen een groot bedrag vormen.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Eye, text: "Ontdek welke abonnementen te duur zijn" },
                  { icon: Receipt, text: "Zie welke kosten je kunt schrappen" },
                  { icon: PiggyBank, text: "Weet wat je realistisch per maand kunt uitgeven" },
                  { icon: CheckCircle2, text: "Sparen wordt overzichtelijk en haalbaar" }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-card border border-border text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <p className="text-foreground font-medium">{item.text}</p>
                  </div>
                ))}
              </div>
              
              <p className="text-center text-muted-foreground mt-8 italic">
                Sparen begint niet bij meer verdienen, maar bij weten waar je geld blijft.
              </p>
            </div>
          </div>
        </section>

        {/* Schulden Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warning/10 text-warning text-sm font-medium mb-4">
                    <TrendingDown className="h-3.5 w-3.5" />
                    Schulden
                  </div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                    Ondersteuning bij schulden en betalingsproblemen
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Voor mensen met schulden is overzicht essentieel. Vaak bestaat er slechts een globaal beeld van wat er nog openstaat 
                    en wat betaald moet worden. Maar zonder duidelijk overzicht ontstaan snel problemen.
                  </p>
                </div>
                <div className="bg-card rounded-2xl p-8 border border-border">
                  <h3 className="font-heading font-semibold text-xl mb-6">FinOverzicht helpt door:</h3>
                  <ul className="space-y-4">
                    {[
                      "Openstaande bedragen inzichtelijk te maken",
                      "Vaste verplichtingen overzichtelijk te tonen",
                      "Te laten zien wat er beschikbaar blijft om te betalen"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        </div>
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-muted-foreground mt-6 text-sm">
                    Door alles op een rij te zetten, ontstaat er rust en controle. Overzicht is altijd de eerste stap naar verbetering.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Extra functies Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* PDF Export */}
                <div className="p-8 rounded-2xl bg-card border border-border">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                    <FileText className="h-7 w-7" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-4">Exporteer je overzicht naar PDF</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Wil je je overzicht delen, bewaren of bespreken? FinOverzicht biedt de mogelijkheid om je gegevens eenvoudig te exporteren 
                    naar een PDF-bestand. Ideaal voor gesprekken met je partner, hulpverlening, budgetcoaches of gewoon voor je eigen administratie.
                  </p>
                </div>
                
                {/* Reset */}
                <div className="p-8 rounded-2xl bg-card border border-border">
                  <div className="w-14 h-14 rounded-xl bg-info/10 text-info flex items-center justify-center mb-6">
                    <RefreshCw className="h-7 w-7" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-4">Altijd opnieuw beginnen wanneer jij dat wilt</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Soms is een frisse start nodig. Daarom kun je in FinOverzicht op elk gewenst moment je account resetten. 
                    Zo begin je opnieuw met een leeg overzicht, zonder oude gegevens. Dit geeft ruimte voor nieuwe doelen en een nieuw begin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Voor iedereen Section */}
        <section className="py-20 bg-primary/5 border-y border-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Heart className="h-3.5 w-3.5" />
                Voor iedereen
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Eenvoudig, duidelijk en voor iedereen
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
                FinOverzicht is ontworpen voor iedereen. Je hebt geen financiële kennis nodig en wordt niet overspoeld met ingewikkelde functies. 
                Alles is gericht op eenvoud, overzicht en gebruiksgemak.
              </p>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  "Moeite hebt om rond te komen",
                  "Samen met je gezin overzicht wilt",
                  "Wilt besparen of sparen",
                  "Schulden hebt",
                  "Meer grip wilt op je geld"
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-card border border-border">
                    <p className="text-sm text-foreground font-medium">{item}</p>
                  </div>
                ))}
              </div>
              
              <p className="text-muted-foreground mt-8">
                FinOverzicht past zich aan jouw situatie aan.
              </p>
            </div>
          </div>
        </section>

        {/* 100% Gratis Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-7xl font-heading font-bold text-primary mb-4">€0</div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                100% gratis, zonder kleine lettertjes
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                FinOverzicht is en blijft volledig gratis. Geen abonnementen, geen verborgen kosten en geen verplichtingen. 
                Het doel is simpel: mensen helpen om grip te krijgen op hun geld en financiële rust te ervaren.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                FinOverzicht
              </h2>
              <p className="text-xl text-muted-foreground mb-2">
                Overzicht voor jezelf. Duidelijkheid voor het gezin. Rust in je hoofd.
              </p>
              <p className="text-lg text-primary font-semibold mb-10">
                Helemaal gratis. Altijd.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth?mode=signup">
                  <Button size="lg" className="text-lg px-8 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full sm:w-auto shadow-lg shadow-primary/25">
                    Gratis starten
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/functies">
                  <Button size="lg" variant="outline" className="text-lg px-8 h-14 rounded-full w-full sm:w-auto">
                    Bekijk functies
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
