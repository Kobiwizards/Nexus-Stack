'use client'
import { Button } from '@/components/ui/Button'

export const HeroSection = () => {
  const openModal = () => {
    // Dispatch custom event to open modal (same as Navbar)
    const event = new CustomEvent('openModal', { detail: { type: 'project' } })
    window.dispatchEvent(event)
  }

  const navigateToWork = () => {
    // Navigate to work page
    window.location.href = '/work'
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Sophisticated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/10 via-transparent to-transparent"></div>
      </div>

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">      
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full 
bg-primary-900/20 border border-primary-800/30 text-primary-300 text-sm font-medium mb-8">
          <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full"></span>   
          Trusted by industry leaders worldwide
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="text-white">Enterprise </span>
          <span className="bg-gradient-to-r from-white to-dark-300 bg-clip-text text-transparent">
            Software
          </span>
          <br />
          <span className="text-white">for Modern </span>
          <span className="bg-gradient-to-r from-accent-blue-light to-accent-cyan bg-clip-text text-transparent">
            Business
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-dark-300 mb-8 max-w-2xl mx-auto 
leading-relaxed">
          We deliver scalable, secure, and innovative digital solutions that drive measurable
          business outcomes for forward-thinking organizations.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {["Scalable Architecture", "Enterprise Security", "24/7 Support", "AI-Powered"].map((feature, index) => (
            <div
              key={index}
              className="glass-morphism px-4 py-2 rounded-full text-sm font-medium text-dark-200 border border-dark-600 hover:border-primary-500 transition-all duration-300"
            >
              {feature}
            </div>
          ))}
        </div>

        {/* CTA Buttons - ADDED ONCLICK HANDLERS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="primary"
            size="lg"
            onClick={openModal} // ADD THIS
          >
            Start Your Project
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={navigateToWork} // ADD THIS
          >
            <span className="flex items-center gap-2">
              View Our Work
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-dark-700">
          <p className="text-dark-400 text-sm mb-4">Trusted by innovative teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {["TechCorp", "InnovateLabs", "GlobalSys", "DataFlow", "CloudNet"].map((company) => (
              <div key={company} className="text-dark-300 font-medium text-sm">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2"> 
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-dark-400 rounded-full flex 
justify-center">
            <div className="w-1 h-3 bg-dark-400 rounded-full mt-2"></div>     
          </div>
        </div>
      </div>
    </section>
  )
}