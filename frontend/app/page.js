'use client'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProjectFormModal } from '@/components/forms/ProjectFormModal'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { ServicesOverview } from '@/components/sections/ServicesOverview'
import { AISection } from '@/components/sections/AISection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />
      
      {/* Main Content */}
      <div className="relative">
        <HeroSection />
        <FeaturedProjects />
        <ServicesOverview />
        <AISection />
        <TestimonialsSection />
        <StatsSection />
        <ContactSection />
      </div>

      <Footer />
      <ProjectFormModal />
    </main>
  )
}