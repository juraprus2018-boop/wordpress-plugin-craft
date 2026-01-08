import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/auth';

export interface TourStep {
  id: string;
  target: string; // CSS selector for the target element
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  action?: 'click' | 'navigate';
  actionTarget?: string;
}

const TOUR_STORAGE_KEY = 'finoverzicht_tour_completed';

export const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    target: '[data-tour="dashboard-title"]',
    title: 'Welkom bij FinOverzicht! 👋',
    content: 'Laten we samen door de app lopen. Deze rondleiding duurt ongeveer 1 minuut.',
    position: 'bottom',
  },
  {
    id: 'kpi-cards',
    target: '[data-tour="kpi-cards"]',
    title: 'Je financiële overzicht',
    content: 'Hier zie je in één oogopslag je inkomsten, uitgaven, nettoresultaat, schulden, leningen en spaarquote.',
    position: 'bottom',
  },
  {
    id: 'member-filter',
    target: '[data-tour="member-filter"]',
    title: 'Filter op gezinslid',
    content: 'Heb je meerdere gezinsleden? Filter hier om per persoon te bekijken of kies "Samen" voor het totaaloverzicht.',
    position: 'bottom',
  },
  {
    id: 'nav-income',
    target: '[data-tour="nav-income"]',
    title: 'Inkomsten beheren',
    content: 'Voeg hier je salaris en andere bronnen van inkomen toe. Kies frequenties zoals maandelijks of jaarlijks.',
    position: 'right',
  },
  {
    id: 'nav-expenses',
    target: '[data-tour="nav-expenses"]',
    title: 'Uitgaven bijhouden',
    content: 'Registreer je vaste lasten zoals huur, verzekeringen en abonnementen. Markeer gedeelde kosten voor eerlijke verdeling.',
    position: 'right',
  },
  {
    id: 'nav-debts',
    target: '[data-tour="nav-debts"]',
    title: 'Schulden & Leningen',
    content: 'Houd je schulden en leningen bij. Registreer betalingen en volg je voortgang naar schuldenvrij.',
    position: 'right',
  },
  {
    id: 'nav-handleiding',
    target: '[data-tour="nav-handleiding"]',
    title: 'Hulp nodig?',
    content: 'In de handleiding vind je uitgebreide uitleg over alle functies.',
    position: 'right',
  },
  {
    id: 'nav-settings',
    target: '[data-tour="nav-settings"]',
    title: 'Instellingen',
    content: 'Voeg gezinsleden toe, beheer categorieën, kies je thema en exporteer je gegevens.',
    position: 'right',
  },
];

export function useOnboardingTour() {
  const { user } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(true);

  useEffect(() => {
    if (user) {
      const storageKey = `${TOUR_STORAGE_KEY}_${user.id}`;
      const completed = localStorage.getItem(storageKey);
      setHasCompleted(completed === 'true');
      
      // Auto-start tour for new users after a short delay
      if (!completed) {
        const timer = setTimeout(() => {
          setIsActive(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [user]);

  const startTour = useCallback(() => {
    setCurrentStep(0);
    setIsActive(true);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeTour();
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const skipTour = useCallback(() => {
    completeTour();
  }, []);

  const completeTour = useCallback(() => {
    setIsActive(false);
    setHasCompleted(true);
    if (user) {
      localStorage.setItem(`${TOUR_STORAGE_KEY}_${user.id}`, 'true');
    }
  }, [user]);

  const resetTour = useCallback(() => {
    if (user) {
      localStorage.removeItem(`${TOUR_STORAGE_KEY}_${user.id}`);
      setHasCompleted(false);
    }
  }, [user]);

  return {
    isActive,
    currentStep,
    totalSteps: tourSteps.length,
    currentStepData: tourSteps[currentStep],
    hasCompleted,
    startTour,
    nextStep,
    prevStep,
    skipTour,
    completeTour,
    resetTour,
  };
}