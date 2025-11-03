'use client'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProjectFormModal } from '@/components/forms/ProjectFormModal'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesOverview } from '@/components/sections/ServicesOverview'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { AISection } from '@/components/sections/AISection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900">
      <Navbar />
      
      {/* Main Content */}
      <div className="relative">
        <HeroSection />
        <ServicesOverview />
        <FeaturedProjects />
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