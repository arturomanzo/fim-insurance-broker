'use client'

import { forwardRef } from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'

// ── Shared style constants ──────────────────────────────────────────────────

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
} as const

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
} as const

// ── Shared visual props ─────────────────────────────────────────────────────

interface ButtonVisualProps {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  loading?: boolean
  className?: string
  children: React.ReactNode
}

// ── Discriminated union: button vs link vs external anchor ──────────────────

type ButtonAsButton = ButtonVisualProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    href?: never
    external?: never
  }

type ButtonAsLink = ButtonVisualProps & {
  href: string
  external?: false
  disabled?: boolean
}

type ButtonAsExternal = ButtonVisualProps & {
  href: string
  external: true
  disabled?: boolean
}

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsExternal

// ── Spinner ─────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

// ── Button component ─────────────────────────────────────────────────────────

const Button = forwardRef<HTMLButtonElement, ButtonAsButton>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const classes = clsx(
      base,
      variants[variant],
      sizes[size],
      disabled || loading ? 'opacity-60 cursor-not-allowed' : '',
      className
    )

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Spinner />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

// ── ButtonLink — renders as Next.js Link or external anchor ──────────────────

function ButtonLink({
  href,
  external,
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  className,
  children,
}: ButtonAsLink | ButtonAsExternal) {
  const classes = clsx(
    base,
    variants[variant],
    sizes[size],
    disabled || loading ? 'opacity-60 cursor-not-allowed pointer-events-none' : '',
    className
  )

  if (external) {
    return (
      <a
        href={disabled ? undefined : href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={disabled || undefined}
      >
        {loading && <Spinner />}
        {children}
      </a>
    )
  }

  return (
    <Link
      href={disabled ? '#' : href}
      className={classes}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
    >
      {loading && <Spinner />}
      {children}
    </Link>
  )
}

// ── Unified export ────────────────────────────────────────────────────────────

/**
 * Button — renders as <button>, <Link>, or <a> depending on props.
 *
 * - No href → <button> (supports ref, form props, disabled, etc.)
 * - href (no external) → Next.js <Link>
 * - href + external → <a target="_blank" rel="noopener noreferrer">
 *
 * Note: the `href=""` edge case (empty string) renders as <button>.
 */
function ButtonUnified(props: ButtonProps) {
  if (props.href) {
    // TypeScript narrows correctly here
    return <ButtonLink {...(props as ButtonAsLink | ButtonAsExternal)} />
  }
  // Cast to ButtonAsButton for forwardRef component — href is `never` in this branch
  return <Button {...(props as ButtonAsButton)} />
}

ButtonUnified.displayName = 'Button'

export default ButtonUnified
