'use client'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const Counter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true })

  useEffect(() => {
    if (inView) {
      let start = 0
      const increment = end / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.ceil(start))
        }
      }, 16)
      return () => clearInterval(timer)
    }
  }, [end, duration, inView])

  return <span ref={ref}>{count}+</span>
}

export const StatsSection = () => {
  const stats = [
    { number: 50, label: 'Projects Completed', description: 'Successful launches across industries' },
    { number: 25, label: 'Happy Clients', description: 'Long-term partnerships built on trust' },
    { number: 5, label: 'Years Experience', description: 'Proven track record of excellence' },
    { number: 100, label: 'Client Satisfaction', description: 'Commitment to quality delivery' }
  ]

  return (
    <section className="py-20 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-3">
                <Counter end={stat.number} />
              </div>
              <div className="text-white font-semibold text-lg mb-2">{stat.label}</div>
              <div className="text-gray-400 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}