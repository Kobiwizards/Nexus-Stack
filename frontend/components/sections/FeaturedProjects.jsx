'use client'
import { useRef } from 'react'
import { ProjectCard } from './ProjectCard'
import { projects } from '@/data/projectsData'
import { Button } from '@/components/ui/Button'

export const FeaturedProjects = () => {
  const scrollContainerRef = useRef(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  const featuredProjects = projects.filter(project => project.featured)

  return (
    <section className="py-20 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-800 to-dark-900"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Featured </span>
              <span className="bg-gradient-to-r from-accent-blue-light to-accent-cyan bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-lg text-dark-300">
              Explore our portfolio of successful digital transformations
            </p>
          </div>
          
          {/* Navigation Controls */}
          <div className="hidden md:flex gap-2">
            <Button 
              onClick={scrollLeft}
              variant="secondary"
              size="sm"
              className="!p-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <Button 
              onClick={scrollRight}
              variant="secondary"
              size="sm"
              className="!p-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Projects Horizontal Scroll */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide space-x-6 pb-8 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredProjects.map(project => (
              <div key={project.id} className="flex-none w-80 md:w-96 snap-start">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark-800 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark-800 to-transparent pointer-events-none"></div>
        </div>

        {/* View All Projects */}
        <div className="text-center mt-12">
          <Button 
            href="/work"
            variant="outline"
            size="lg"
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}