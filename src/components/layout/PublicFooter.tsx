import { Link } from 'react-router-dom';
import { Wallet } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Wallet className="h-6 w-6 text-primary" />
              <span className="font-heading font-bold text-lg">FinOverzicht</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Jouw gratis tool voor financieel overzicht. Beheer je inkomsten, uitgaven en schulden op één plek.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/functies" className="text-muted-foreground hover:text-primary transition-colors">
                  Functies
                </Link>
              </li>
              <li>
                <Link to="/auth?mode=signup" className="text-muted-foreground hover:text-primary transition-colors">
                  Gratis starten
                </Link>
              </li>
            </ul>
          </div>

          {/* Bedrijf */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Bedrijf</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/over-ons" className="text-muted-foreground hover:text-primary transition-colors">
                  Over ons
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Juridisch</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacybeleid
                </Link>
              </li>
              <li>
                <Link to="/voorwaarden" className="text-muted-foreground hover:text-primary transition-colors">
                  Algemene voorwaarden
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} FinOverzicht.nl — Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
}
