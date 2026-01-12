import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  TrendingUp, 
  Bookmark, 
  User, 
  PlusCircle,
  Hash,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/lib/auth';
import { POST_CATEGORIES } from '@/hooks/useCommunity';
import { cn } from '@/lib/utils';

interface CommunitySidebarProps {
  onNewPost: () => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function CommunitySidebar({ onNewPost, activeFilter, onFilterChange }: CommunitySidebarProps) {
  const { user } = useAuth();
  const location = useLocation();

  const mainNavItems = [
    { id: 'all', label: 'Alle berichten', icon: Home },
    { id: 'trending', label: 'Populair', icon: TrendingUp },
  ];

  const userNavItems = user ? [
    { id: 'bookmarks', label: 'Opgeslagen', icon: Bookmark },
    { id: 'my-posts', label: 'Mijn berichten', icon: User },
  ] : [];

  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <div className="sticky top-24 space-y-6">
        {/* New Post Button */}
        {user && (
          <Button onClick={onNewPost} className="w-full gap-2">
            <PlusCircle className="h-4 w-4" />
            Nieuw bericht
          </Button>
        )}

        {/* Main Navigation */}
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <Button
              key={item.id}
              variant={activeFilter === item.id ? 'secondary' : 'ghost'}
              className={cn(
                "w-full justify-start gap-3",
                activeFilter === item.id && "bg-primary/10 text-primary"
              )}
              onClick={() => onFilterChange(item.id)}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>

        {/* User Navigation */}
        {userNavItems.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-3 py-2">
              Persoonlijk
            </p>
            {userNavItems.map((item) => (
              <Button
                key={item.id}
                variant={activeFilter === item.id ? 'secondary' : 'ghost'}
                className={cn(
                  "w-full justify-start gap-3",
                  activeFilter === item.id && "bg-primary/10 text-primary"
                )}
                onClick={() => onFilterChange(item.id)}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </div>
        )}

        {/* Categories */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-3 py-2">
            Categorieën
          </p>
          <ScrollArea className="h-[200px]">
            {POST_CATEGORIES.map((category) => (
              <Button
                key={category.value}
                variant={activeFilter === `cat-${category.value}` ? 'secondary' : 'ghost'}
                className={cn(
                  "w-full justify-start gap-3",
                  activeFilter === `cat-${category.value}` && "bg-primary/10 text-primary"
                )}
                onClick={() => onFilterChange(`cat-${category.value}`)}
              >
                <Hash className="h-4 w-4" />
                {category.label}
              </Button>
            ))}
          </ScrollArea>
        </div>

        {/* Community Stats Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-5 w-5 text-primary" />
            <span className="font-heading font-semibold">Community</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Deel je financiële ervaringen, stel vragen en help anderen met hun geldzaken.
          </p>
        </div>
      </div>
    </aside>
  );
}
