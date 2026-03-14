import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'accent' | 'gray';
}

export default function Badge({ variant = 'primary', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
        {
          'bg-fim-primary/10 text-fim-primary': variant === 'primary',
          'bg-fim-accent/20 text-fim-primary': variant === 'accent',
          'bg-gray-100 text-gray-600': variant === 'gray',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
