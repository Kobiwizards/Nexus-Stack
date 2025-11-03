'use client'
import { useState, useEffect } from 'react'
import { useModal } from '@/contexts/ModalContext'
import { Button } from '@/components/ui/Button'
import { heroSlides } from '@/data/heroData'

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { openModal } = useModal()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const currentHero = heroSlides[currentSlide]

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400 rounded-full opacity-70 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-purple-400 rounded-full opacity-50 animate-bounce"></div>
      <div className="absolute bottom-1/4 left-1/3 w-8 h-8 bg-cyan-400 rounded-full opacity-30 animate-ping"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Slide Content */}
        <div key={currentSlide} className="animate-fadeIn">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              {currentHero.title.split(' ').slice(0, -2).join(' ')}
            </span>
            <br />
            <span className="text-white">
              {currentHero.title.split(' ').slice(-2).join(' ')}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            {currentHero.description}
          </p>

          {/* Features List */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {currentHero.features.map((feature, index) => (
              <div 
                key={index}
                className="glass-morphism px-4 py-2 rounded-full text-sm font-medium text-white border border-gray-600 hover:border-blue-500 transition-colors"
              >
                {feature}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => openModal('project')}
              variant="primary"
              size="lg"
            >
              {currentHero.cta}
            </Button>
            <Button 
              onClick={() => openModal('consultation')}
              variant="outline"
              size="lg"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 mt-12">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-blue-500 w-8' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  )
}