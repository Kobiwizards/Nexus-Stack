'use client'
import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProjectFormModal } from '@/components/forms/ProjectFormModal'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { projects } from '@/data/projectsData'

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const categories = ['All', ...new Set(projects.map(project => project.category))]
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Our </span>
              <span className="bg-gradient-to-r from-accent-blue-light to-accent-cyan bg-clip-text text-transparent">
                Portfolio
              </span>
            </h1>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              Discover how we've helped businesses transform their digital presence 
              with innovative solutions across various industries.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/25'
                    : 'glass-morphism text-dark-300 hover:text-white hover:border-accent-blue border border-transparent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-dark-400 text-lg">No projects found in this category.</div>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <ProjectFormModal />
    </main>
  )
}