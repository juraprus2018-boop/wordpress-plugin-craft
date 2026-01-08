import { useSEO } from '@/hooks/useSEO';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LayoutDashboard, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  Settings, 
  Users, 
  PiggyBank,
  Calendar,
  BarChart3,
  Landmark,
  RefreshCw,
  Bell,
  Download,
  Palette,
  HelpCircle,
  ChevronRight,
  Wallet
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@/lib/auth';

const sections = [
  {
    id: 'dashboard',
    icon: LayoutDashboard,
    title: 'Dashboard',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    description: 'Je centrale overzicht van alle financiën.',
    content: [
      'Het dashboard toont in één oogopslag je totale inkomsten, uitgaven en nettoresultaat.',
      'Je ziet je totale schulden en leningen met de maandelijkse aflossing.',
      'De spaarquote laat zien welk percentage van je inkomen je overhoudt.',
      'Gebruik het filter rechtsboven om te schakelen tussen "Samen" (huishouden), "Alleen mijn eigen" of een specifiek gezinslid.',
      'De grafieken tonen je cashflow, jaarprojectie en uitgavenverdeling per categorie.',
    ],
  },
  {
    id: 'inkomsten',
    icon: TrendingUp,
    title: 'Inkomsten',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    description: 'Beheer al je bronnen van inkomen.',
    content: [
      'Voeg inkomsten toe zoals salaris, bijverdiensten, uitkeringen of overig inkomen.',
      'Kies een categorie en selecteer eventueel een gezinslid.',
      'Stel de frequentie in: maandelijks, per kwartaal, halfjaarlijks of jaarlijks.',
      'Geef optioneel de dag van de maand aan waarop je het bedrag ontvangt.',
      'Terugkerende inkomsten worden automatisch meegenomen in je maandelijkse berekeningen.',
    ],
  },
  {
    id: 'uitgaven',
    icon: TrendingDown,
    title: 'Uitgaven',
    color: 'text-coral',
    bgColor: 'bg-coral/10',
    description: 'Houd al je vaste lasten en uitgaven bij.',
    content: [
      'Voeg uitgaven toe zoals huur, verzekeringen, abonnementen en boodschappen.',
      'Markeer een uitgave als "Gedeeld" als deze voor het hele huishouden geldt.',
      'Gedeelde uitgaven worden eerlijk verdeeld over alle gezinsleden.',
      'Stel frequenties in voor uitgaven die niet maandelijks zijn.',
      'De app rekent alles om naar maandbedragen voor een duidelijk overzicht.',
    ],
  },
  {
    id: 'schulden',
    icon: CreditCard,
    title: 'Schulden & Leningen',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    description: 'Beheer schulden en leningen apart.',
    content: [
      'Schulden zijn informele schulden zoals openstaande rekeningen of geld dat je aan iemand verschuldigd bent.',
      'Leningen zijn formele leningen zoals persoonlijke leningen, autoleningen of hypotheken.',
      'Voeg voor elk item het oorspronkelijke bedrag en resterend bedrag toe.',
      'Stel een maandelijkse aflossing in om je voortgang te volgen.',
      'Registreer betalingen om je resterende schuld automatisch te verlagen.',
      'De voortgangsbalk toont hoeveel procent je al hebt afgelost.',
    ],
  },
  {
    id: 'gezinsleden',
    icon: Users,
    title: 'Gezinsleden',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    description: 'Voeg huisgenoten of gezinsleden toe.',
    content: [
      'Ga naar Instellingen → Gezinsleden om leden toe te voegen.',
      'Geef elk lid een naam en een kleur voor herkenning in de app.',
      'Koppel inkomsten, uitgaven of schulden aan specifieke gezinsleden.',
      'Filter het dashboard op een gezinslid om hun persoonlijke financiën te zien.',
      'Gedeelde uitgaven worden automatisch verdeeld over het aantal leden.',
    ],
  },
  {
    id: 'categorieen',
    icon: Palette,
    title: 'Categorieën',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    description: 'Pas categorieën aan naar wens.',
    content: [
      'Standaardcategorieën worden automatisch aangemaakt bij registratie.',
      'Ga naar Instellingen → Categorieën om eigen categorieën toe te voegen.',
      'Kies een naam, pictogram en kleur voor elke categorie.',
      'Categorieën worden apart beheerd voor inkomsten en uitgaven.',
      'Je kunt standaardcategorieën niet verwijderen, maar wel eigen categorieën.',
    ],
  },
  {
    id: 'frequenties',
    icon: Calendar,
    title: 'Frequenties begrijpen',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    description: 'Hoe werken frequenties?',
    content: [
      'Maandelijks (1x): Het bedrag wordt direct als maandbedrag gebruikt.',
      'Per kwartaal (3x): Het bedrag wordt gedeeld door 3 voor het maandbedrag.',
      'Halfjaarlijks (6x): Het bedrag wordt gedeeld door 6.',
      'Jaarlijks (12x): Het bedrag wordt gedeeld door 12.',
      'Zo krijg je altijd een accurate maandelijkse berekening, ook voor jaarlijkse verzekeringen.',
    ],
  },
  {
    id: 'grafieken',
    icon: BarChart3,
    title: 'Grafieken & Rapporten',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    description: 'Visualiseer je financiën.',
    content: [
      'Cashflow-grafiek: Toont inkomsten vs. uitgaven als balken naast elkaar.',
      'Jaarprojectie: Berekent wanneer je schuldenvrij bent op basis van huidige aflossing.',
      'Inkomen/Uitgaven taart: Visualiseert de verhouding tussen inkomsten en uitgaven.',
      'Uitgaven per categorie: Laat zien waar je geld naartoe gaat.',
      'Alle grafieken worden real-time bijgewerkt bij wijzigingen.',
    ],
  },
  {
    id: 'notificaties',
    icon: Bell,
    title: 'Notificaties',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    description: 'Ontvang herinneringen.',
    content: [
      'Schakel pushnotificaties in via Instellingen → Notificaties.',
      'Je ontvangt herinneringen voor aflossingen die binnenkort vervallen.',
      'Notificaties werken alleen als je de app als PWA installeert.',
      'Je kunt notificaties op elk moment weer uitschakelen.',
    ],
  },
  {
    id: 'installatie',
    icon: Download,
    title: 'App installeren',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    description: 'Installeer FinOverzicht op je apparaat.',
    content: [
      'FinOverzicht is een Progressive Web App (PWA).',
      'Op je telefoon: Tik op "Deel" en kies "Zet op beginscherm".',
      'In Chrome op desktop: Klik op het installatie-icoon in de adresbalk.',
      'Na installatie werkt de app ook offline met je laatste gegevens.',
      'Je krijgt een app-icoon op je bureaublad of beginscherm.',
    ],
  },
  {
    id: 'exporteren',
    icon: RefreshCw,
    title: 'Gegevens exporteren',
    color: 'text-teal-500',
    bgColor: 'bg-teal-500/10',
    description: 'Exporteer je data.',
    content: [
      'Ga naar Instellingen om je gegevens te exporteren.',
      'Export is beschikbaar als Excel (.xlsx) of PDF bestand.',
      'De export bevat al je inkomsten, uitgaven en schulden.',
      'Handig voor belastingaangifte of eigen administratie.',
    ],
  },
  {
    id: 'thema',
    icon: Palette,
    title: 'Thema aanpassen',
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
    description: 'Kies licht of donker thema.',
    content: [
      'Ga naar Instellingen → Thema om het uiterlijk aan te passen.',
      'Kies tussen Licht, Donker of Systeem (volgt je apparaatinstelling).',
      'De app onthoudt je voorkeur bij volgende bezoeken.',
    ],
  },
];

export default function Handleiding() {
  useSEO({
    title: 'Handleiding - FinOverzicht',
    description: 'Leer hoe je FinOverzicht gebruikt. Complete handleiding voor alle functies: dashboard, inkomsten, uitgaven, schulden en meer.',
  });

  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Laden...</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="font-heading text-2xl lg:text-3xl font-bold flex items-center gap-3">
            <HelpCircle className="h-8 w-8 text-primary" />
            Handleiding
          </h1>
          <p className="text-muted-foreground">
            Leer hoe je alle functies van FinOverzicht optimaal benut.
          </p>
        </div>

        {/* Quick Start Card */}
        <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-lg mb-2">Snel starten</h2>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Voeg eerst je maandelijkse inkomsten toe (salaris, uitkeringen, etc.)</li>
                  <li>Voeg vervolgens je vaste uitgaven toe (huur, verzekeringen, abonnementen)</li>
                  <li>Voeg eventuele schulden of leningen toe</li>
                  <li>Bekijk je dashboard voor een compleet financieel overzicht</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sections Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {sections.map((section) => (
            <Card key={section.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className={`w-10 h-10 rounded-xl ${section.bgColor} flex items-center justify-center`}>
                    <section.icon className={`h-5 w-5 ${section.color}`} />
                  </div>
                  <div>
                    <span className="block">{section.title}</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      {section.description}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Card */}
        <Card className="bg-muted/50">
          <CardContent className="p-6 text-center">
            <h3 className="font-heading font-bold mb-2">Nog vragen?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Kom je er niet uit? Neem contact met ons op via de contactpagina.
            </p>
            <a 
              href="/contact" 
              className="text-primary hover:underline text-sm font-medium"
            >
              Ga naar Contact →
            </a>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}