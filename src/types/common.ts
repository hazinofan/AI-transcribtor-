/**
 * Supported languages for the application
 */
export type SupportedLanguage = 'en' | 'ar' | 'fr' | 'es' | 'it' | 'de' | 'nl';

/**
 * Theme modes available in the application
 */
export type ThemeMode = 'light' | 'dark';

/**
 * YouTube video ID type
 */
export type VideoId = string;

/**
 * Time format string (MM:SS)
 */
export type TimeString = string;

/**
 * Generic callback function types
 */
export type VoidCallback = () => void;
export type ValueCallback<T> = (value: T) => void;

/**
 * Navigation direction for segments
 */
export type NavigationDirection = 'prev' | 'next';

/**
 * Component size variants
 */
export type ComponentSize = 'small' | 'medium' | 'large';

/**
 * Component status variants
 */
export type ComponentStatus = 'default' | 'success' | 'warning' | 'error';

/**
 * Generic component props that might be shared
 */
export interface BaseComponentProps 
{
  className?: string;
  children?: React.ReactNode;
  size?: ComponentSize;
  disabled?: boolean;
}

/**
 * Media breakpoints for responsive design
 */
export interface MediaBreakpoints 
{
  mobile: number;
  tablet: number;
  desktop: number;
  largeDesktop: number;
}

/**
 * Standard color palette structure
 */
export interface ColorPalette 
{
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
} 