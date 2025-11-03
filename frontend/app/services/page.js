'use client'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProjectFormModal } from '@/components/forms/ProjectFormModal'
import { ServicesOverview } from '@/components/sections/ServicesOverview'
import { AISection } from '@/components/sections/AISection'
import { StatsSection } from '@/components/sections/StatsSection'

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-900">
      <Navbar />
      
      <div className="pt-20">
        <ServicesOverview />
        <AISection />
        <StatsSection />
      </div>

      <Footer />
      <ProjectFormModal />
    </main>
  )
}