import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { X, ChevronLeft, ChevronRight, Sparkles, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TourStep } from '@/hooks/useOnboardingTour';

interface OnboardingTourProps {
  isActive: boolean;
  currentStep: number;
  totalSteps: number;
  stepData: TourStep;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  onComplete: () => void;
}

interface TooltipPosition {
  top: number;
  left: number;
  arrowPosition: 'top' | 'bottom' | 'left' | 'right';
}

export function OnboardingTour({
  isActive,
  currentStep,
  totalSteps,
  stepData,
  onNext,
  onPrev,
  onSkip,
  onComplete,
}: OnboardingTourProps) {
  const [position, setPosition] = useState<TooltipPosition | null>(null);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const calculatePosition = useCallback(() => {
    if (!stepData?.target) return;

    const target = document.querySelector(stepData.target);
    if (!target) {
      // If target not found, show centered
      setPosition({
        top: window.innerHeight / 2 - 100,
        left: window.innerWidth / 2 - 175,
        arrowPosition: 'top',
      });
      setTargetRect(null);
      return;
    }

    const rect = target.getBoundingClientRect();
    setTargetRect(rect);

    const tooltipWidth = 350;
    const tooltipHeight = 200;
    const padding = 16;
    const arrowSize = 12;

    let top = 0;
    let left = 0;
    let arrowPosition = stepData.position;

    switch (stepData.position) {
      case 'bottom':
        top = rect.bottom + padding + arrowSize;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        break;
      case 'top':
        top = rect.top - tooltipHeight - padding - arrowSize;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        break;
      case 'right':
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.right + padding + arrowSize;
        break;
      case 'left':
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.left - tooltipWidth - padding - arrowSize;
        break;
    }

    // Keep within viewport
    left = Math.max(padding, Math.min(left, window.innerWidth - tooltipWidth - padding));
    top = Math.max(padding, Math.min(top, window.innerHeight - tooltipHeight - padding));

    setPosition({ top, left, arrowPosition });
  }, [stepData]);

  useEffect(() => {
    if (!isActive) {
      setIsVisible(false);
      return;
    }

    // Small delay for animation
    const showTimer = setTimeout(() => {
      setIsVisible(true);
      calculatePosition();
    }, 100);

    // Recalculate on resize/scroll
    const handleResize = () => calculatePosition();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, true);

    return () => {
      clearTimeout(showTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize, true);
    };
  }, [isActive, stepData, calculatePosition]);

  if (!isActive || !position) return null;

  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const content = (
    <>
      {/* Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-[9998] transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(2px)',
        }}
        onClick={onSkip}
      />

      {/* Highlight target */}
      {targetRect && (
        <div
          className={cn(
            "fixed z-[9999] rounded-xl transition-all duration-300 pointer-events-none",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{
            top: targetRect.top - 8,
            left: targetRect.left - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5), 0 0 20px rgba(var(--primary), 0.5)',
            border: '2px solid hsl(var(--primary))',
          }}
        />
      )}

      {/* Tooltip */}
      <Card
        className={cn(
          "fixed z-[10000] w-[350px] shadow-2xl border-primary/20 transition-all duration-300",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}
        style={{
          top: position.top,
          left: position.left,
        }}
      >
        {/* Arrow */}
        <div
          className={cn(
            "absolute w-3 h-3 bg-card border-primary/20 rotate-45",
            position.arrowPosition === 'top' && "-top-1.5 left-1/2 -translate-x-1/2 border-t border-l",
            position.arrowPosition === 'bottom' && "-bottom-1.5 left-1/2 -translate-x-1/2 border-b border-r",
            position.arrowPosition === 'left' && "-left-1.5 top-1/2 -translate-y-1/2 border-t border-l",
            position.arrowPosition === 'right' && "-right-1.5 top-1/2 -translate-y-1/2 border-b border-r",
          )}
        />

        <CardContent className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              {isLastStep ? (
                <PartyPopper className="h-5 w-5 text-primary" />
              ) : (
                <Sparkles className="h-5 w-5 text-primary" />
              )}
              <span className="text-xs font-medium text-muted-foreground">
                Stap {currentStep + 1} van {totalSteps}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 -mr-2 -mt-2"
              onClick={onSkip}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress */}
          <Progress value={progress} className="h-1 mb-4" />

          {/* Content */}
          <h3 className="font-heading font-semibold text-lg mb-2">
            {stepData.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            {stepData.content}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSkip}
              className="text-muted-foreground hover:text-foreground"
            >
              Overslaan
            </Button>
            <div className="flex items-center gap-2">
              {!isFirstStep && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onPrev}
                  className="gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Terug
                </Button>
              )}
              <Button
                size="sm"
                onClick={isLastStep ? onComplete : onNext}
                className="gap-1"
              >
                {isLastStep ? (
                  <>
                    Afronden
                    <PartyPopper className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Volgende
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );

  return createPortal(content, document.body);
}