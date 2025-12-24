import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { 
  HelpCircle, 
  ArrowRight,
  Shield,
  CreditCard,
  Users,
  Smartphone,
  Lock,
  RefreshCw
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqCategories = [
    {
      title: "Algemeen",
      icon: HelpCircle,
      questions: [
        {
          q: "Wat is FinOverzicht?",
          a: "FinOverzicht is een gratis online huishoudboekje waarmee je je inkomsten, uitgaven en schulden kunt bijhouden. Het is speciaal ontwikkeld voor Nederlandse huishoudens en is volledig gratis te gebruiken."
        },
        {
          q: "Voor wie is FinOverzicht bedoeld?",
          a: "FinOverzicht is geschikt voor iedereen die grip wil krijgen op zijn financiën: alleenstaanden, stellen, gezinnen en studenten. Of je nu begint met budgetteren of je bestaande overzicht wilt verbeteren."
        },
        {
          q: "Hoe verschilt FinOverzicht van andere apps?",
          a: "FinOverzicht is volledig gratis (zonder premium versie), gemaakt voor Nederlandse gebruikers, en focust op eenvoud. Je kunt gezinsleden toevoegen, categorieën aanpassen en je schulden bijhouden - allemaal zonder kosten."
        },
        {
          q: "Kan ik FinOverzicht op mijn telefoon gebruiken?",
          a: "Ja! FinOverzicht werkt in elke moderne browser op je telefoon, tablet of computer. Je hebt geen app nodig - open gewoon de website en log in."
        }
      ]
    },
    {
      title: "Account & Registratie",
      icon: Users,
      questions: [
        {
          q: "Hoe maak ik een account aan?",
          a: "Klik op 'Gratis starten' en vul je e-mailadres en een wachtwoord in. Je ontvangt een bevestigingsmail en kunt direct beginnen."
        },
        {
          q: "Kan ik mijn account delen met mijn partner?",
          a: "Op dit moment heeft elk account één eigenaar. Je kunt wel gezinsleden toevoegen om uitgaven per persoon bij te houden, maar zij hebben geen eigen login."
        },
        {
          q: "Wat als ik mijn wachtwoord vergeet?",
          a: "Klik op 'Wachtwoord vergeten' op de inlogpagina. Je ontvangt een e-mail met een link om je wachtwoord te resetten."
        },
        {
          q: "Kan ik mijn account verwijderen?",
          a: "Ja, je kunt je account en alle gegevens verwijderen via de instellingen. Let op: dit is permanent en kan niet ongedaan worden gemaakt."
        }
      ]
    },
    {
      title: "Kosten & Prijzen",
      icon: CreditCard,
      questions: [
        {
          q: "Is FinOverzicht echt gratis?",
          a: "Ja, FinOverzicht is volledig gratis. Er zijn geen verborgen kosten, geen premium versie en geen beperkingen. We geloven dat financieel overzicht voor iedereen toegankelijk moet zijn."
        },
        {
          q: "Waarom is het gratis?",
          a: "We willen bijdragen aan financiële gezondheid in Nederland. FinOverzicht wordt ondersteund door vrijwillige donaties van tevreden gebruikers."
        },
        {
          q: "Moet ik mijn bankgegevens invoeren?",
          a: "Nee, FinOverzicht verbindt niet met je bank. Je voert zelf je transacties in, wat betekent dat je bankgegevens veilig blijven."
        },
        {
          q: "Kan ik doneren?",
          a: "Ja! Als je FinOverzicht waardevol vindt, kun je een vrijwillige donatie doen. Dit helpt ons de service gratis te houden voor iedereen."
        }
      ]
    },
    {
      title: "Privacy & Veiligheid",
      icon: Shield,
      questions: [
        {
          q: "Zijn mijn gegevens veilig?",
          a: "Ja, we nemen privacy zeer serieus. Je gegevens worden versleuteld opgeslagen en we delen nooit informatie met derden. Zie ons privacybeleid voor details."
        },
        {
          q: "Kan iemand anders mijn gegevens zien?",
          a: "Nee, alleen jij hebt toegang tot je account. Je gegevens zijn beschermd met je persoonlijke inloggegevens en worden beveiligd opgeslagen."
        },
        {
          q: "Wordt mijn data verkocht aan adverteerders?",
          a: "Absoluut niet. We verkopen geen gegevens en tonen geen advertenties. Je privacy is gegarandeerd."
        },
        {
          q: "Waar worden mijn gegevens opgeslagen?",
          a: "Je gegevens worden opgeslagen op beveiligde servers in Europa, conform de AVG/GDPR regelgeving."
        }
      ]
    },
    {
      title: "Functies",
      icon: Smartphone,
      questions: [
        {
          q: "Kan ik categorieën aanpassen?",
          a: "Ja, je kunt eigen categorieën maken, bewerken en verwijderen. Zo past FinOverzicht perfect bij jouw manier van budgetteren."
        },
        {
          q: "Kan ik terugkerende transacties instellen?",
          a: "Ja, je kunt aangeven dat een transactie maandelijks terugkeert (zoals huur of salaris). Deze worden dan automatisch meegenomen in je overzichten."
        },
        {
          q: "Hoe voeg ik gezinsleden toe?",
          a: "Ga naar Instellingen > Gezinsleden en voeg namen toe. Je kunt daarna transacties en schulden toewijzen aan specifieke gezinsleden."
        },
        {
          q: "Kan ik mijn data exporteren?",
          a: "Ja, je kunt je transacties exporteren naar Excel of PDF via de exportfunctie op de inkomsten- en uitgavenpagina's."
        }
      ]
    },
    {
      title: "Technisch",
      icon: RefreshCw,
      questions: [
        {
          q: "In welke browsers werkt FinOverzicht?",
          a: "FinOverzicht werkt in alle moderne browsers: Chrome, Firefox, Safari, Edge en Opera. We raden aan de nieuwste versie te gebruiken."
        },
        {
          q: "Werkt FinOverzicht offline?",
          a: "Nee, je hebt een internetverbinding nodig om FinOverzicht te gebruiken. Je gegevens worden real-time gesynchroniseerd."
        },
        {
          q: "Ik heb een bug gevonden, wat nu?",
          a: "Stuur ons een bericht via de contactpagina met een beschrijving van het probleem. We lossen bugs zo snel mogelijk op."
        },
        {
          q: "Komt er een mobiele app?",
          a: "Op dit moment focussen we op de webversie, die prima werkt op mobiel. Een native app staat op onze roadmap voor de toekomst."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <HelpCircle className="w-4 h-4" />
                Veelgestelde Vragen
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Hoe kunnen we{" "}
                <span className="text-primary">je helpen?</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Vind antwoorden op de meest gestelde vragen over FinOverzicht. 
                Staat je vraag er niet bij? Neem dan contact met ons op.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
                  </div>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((item, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`${categoryIndex}-${index}`}
                        className="bg-card border border-border rounded-lg px-6"
                      >
                        <AccordionTrigger className="text-left text-foreground hover:no-underline">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Nog vragen?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Staat je vraag er niet bij? Neem gerust contact met ons op. 
                We helpen je graag verder.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/contact">
                    Contact Opnemen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/auth">Gratis Starten</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
};

export default FAQ;
