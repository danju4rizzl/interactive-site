export interface ScrambleInProps {
  text: string;
  delay: number;
  triggered: boolean;
  className?: string;
}

export interface ScrambleTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
}

export interface SquashHamburgerProps {
  isOpen: boolean;
  isMobile?: boolean;
}

export interface SynapseXLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export interface TechnologyItem {
  title: string;
  description: string;
}

export interface MetricItem {
  value: string;
  label: string;
}

export interface ArchitectureLayer {
  layerNumber: string;
  title: string;
}
