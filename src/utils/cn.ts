import { clsx, type ClassValue } from 'clsx';

/**
 * Utility function to merge class names with clsx
 * Useful for conditional styling with Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
