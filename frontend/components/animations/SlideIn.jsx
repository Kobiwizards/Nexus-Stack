'use client'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'

export const SlideIn = ({ 
  children, 
  direction = 'left',
  className,
  delay = 0 
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const directions = {
    left: 'translateX(-50px)',
    right: 'translateX(50px)',
    up: 'translateY(50px)',
    down: 'translateY(-50px)'
  }

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        inView 
          ? 'opacity-100 translate-x-0 translate-y-0' 
          : `opacity-0 ${directions[direction]}`,
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}