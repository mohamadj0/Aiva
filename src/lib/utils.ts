import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const MOCK_UNIVERSITIES = [
  { domain: 'harvard.edu', name: 'Harvard University', union: 'Harvard Union' },
  { domain: 'mit.edu', name: 'Massachusetts Institute of Technology', union: 'MIT Union' },
  { domain: 'sharif.edu', name: 'Sharif University of Technology', union: 'Sharif Union' },
  { domain: 'tsinghua.edu.cn', name: 'Tsinghua University', union: 'Tsinghua Union' },
  { domain: 'ox.ac.uk', name: 'University of Oxford', union: 'Oxford Union' },
];
