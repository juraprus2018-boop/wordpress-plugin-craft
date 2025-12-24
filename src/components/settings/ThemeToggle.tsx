import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Moon, Sun, Monitor } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme('system');
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    if (newTheme === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', systemDark);
    } else {
      root.classList.toggle('dark', newTheme === 'dark');
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sun className="h-5 w-5" />
          Weergave
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Kies je voorkeur voor licht of donker thema.
        </p>

        <div className="space-y-3">
          <div 
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
              theme === 'light' ? 'bg-primary/10 border border-primary' : 'bg-muted/50 hover:bg-muted'
            }`}
            onClick={() => handleThemeChange('light')}
          >
            <div className="flex items-center gap-3">
              <Sun className="h-5 w-5" />
              <Label className="cursor-pointer">Licht</Label>
            </div>
            <Switch 
              checked={theme === 'light'} 
              onCheckedChange={() => handleThemeChange('light')}
            />
          </div>

          <div 
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
              theme === 'dark' ? 'bg-primary/10 border border-primary' : 'bg-muted/50 hover:bg-muted'
            }`}
            onClick={() => handleThemeChange('dark')}
          >
            <div className="flex items-center gap-3">
              <Moon className="h-5 w-5" />
              <Label className="cursor-pointer">Donker</Label>
            </div>
            <Switch 
              checked={theme === 'dark'} 
              onCheckedChange={() => handleThemeChange('dark')}
            />
          </div>

          <div 
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
              theme === 'system' ? 'bg-primary/10 border border-primary' : 'bg-muted/50 hover:bg-muted'
            }`}
            onClick={() => handleThemeChange('system')}
          >
            <div className="flex items-center gap-3">
              <Monitor className="h-5 w-5" />
              <Label className="cursor-pointer">Systeem</Label>
            </div>
            <Switch 
              checked={theme === 'system'} 
              onCheckedChange={() => handleThemeChange('system')}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
