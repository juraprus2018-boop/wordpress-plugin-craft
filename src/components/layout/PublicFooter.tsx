import { Link } from 'react-router-dom';
import { TrendingUp, Mail, ArrowUpRight } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border/50 bg-card">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight">FinOverzicht</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              Jouw gratis tool voor financieel overzicht. Beheer je inkomsten, uitgaven en schulden op één plek.
            </p>
            
            {/* Email CTA */}
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>info@finoverzicht.nl</span>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid sm:grid-cols-4 gap-8">
            {/* Financiële Tips */}
            <div>
              <h3 className="font-heading font-semibold mb-5 text-foreground">Financiële Tips</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/huishoudboekje" 
                    className="group text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    Huishoudboekje
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/budget-beheren" 
                    className="group text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    Budget beheren
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/sparen-tips" 
                    className="group text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    Sparen tips
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/geld-besparen" 
                    className="group text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    Geld besparen
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Financieel Beheer */}
            <div>
              <h3 className="font-heading font-semibold mb-5 text-foreground">Financieel Beheer</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/schulden-aflossen" 
                    className="group text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    Schulden aflossen
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/financiele-planning" 
                    className="group text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    Financiële planning
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/vaste-lasten-overzicht" 
                    className="group text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    Vaste lasten
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/inkomen-beheren" 
                    className="group text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    Inkomen beheren
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Product & Bedrijf */}
            <div>
              <h3 className="font-heading font-semibold mb-5 text-foreground">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/wat-is-finoverzicht" 
                    className="group text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    Wat is FinOverzicht?
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/functies" 
                    className="group text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    Functies
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/faq" 
                    className="group text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    FAQ
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/over-ons" 
                    className="group text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    Over ons
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="group text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    Contact
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Juridisch */}
            <div>
              <h3 className="font-heading font-semibold mb-5 text-foreground">Juridisch</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/privacy" 
                    className="group text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    Privacybeleid
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/voorwaarden" 
                    className="group text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    Algemene voorwaarden
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FinOverzicht.nl — Alle rechten voorbehouden.
          </p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Gemaakt met</span>
            <span className="text-primary">♥</span>
            <span>in Nederland</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
