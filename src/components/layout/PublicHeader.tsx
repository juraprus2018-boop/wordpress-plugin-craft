import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wallet, Menu, X, ChevronDown, Sparkles, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/wat-is-finoverzicht', label: 'Wat is FinOverzicht?' },
  { href: '/functies', label: 'Functies' },
  { href: '/install', label: 'Download App' },
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
          ? "glass-card border-b border-border/50 py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-glow transition-transform group-hover:scale-105">
                <Wallet className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>
            <span className="font-heading font-bold text-xl tracking-tight">FinOverzicht</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-muted/50 rounded-full px-2 py-1.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full",
                  location.pathname === item.href
                    ? "text-primary-foreground bg-primary shadow-glow"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/80"
                )}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Dropdown for SEO pages */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full flex items-center gap-1",
                    seoPages.some(page => location.pathname === page.href)
                      ? "text-primary-foreground bg-primary shadow-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/80"
                  )}
                >
                  Tips & Gidsen
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56 glass-card border-border/50 shadow-xl mt-2">
                {seoPages.map((page) => (
                  <DropdownMenuItem key={page.href} asChild>
                    <Link
                      to={page.href}
                      className={cn(
                        "w-full cursor-pointer rounded-lg transition-colors",
                        location.pathname === page.href && "text-primary font-medium bg-primary/10"
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
              <Button variant="ghost" className="rounded-full font-medium">
                Inloggen
              </Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button className="rounded-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-glow transition-all duration-200 text-primary-foreground font-semibold gap-2">
                <Sparkles className="h-4 w-4" />
                Gratis starten
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-xl hover:bg-primary/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={cn(
            "md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-xl overflow-hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          )}
        >
          <nav className="flex flex-col p-4 gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
            
            {/* SEO Pages in mobile */}
            <div className="mt-3 pt-3 border-t border-border/50">
              <span className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="h-3 w-3" />
                Tips & Gidsen
              </span>
              <div className="grid grid-cols-2 gap-1 mt-2">
                {seoPages.map((page) => (
                  <Link
                    key={page.href}
                    to={page.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                      location.pathname === page.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {page.label}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/50">
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full rounded-xl border-border/50">
                  Inloggen
                </Button>
              </Link>
              <Link to="/auth?mode=signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full rounded-xl bg-gradient-to-r from-primary to-primary/90 shadow-glow text-primary-foreground font-semibold gap-2">
                  <Sparkles className="h-4 w-4" />
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
