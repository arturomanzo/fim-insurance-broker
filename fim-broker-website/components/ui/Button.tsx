import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-fim-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-fim-primary text-white hover:bg-fim-light shadow-md hover:shadow-lg':
              variant === 'primary',
            'bg-fim-accent text-fim-primary hover:bg-yellow-400 shadow-md hover:shadow-lg':
              variant === 'secondary',
            'border-2 border-fim-primary text-fim-primary hover:bg-fim-primary hover:text-white':
              variant === 'outline',
            'text-fim-primary hover:bg-fim-primary/10': variant === 'ghost',
          },
          {
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-5 py-2.5 text-base': size === 'md',
            'px-7 py-3.5 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
