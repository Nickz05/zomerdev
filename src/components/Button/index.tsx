import React from 'react'

type Variant = 'primary' | 'outline'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  as?: 'button' | 'a'
  href?: string
}

export default function Button({
  variant = 'primary',
  as: Tag = 'button',
  href,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'group relative inline-flex items-center justify-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-navy cursor-pointer overflow-hidden'

  const variants: Record<Variant, string> = {
    primary: 'bg-navy text-white hover:bg-[#16314F] active:scale-[0.98]',
    outline: 'border border-[var(--line)] bg-transparent text-navy hover:bg-[var(--surface)] active:scale-[0.98]',
  }

  const shimmer = (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out bg-gradient-to-r from-transparent via-white/15 to-transparent"
    />
  )

  const classes = `${base} ${variants[variant]} ${className}`

  if (Tag === 'a') {
    return (
      <a href={href} className={classes}>
        {shimmer}
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {shimmer}
      {children}
    </button>
  )
}
