import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TrendingUp, Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/functies', label: 'Functies' },
  { href: '/faq', label: 'FAQ' },
];

const seoPages = [
  { href: '/huishoudboekje', label: 'Huishoudboekje' },
  { href: '/budget-beheren', label: 'Budget beheren' },
  { href: '/sparen-tips', label: 'Sparen tips' },
  { href: '/geld-besparen', label: 'Geld besparen' },
  { href: '/schulden-aflossen', label: 'Schulden aflossen' },
  { href: '/financiele-planning', label: 'Financiële planning' },
  { href: '/vaste-lasten-overzicht', label: 'Vaste lasten' },
  { href: '/inkomen-beheren', label: 'Inkomen beheren' },
];

export function PublicHeader() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/30 transition-colors" />
              <div className="relative w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>
            <span className="font-heading font-bold text-xl tracking-tight">FinOverzicht</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                {location.pathname === item.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </Link>
            ))}
            
            {/* Dropdown for SEO pages */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors rounded-full flex items-center gap-1",
                    seoPages.some(page => location.pathname === page.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Tips & Gidsen
                  <ChevronDown className="h-4 w-4" />
                  {seoPages.some(page => location.pathname === page.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56 bg-background border border-border shadow-lg z-50">
                {seoPages.map((page) => (
                  <DropdownMenuItem key={page.href} asChild>
                    <Link
                      to={page.href}
                      className={cn(
                        "w-full cursor-pointer",
                        location.pathname === page.href && "text-primary font-medium"
                      )}
                    >
                      {page.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" className="rounded-full">
                Inloggen
              </Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button className="rounded-full bg-primary hover:bg-primary/90 transition-colors text-primary-foreground font-semibold">
                Gratis starten
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={cn(
            "md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <nav className="flex flex-col p-4 gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
            
            {/* SEO Pages in mobile */}
            <div className="mt-2 pt-2 border-t border-border">
              <span className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tips & Gidsen</span>
              {seoPages.map((page) => (
                <Link
                  key={page.href}
                  to={page.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-colors block",
                    location.pathname === page.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  {page.label}
                </Link>
              ))}
            </div>
            
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">Inloggen</Button>
              </Link>
              <Link to="/auth?mode=signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Gratis starten
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
