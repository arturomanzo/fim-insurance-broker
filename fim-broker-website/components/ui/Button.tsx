'use client'

import { forwardRef } from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'outline-white'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  href?: string
  external?: boolean
}

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

const variants = {
  primary:
    'bg-accent text-white hover:bg-accent-dark focus:ring-accent shadow-sm hover:shadow-md',
  secondary:
    'bg-primary text-white hover:bg-primary-light focus:ring-primary shadow-sm hover:shadow-md',
  outline:
    'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
  ghost:
    'text-primary hover:bg-primary/10 focus:ring-primary',
  'outline-white':
    'border-2 border-white text-white hover:bg-white hover:text-primary focus:ring-white',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading,
      children,
      disabled,
      href,
      external,
      ...props
    },
    ref
  ) => {
    const classes = clsx(
      base,
      variants[variant],
      sizes[size],
      disabled || loading ? 'opacity-60 cursor-not-allowed' : '',
      className
    )

    const spinner = loading ? (
      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    ) : null

    // Render as external anchor
    if (href && external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {spinner}
          {children}
        </a>
      )
    }

    // Render as Next.js Link
    if (href) {
      return (
        <Link href={href} className={classes}>
          {spinner}
          {children}
        </Link>
      )
    }

    // Render as button (default)
    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {spinner}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
