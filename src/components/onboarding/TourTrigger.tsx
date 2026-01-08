import { Button } from '@/components/ui/button';
import { HelpCircle, RotateCcw } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface TourTriggerProps {
  onStartTour: () => void;
  hasCompleted: boolean;
}

export function TourTrigger({ onStartTour, hasCompleted }: TourTriggerProps) {
  if (!hasCompleted) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 z-50 rounded-full w-12 h-12 shadow-lg bg-card border-border/50 hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
          onClick={onStartTour}
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Rondleiding herstarten</p>
      </TooltipContent>
    </Tooltip>
  );
}