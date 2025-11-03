'use client'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProjectFormModal } from '@/components/forms/ProjectFormModal'
import { StatsSection } from '@/components/sections/StatsSection'
import { companyInfo } from '@/data/companyInfo'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-900">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">About </span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Nexus Stack
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Where innovation meets execution. We're passionate about transforming ideas into 
              cutting-edge digital solutions that drive real business results.
            </p>
          </div>

          {/* Founder Section */}
          <div className="glass-morphism rounded-2xl p-8 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Our Story</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Founded by {companyInfo.founder}, Nexus Stack emerged from a simple belief: 
                  every business deserves access to world-class technology solutions without 
                  the enterprise price tag.
                </p>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  What started as a passion for coding and problem-solving has evolved into 
                  a full-service technology partner trusted by businesses worldwide. We've 
                  grown from a solo operation to a dedicated team of experts, but our core 
                  mission remains unchanged: deliver exceptional value through innovative 
                  technology.
                </p>
                <div className="flex items-center text-gray-300">
                  <span className="font-semibold text-white mr-2">Founder:</span>
                  {companyInfo.founder}
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-2xl font-bold">{companyInfo.founder.split(' ')[0]}</div>
                    <div className="text-sm opacity-80">Founder & CEO</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovation First",
                  description: "We stay ahead of technology trends to deliver cutting-edge solutions that give you a competitive advantage.",
                  icon: "💡"
                },
                {
                  title: "Quality Focus",
                  description: "Every line of code, every design element, and every deployment meets our rigorous quality standards.",
                  icon: "🎯"
                },
                {
                  title: "Client Partnership",
                  description: "We view our clients as partners and work collaboratively to achieve shared success and long-term growth.",
                  icon: "🤝"
                }
              ].map((value, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <StatsSection />

          {/* Location */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Worldwide Presence</h2>
            <div className="glass-morphism rounded-xl p-8 max-w-2xl mx-auto">
              <div className="text-white text-lg font-semibold mb-2">{companyInfo.headquarters}</div>
              <div className="text-gray-300 mb-4">{companyInfo.location}</div>
              <div className="text-blue-400">{companyInfo.email}</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ProjectFormModal />
    </main>
  )
}