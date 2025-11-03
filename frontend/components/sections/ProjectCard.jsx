'use client'
import { ProjectLink } from '@/components/ui/ProjectLink'
import { formatCurrency } from '@/lib/utils'

export const ProjectCard = ({ project }) => {
  return (
    <div className="gradient-border hover-lift group h-full">
      <div className="bg-slate-800 rounded-xl overflow-hidden h-full flex flex-col">
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
          <div className="absolute top-4 left-4">
            <span className="glass-morphism px-3 py-1 rounded-full text-xs font-medium text-white">
              {project.category}
            </span>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-gray-300 text-sm mb-4 flex-1 leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-slate-700 text-gray-300 rounded text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 py-1 bg-slate-700 text-gray-300 rounded text-xs font-medium">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Project Details */}
          <div className="flex justify-between items-center mb-4 text-sm">
            <div>
              <div className="text-gray-400">Budget</div>
              <div className="text-white font-semibold">{formatCurrency(project.budget)}</div>
            </div>
            <div>
              <div className="text-gray-400">Duration</div>
              <div className="text-white font-semibold">{project.duration}</div>
            </div>
          </div>

          {/* Project Links */}
          <ProjectLink 
            projectId={project.id}
            liveUrl={project.liveUrl}
            caseStudyUrl={project.caseStudyUrl}
          />
        </div>
      </div>
    </div>
  )
}