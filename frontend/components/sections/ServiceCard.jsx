'use client'
import { useModal } from '@/contexts/ModalContext'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'

export const ServiceCard = ({ service }) => {
  const { openModal } = useModal()

  return (
    <div className="gradient-border hover-lift group">
      <div className="bg-slate-800 rounded-xl p-6 h-full">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
            {service.title}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Pricing & Timeline */}
        <div className="flex justify-between items-center mb-6 p-4 glass-morphism rounded-lg">
          <div>
            <div className="text-sm text-gray-400">Starting at</div>
            <div className="text-lg font-bold text-white">
              {formatCurrency(service.startingPrice)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Timeline</div>
            <div className="text-lg font-bold text-white">{service.timeline}</div>
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-400 mb-3">Key Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {service.technologies.map((tech, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-slate-700 text-gray-300 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Features & Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-400 mb-2">What's Included</h4>
            <ul className="space-y-1">
              {service.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="text-xs text-gray-300 flex items-center">
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-400 mb-2">Key Benefits</h4>
            <ul className="space-y-1">
              {service.benefits.slice(0, 3).map((benefit, index) => (
                <li key={index} className="text-xs text-gray-300 flex items-center">
                  <span className="w-1 h-1 bg-purple-500 rounded-full mr-2"></span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <Button 
          onClick={() => openModal('project')}
          variant="primary"
          className="w-full"
        >
          Get Started
        </Button>
      </div>
    </div>
  )
}