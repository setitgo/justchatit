import { ReactNode } from 'react';

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function Link({ href, children, className = '' }: LinkProps) {
  const baseClasses = 'text-gray-600 hover:text-purple-600 transition-colors';
  
  return (
    <a 
      href={href} 
      className={`${baseClasses} ${className}`}
    >
      {children}
    </a>
  );
}