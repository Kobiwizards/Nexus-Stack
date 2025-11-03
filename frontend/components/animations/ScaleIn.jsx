'use client'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'

export const ScaleIn = ({ 
  children, 
  className,
  delay = 0 
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-500 ease-out',
        inView 
          ? 'opacity-100 scale-100' 
          : 'opacity-0 scale-90',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}