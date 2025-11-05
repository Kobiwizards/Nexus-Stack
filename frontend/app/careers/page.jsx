// app/careers/page.jsx
'use client' // Add this at the top to make it a Client Component

import Link from 'next/link'

export default function Careers() {
  const handleLinkedInClick = () => {
    window.open('https://linkedin.com/company/nexus-stack', '_blank')
  }

  return (
    <main className="min-h-screen bg-dark-900 pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Join Our </span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Team
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We're building the future of technology. Be part of something extraordinary.
          </p>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-dark-800/50 border border-dark-700 rounded-2xl p-12 backdrop-blur-sm">
            {/* Animated Icon */}
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-white mb-4">
              🚀 Hiring Soon!
            </h2>
            
            <p className="text-lg text-gray-300 mb-6">
              We're growing fast and will be opening positions for talented developers, 
              designers, and tech enthusiasts very soon.
            </p>

            <div className="bg-dark-700/50 border border-dark-600 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-white mb-3">
                What We're Looking For
              </h3>
              <ul className="text-gray-300 space-y-2 text-left">
                <li>• Full-Stack Developers (Next.js, Node.js)</li>
                <li>• UI/UX Designers</li>
                <li>• DevOps Engineers</li>
                <li>• AI/ML Specialists</li>
                <li>• Project Managers</li>
              </ul>
            </div>

            <p className="text-gray-400 mb-8">
              Stay tuned! We'll be posting our first positions in the coming weeks. 
              Follow us on social media or check back here for updates.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 bg-accent-blue text-white font-semibold rounded-lg hover:bg-accent-blue-dark transition-colors"
              >
                Get in Touch
              </Link>
              <button 
                onClick={handleLinkedInClick}
                className="inline-flex items-center justify-center px-6 py-3 border border-dark-600 text-gray-300 font-semibold rounded-lg hover:bg-dark-700 transition-colors"
              >
                Follow on LinkedIn
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16 px-4 bg-dark-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Join Nexus Stack?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚀",
                title: "Cutting-Edge Tech",
                description: "Work with the latest technologies and frameworks on exciting projects."
              },
              {
                icon: "🌱",
                title: "Rapid Growth",
                description: "Be part of a fast-growing startup with huge growth opportunities."
              },
              {
                icon: "💫",
                title: "Impactful Work",
                description: "Build products that solve real problems and make a difference."
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}