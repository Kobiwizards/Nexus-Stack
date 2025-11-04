'use client'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Button } from './Button'

export const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative glass-morphism-dark rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-dark-600">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-dark-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-dark-700/50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Project Image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent"></div>
          <div className="absolute top-4 left-4">
            <span className="glass-morphism px-3 py-1 rounded-full text-sm font-medium text-white">
              {project.category}
            </span>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {project.title}
              </h2>
              
              <p className="text-dark-300 text-lg leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-dark-300">
                      <svg className="w-5 h-5 text-accent-cyan mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Results */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">Business Impact</h3>
                <ul className="space-y-2">
                  {project.results.map((result, index) => (
                    <li key={index} className="flex items-start text-dark-300">
                      <span className="w-2 h-2 bg-accent-blue rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="glass-morphism rounded-xl p-6 border border-dark-600">
                <h3 className="text-white font-semibold mb-4">Project Details</h3>
                
                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-dark-400 text-sm font-medium mb-3">TECHNOLOGIES</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-dark-700 text-dark-300 rounded-full text-sm font-medium border border-dark-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="mb-6">
                  <h4 className="text-dark-400 text-sm font-medium mb-2">TIMELINE</h4>
                  <p className="text-white font-medium">{project.duration}</p>
                </div>

                {/* Status */}
                <div className="mb-6">
                  <h4 className="text-dark-400 text-sm font-medium mb-2">STATUS</h4>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-success rounded-full mr-2"></span>
                    <span className="text-white font-medium capitalize">{project.status}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button 
                  onClick={() => window.open(project.liveUrl, '_blank')}
                  variant="primary"
                  className="w-full"
                  disabled={project.liveUrl === '#'}
                >
                  <span className="flex items-center justify-center gap-2">
                    Visit Live Site
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}