import { useState, useEffect, useCallback } from 'react';

const PERMISSION_KEY = 'notifications-permission-asked';
const LAST_CHECK_KEY = 'notifications-last-check';

export interface PaymentReminder {
  id: string;
  name: string;
  amount: number;
  dayOfMonth: number;
  type: 'transaction' | 'debt';
  daysUntilDue: number;
}

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported('Notification' in window);
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!isSupported) return false;
    
    const result = await Notification.requestPermission();
    setPermission(result);
    localStorage.setItem(PERMISSION_KEY, 'true');
    return result === 'granted';
  }, [isSupported]);

  const showNotification = useCallback((title: string, options?: NotificationOptions) => {
    if (!isSupported || permission !== 'granted') return null;
    
    return new Notification(title, {
      icon: '/pwa-192x192.png',
      badge: '/pwa-192x192.png',
      ...options,
    });
  }, [isSupported, permission]);

  const checkAndNotifyPayments = useCallback((
    transactions: Array<{
      id: string;
      name: string;
      amount: number;
      day_of_month: number | null;
      is_recurring: boolean | null;
      type: string;
    }>,
    debts: Array<{
      id: string;
      name: string;
      monthly_payment: number;
      day_of_month: number | null;
      remaining_amount: number;
    }>
  ) => {
    if (permission !== 'granted') return [];

    // Check if we already checked today
    const lastCheck = localStorage.getItem(LAST_CHECK_KEY);
    const today = new Date().toDateString();
    if (lastCheck === today) return [];

    localStorage.setItem(LAST_CHECK_KEY, today);

    const currentDay = new Date().getDate();
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const reminders: PaymentReminder[] = [];

    // Check recurring transactions
    transactions
      .filter(t => t.is_recurring && t.day_of_month && t.type === 'expense')
      .forEach(t => {
        const dayOfMonth = t.day_of_month!;
        let daysUntil = dayOfMonth - currentDay;
        if (daysUntil < 0) daysUntil += daysInMonth;
        
        if (daysUntil <= 3 && daysUntil >= 0) {
          reminders.push({
            id: t.id,
            name: t.name,
            amount: t.amount,
            dayOfMonth: dayOfMonth,
            type: 'transaction',
            daysUntilDue: daysUntil,
          });
        }
      });

    // Check debts
    debts.forEach(d => {
      // Check if almost paid off (less than 2 payments remaining)
      if (d.remaining_amount > 0 && d.remaining_amount <= d.monthly_payment * 2) {
        const paymentsLeft = Math.ceil(d.remaining_amount / d.monthly_payment);
        showNotification(
          `🎉 ${d.name} bijna afbetaald!`,
          {
            body: `Nog ${paymentsLeft} betaling${paymentsLeft > 1 ? 'en' : ''} (€${d.remaining_amount.toFixed(2)})`,
            tag: `debt-almost-done-${d.id}`,
          }
        );
      }

      // Check upcoming debt payments
      if (d.day_of_month) {
        let daysUntil = d.day_of_month - currentDay;
        if (daysUntil < 0) daysUntil += daysInMonth;
        
        if (daysUntil <= 3 && daysUntil >= 0) {
          reminders.push({
            id: d.id,
            name: d.name,
            amount: d.monthly_payment,
            dayOfMonth: d.day_of_month,
            type: 'debt',
            daysUntilDue: daysUntil,
          });
        }
      }
    });

    // Show notification for upcoming payments
    if (reminders.length > 0) {
      const todayPayments = reminders.filter(r => r.daysUntilDue === 0);
      const upcomingPayments = reminders.filter(r => r.daysUntilDue > 0);

      if (todayPayments.length > 0) {
        const total = todayPayments.reduce((sum, r) => sum + r.amount, 0);
        showNotification(
          `💰 ${todayPayments.length} betaling${todayPayments.length > 1 ? 'en' : ''} vandaag`,
          {
            body: `Totaal: €${total.toFixed(2)} - ${todayPayments.map(r => r.name).join(', ')}`,
            tag: 'payments-today',
          }
        );
      }

      if (upcomingPayments.length > 0) {
        const soonest = upcomingPayments.sort((a, b) => a.daysUntilDue - b.daysUntilDue)[0];
        showNotification(
          `📅 Aankomende betalingen`,
          {
            body: `${soonest.name} over ${soonest.daysUntilDue} dag${soonest.daysUntilDue > 1 ? 'en' : ''} (€${soonest.amount.toFixed(2)})`,
            tag: 'payments-upcoming',
          }
        );
      }
    }

    return reminders;
  }, [permission, showNotification]);

  const hasAskedPermission = localStorage.getItem(PERMISSION_KEY) === 'true';

  return {
    permission,
    isSupported,
    hasAskedPermission,
    requestPermission,
    showNotification,
    checkAndNotifyPayments,
  };
}
