import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// utility function to efficiently merge Tailwind CSS classes in JS without style conflicts.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
