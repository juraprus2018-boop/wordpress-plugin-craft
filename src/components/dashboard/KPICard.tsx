import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
  variant?: 'default' | 'accent' | 'success' | 'warning';
}

export function KPICard({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  className,
  variant = 'default'
}: KPICardProps) {
  const iconBgClasses = {
    default: 'bg-gradient-to-br from-primary/15 to-primary/5 text-primary',
    accent: 'bg-gradient-to-br from-accent/15 to-accent/5 text-accent',
    success: 'bg-gradient-to-br from-success/15 to-success/5 text-success',
    warning: 'bg-gradient-to-br from-warning/15 to-warning/5 text-warning',
  };

  return (
    <div className={cn(
      "group relative overflow-hidden rounded-2xl bg-card border border-border/50",
      "p-4 sm:p-5 transition-all duration-300",
      "hover:shadow-lg hover:border-border hover:scale-[1.01]",
      "animate-fade-in",
      className
    )}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-muted/20 pointer-events-none" />
      
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0 space-y-1 sm:space-y-2">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
            {title}
          </p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading tracking-tight truncate">
            {value}
          </p>
          {trend && trendValue && (
            <p className={cn(
              "text-xs sm:text-sm font-medium flex items-center gap-1",
              trend === 'up' && "text-success",
              trend === 'down' && "text-destructive",
              trend === 'neutral' && "text-muted-foreground"
            )}>
              {trend === 'up' && (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              )}
              {trend === 'down' && (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                </svg>
              )}
              {trendValue}
            </p>
          )}
        </div>
        <div className={cn(
          "shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center",
          "transition-transform duration-300 group-hover:scale-110",
          iconBgClasses[variant]
        )}>
          <div className="w-5 h-5 sm:w-6 sm:h-6">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}
