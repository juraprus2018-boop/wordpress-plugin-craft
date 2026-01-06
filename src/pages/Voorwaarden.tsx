import { useSEO } from '@/hooks/useSEO';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';

export default function Voorwaarden() {
  useSEO({
    title: 'Algemene Voorwaarden - FinOverzicht',
    description: 'Lees de algemene voorwaarden van FinOverzicht. Informatie over het gebruik van onze gratis huishoudboekje dienst.',
    canonical: 'https://www.finoverzicht.nl/voorwaarden'
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader />

      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
            <h1 className="font-heading text-4xl font-bold mb-8">Algemene Voorwaarden</h1>
            
            <p className="text-muted-foreground">
              Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">1. Algemeen</h2>
            <p>
              Door gebruik te maken van FinOverzicht ga je akkoord met deze algemene voorwaarden. 
              FinOverzicht is een gratis dienst voor het bijhouden van persoonlijke financiën.
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">2. Gebruik van de dienst</h2>
            <p>
              Je bent zelf verantwoordelijk voor de gegevens die je invoert in FinOverzicht. 
              De dienst is bedoeld als hulpmiddel voor persoonlijk financieel overzicht en 
              vervangt geen professioneel financieel advies.
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">3. Account</h2>
            <p>
              Om gebruik te maken van FinOverzicht heb je een account nodig. 
              Je bent verantwoordelijk voor het geheimhouden van je inloggegevens.
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">4. Aansprakelijkheid</h2>
            <p>
              FinOverzicht wordt aangeboden "zoals het is". We doen ons best om de dienst 
              beschikbaar en betrouwbaar te houden, maar kunnen geen garanties geven. 
              We zijn niet aansprakelijk voor schade die voortvloeit uit het gebruik van de dienst.
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">5. Wijzigingen</h2>
            <p>
              We behouden het recht om deze voorwaarden te wijzigen. Bij belangrijke wijzigingen 
              zullen we je hiervan op de hoogte stellen.
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">6. Beëindiging</h2>
            <p>
              Je kunt op elk moment stoppen met het gebruik van FinOverzicht door je account te verwijderen. 
              We behouden het recht om accounts te beëindigen die in strijd handelen met deze voorwaarden.
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">7. Contact</h2>
            <p>
              Heb je vragen over deze voorwaarden? Neem dan contact met ons op via{' '}
              <a href="mailto:info@finoverzicht.nl" className="text-primary hover:underline">
                info@finoverzicht.nl
              </a>.
            </p>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
