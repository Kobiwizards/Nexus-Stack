'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  href,
  ...props 
}) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center'
  
  const variants = {
    primary: 'bg-primary-700 text-white hover:bg-primary-600 border border-primary-600 shadow-lg shadow-primary-900/25',
    secondary: 'glass-morphism text-dark-300 border border-dark-600 hover:border-primary-500 hover:text-white',
    outline: 'border border-dark-400 text-dark-300 hover:border-primary-500 hover:text-white bg-transparent',
    ghost: 'text-dark-300 hover:text-white hover:bg-dark-800/50 border border-transparent'
  }
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  const buttonContent = (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  )

  if (href) {
    return (
      <Link href={href} className="inline-flex">
        {buttonContent}
      </Link>
    )
  }

  return (
    <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}