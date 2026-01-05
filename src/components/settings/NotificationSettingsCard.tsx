import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, BellOff, Check } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';

export const NotificationSettingsCard = () => {
  const { permission, isSupported, requestPermission } = useNotifications();

  if (!isSupported) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Meldingen
          </CardTitle>
          <CardDescription>
            Herinneringen voor betalingen en schulden
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Je browser ondersteunt geen meldingen.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Meldingen
        </CardTitle>
        <CardDescription>
          Herinneringen voor betalingen en schulden
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Betalingsherinneringen</p>
            <p className="text-sm text-muted-foreground">
              Ontvang meldingen 3 dagen voor een betaling
            </p>
          </div>
          
          {permission === 'granted' ? (
            <div className="flex items-center gap-2 text-primary">
              <Check className="h-4 w-4" />
              <span className="text-sm font-medium">Ingeschakeld</span>
            </div>
          ) : permission === 'denied' ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <BellOff className="h-4 w-4" />
              <span className="text-sm">Geblokkeerd</span>
            </div>
          ) : (
            <Button size="sm" onClick={requestPermission}>
              Inschakelen
            </Button>
          )}
        </div>

        {permission === 'denied' && (
          <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
            Meldingen zijn geblokkeerd. Ga naar je browserinstellingen om dit te wijzigen.
          </p>
        )}

        {permission === 'granted' && (
          <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg space-y-2">
            <p className="font-medium text-foreground">Je ontvangt meldingen voor:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Betalingen die binnen 3 dagen vervallen</li>
              <li>Betalingen die vandaag moeten gebeuren</li>
              <li>Schulden die bijna afbetaald zijn</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
