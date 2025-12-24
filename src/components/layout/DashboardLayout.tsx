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
  CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/income', icon: TrendingUp, label: 'Inkomsten' },
  { href: '/expenses', icon: TrendingDown, label: 'Uitgaven' },
  { href: '/debts', icon: CreditCard, label: 'Schulden' },
  { href: '/settings', icon: Settings, label: 'Instellingen' },
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
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-sidebar border-b border-sidebar-border">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-2 text-sidebar-foreground">
            <Wallet className="h-6 w-6 text-sidebar-primary" />
            <span className="font-heading font-bold text-lg">FinOverzicht</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="hidden lg:flex items-center gap-2 h-16 px-6 border-b border-sidebar-border">
            <Wallet className="h-7 w-7 text-sidebar-primary" />
            <span className="font-heading font-bold text-xl text-sidebar-foreground">FinOverzicht</span>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-6 mt-16 lg:mt-0">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </ScrollArea>

          {/* Logout */}
          <div className="p-3 border-t border-sidebar-border">
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <LogOut className="h-5 w-5" />
              Uitloggen
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-foreground/20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}