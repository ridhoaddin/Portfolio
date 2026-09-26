export interface PreloaderProps {
  onComplete?: () => void;
  durationMs?: number; // Total counter duration in ms (default 1250ms, strictly <= 1500ms)
}

export interface FloatingBadge {
  id: string;
  label: string;
  sublabel?: string;
  bgColor: string; // e.g., #54E182, #E598FF, #6DB8FF, #FFFFFF
  textColor: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  rotation: number; // degrees, e.g. -3 to 4
  floatDuration: number; // seconds
  floatDelay: number; // seconds
  hideOnMobile?: boolean;
}
