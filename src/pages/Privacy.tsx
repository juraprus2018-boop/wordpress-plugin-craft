import { useSEO } from '@/hooks/useSEO';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';

export default function Privacy() {
  useSEO({
    title: 'Privacybeleid - FinOverzicht',
    description: 'Lees ons privacybeleid. Bij FinOverzicht nemen we je privacy serieus. Je gegevens zijn veilig en worden nooit gedeeld met derden.',
    canonical: 'https://www.finoverzicht.nl/privacy'
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader />

      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
            <h1 className="font-heading text-4xl font-bold mb-8">Privacybeleid</h1>
            
            <p className="text-muted-foreground">
              Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">1. Introductie</h2>
            <p>
              FinOverzicht respecteert je privacy en doet er alles aan om je persoonlijke gegevens te beschermen. 
              In dit privacybeleid leggen we uit welke gegevens we verzamelen, waarom we dit doen en hoe we ermee omgaan.
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">2. Welke gegevens verzamelen we?</h2>
            <p>We verzamelen de volgende gegevens:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Accountgegevens:</strong> Je naam en e-mailadres wanneer je een account aanmaakt.</li>
              <li><strong>Financiële gegevens:</strong> De inkomsten, uitgaven en schulden die je zelf invoert.</li>
              <li><strong>Technische gegevens:</strong> Standaard serverlogboeken voor beveiliging en probleemoplossing.</li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">3. Waarvoor gebruiken we je gegevens?</h2>
            <p>We gebruiken je gegevens uitsluitend voor:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Het leveren van de FinOverzicht dienst</li>
              <li>Het verbeteren van onze service</li>
              <li>Het sturen van belangrijke mededelingen over je account</li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">4. Delen we je gegevens?</h2>
            <p>
              Nee. We verkopen je gegevens nooit aan derden. We delen je gegevens alleen als dit wettelijk verplicht is.
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">5. Beveiliging</h2>
            <p>
              We nemen passende technische en organisatorische maatregelen om je gegevens te beschermen tegen 
              ongeautoriseerde toegang, verlies of misbruik.
            </p>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">6. Je rechten</h2>
            <p>Je hebt het recht om:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Je gegevens in te zien</li>
              <li>Je gegevens te laten corrigeren</li>
              <li>Je account en gegevens te laten verwijderen</li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold mt-8 mb-4">7. Contact</h2>
            <p>
              Heb je vragen over dit privacybeleid? Neem dan contact met ons op via{' '}
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
