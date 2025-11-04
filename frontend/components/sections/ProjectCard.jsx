'use client'
import { useState } from 'react'
import { ProjectModal } from '@/components/ui/ProjectModal'
import { Button } from '@/components/ui/Button'

export const ProjectCard = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="gradient-border-subtle hover-lift group h-full">
        <div className="bg-dark-800 rounded-xl overflow-hidden h-full flex flex-col">
          {/* Project Image */}
          <div className="relative h-48 overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent"></div>
            <div className="absolute top-4 left-4">
              <span className="glass-morphism px-3 py-1 rounded-full text-xs font-medium text-white">
                {project.category}
              </span>
            </div>
          </div>

          {/* Project Content */}
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-blue-light transition-colors">
              {project.title}
            </h3>
            
            <p className="text-dark-300 text-sm mb-4 flex-1 leading-relaxed">
              {project.shortDescription}
            </p>

            {/* Technologies */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-dark-700 text-dark-300 rounded text-xs font-medium border border-dark-600"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-2 py-1 bg-dark-700 text-dark-300 rounded text-xs font-medium border border-dark-600">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-auto">
              <Button 
                onClick={() => setIsModalOpen(true)}
                variant="outline"
                className="flex-1"
              >
                View Details
              </Button>
              <Button 
                onClick={() => window.open(project.liveUrl, '_blank')}
                variant="primary"
                disabled={project.liveUrl === '#'}
                className="flex items-center gap-2"
              >
                Visit Site
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal 
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}