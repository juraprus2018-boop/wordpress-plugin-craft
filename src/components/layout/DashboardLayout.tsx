import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  LayoutDashboard, 
  TrendingUp, 
  TrendingDown, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Wallet,
  CreditCard,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', color: 'text-primary' },
  { href: '/income', icon: TrendingUp, label: 'Inkomsten', color: 'text-emerald-500' },
  { href: '/expenses', icon: TrendingDown, label: 'Uitgaven', color: 'text-coral' },
  { href: '/debts', icon: CreditCard, label: 'Schulden', color: 'text-amber-500' },
  { href: '/settings', icon: Settings, label: 'Instellingen', color: 'text-muted-foreground' },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 glass-card border-b border-border/50">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-glow">
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-lg">FinOverzicht</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-xl hover:bg-primary/10"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-72 transition-all duration-300 ease-out lg:translate-x-0",
          "bg-gradient-to-b from-card via-card to-card/95 border-r border-border/50",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="hidden lg:flex items-center gap-3 h-20 px-6 border-b border-border/50">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-glow">
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-heading font-bold text-xl block">FinOverzicht</span>
              <span className="text-xs text-muted-foreground">Financieel beheer</span>
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-4 py-6 mt-16 lg:mt-0">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-glow"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <div className={cn(
                      "flex items-center justify-center w-9 h-9 rounded-lg transition-colors",
                      isActive 
                        ? "bg-primary-foreground/20" 
                        : "bg-muted group-hover:bg-background"
                    )}>
                      <item.icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : item.color)} />
                    </div>
                    <span className="flex-1">{item.label}</span>
                    {isActive && (
                      <ChevronRight className="h-4 w-4 opacity-60" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Quick Stats Card */}
            <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
              <p className="text-xs font-medium text-primary mb-1">Pro tip</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Voeg regelmatig je transacties toe voor het beste overzicht van je financiën.
              </p>
            </div>
          </ScrollArea>

          {/* Logout */}
          <div className="p-4 border-t border-border/50">
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="w-full justify-start gap-3 rounded-xl text-muted-foreground hover:text-coral hover:bg-coral/10 transition-colors"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted">
                <LogOut className="h-5 w-5" />
              </div>
              Uitloggen
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-72 pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}