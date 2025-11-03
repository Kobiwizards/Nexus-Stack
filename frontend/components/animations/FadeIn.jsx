'use client'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'

export const FadeIn = ({ 
  children, 
  className,
  delay = 0,
  duration = 500 
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
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8',
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  )
}