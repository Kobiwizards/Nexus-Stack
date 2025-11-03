'use client'
import { useModal } from '@/contexts/ModalContext'
import { Button } from '@/components/ui/Button'
import { ServiceCard } from './ServiceCard'
import { services } from '@/data/servicesData'

export const ServicesOverview = () => {
  const { openModal } = useModal()

  const stats = [
    { number: '50+', label: 'Projects Delivered' },
    { number: '4.9', label: 'Client Rating' },
    { number: '2x', label: 'Faster Delivery' },
    { number: '100%', label: 'Success Rate' }
  ]

  return (
    <section className="py-20 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Our </span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive solutions to transform your digital presence and drive business growth
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Service Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {services.map(service => (
            <button
              key={service.id}
              className="glass-morphism px-6 py-3 rounded-full text-white font-medium hover:border-blue-500 border border-transparent transition-all duration-300"
            >
              {service.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            onClick={() => openModal('project')}
            variant="primary"
            size="lg"
          >
            Start Your Project
          </Button>
        </div>
      </div>
    </section>
  )
}