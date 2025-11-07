'use client'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProjectFormModal } from '@/components/forms/ProjectFormModal'
import { Button } from '@/components/ui/Button'

export default function CoursesPage() {
  const openModal = () => {
    const event = new CustomEvent('openModal', { detail: { type: 'project' } })
    window.dispatchEvent(event)
  }

  const courseCategories = [
    {
      title: "AI Automation Mastery",
      description: "Learn to build intelligent automation systems that transform business operations",
      icon: "🤖",
      features: [
        "AI-Powered Workflow Automation",
        "Machine Learning Integration",
        "Natural Language Processing",
        "Computer Vision Applications",
        "RPA with AI Enhancement"
      ],
      level: "Intermediate to Advanced",
      duration: "8 weeks",
      projects: 5,
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Software Development with AI",
      description: "Revolutionize your coding workflow with AI-assisted development techniques",
      icon: "💻",
      features: [
        "AI-Powered Code Generation",
        "Intelligent Debugging & Testing",
        "Automated Code Review",
        "Smart Documentation",
        "AI-Driven Architecture Design"
      ],
      level: "Beginner to Advanced",
      duration: "10 weeks", 
      projects: 6,
      color: "from-blue-500 to-cyan-600"
    },
    {
      title: "Full-Stack AI Solutions",
      description: "Build complete AI-powered applications from frontend to backend",
      icon: "🚀",
      features: [
        "Next.js with AI Integration",
        "Node.js AI Microservices",
        "Real-time AI Features",
        "Scalable AI Architecture",
        "Deployment & Monitoring"
      ],
      level: "Advanced",
      duration: "12 weeks",
      projects: 4,
      color: "from-green-500 to-emerald-600"
    }
  ]

  const benefits = [
    {
      icon: "🎯",
      title: "Project-Based Learning",
      description: "Build real-world projects that showcase your AI development skills"
    },
    {
      icon: "👨‍🏫",
      title: "Expert Mentorship",
      description: "Learn from industry professionals with years of AI implementation experience"
    },
    {
      icon: "🤝",
      title: "Career Support",
      description: "Get job-ready with portfolio reviews, interview prep, and career guidance"
    },
    {
      icon: "🔄",
      title: "Continuous Updates",
      description: "Access to course updates as AI technology evolves and new tools emerge"
    }
  ]

  return (
    <main className="min-h-screen bg-slate-900">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-accent-cyan rounded-full animate-pulse"></span>
              Transform Your Career with AI
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Master </span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                AI-Powered
              </span>
              <br />
              <span className="text-white">Development</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Join our exclusive courses and learn to build cutting-edge applications 
              using the latest AI technologies. From automation to full-stack development, 
              we'll guide you to mastery.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                onClick={openModal}
                variant="primary"
                size="lg"
              >
                Book a Consultation
              </Button>
              <Button
                variant="outline"
                size="lg"
              >
                View Course Syllabus
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {[
                { number: "500+", label: "Students Trained" },
                { number: "95%", label: "Completion Rate" },
                { number: "50+", label: "Real Projects" },
                { number: "24/7", label: "Mentor Support" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Categories */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-4">
              Featured Course Tracks
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Choose your learning path and master the skills that are shaping the future of technology
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courseCategories.map((course, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative glass-morphism rounded-2xl p-8 h-full border border-dark-600 hover:border-blue-500/30 transition-all duration-300">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${course.color} flex items-center justify-center text-2xl mb-6`}>
                      {course.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">{course.title}</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">{course.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      {course.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-gray-300">
                          <svg className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-dark-600 pt-4 mt-6">
                      <div className="flex justify-between text-sm text-gray-400 mb-4">
                        <span>Level: {course.level}</span>
                        <span>Duration: {course.duration}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">{course.projects} Projects</span>
                        <Button
                          onClick={openModal}
                          variant="primary"
                          size="sm"
                        >
                          Enroll Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Why Learn With Us?
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We're not just teaching code - we're building the next generation of AI developers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/10 rounded-2xl flex items-center justify-center text-2xl">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="gradient-border rounded-2xl overflow-hidden">
            <div className="bg-slate-800 p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Start Your AI Journey?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Book a free consultation session to discuss your learning goals, get personalized course recommendations, 
                and access our exclusive course catalog. Limited spots available each month.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={openModal}
                  variant="primary"
                  size="lg"
                >
                  Book Your Session Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                >
                  Download Syllabus
                </Button>
              </div>
              
              <p className="text-gray-400 text-sm mt-6">
                🎯 Next cohort starts in 2 weeks • ⏰ Limited to 20 students per batch
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ProjectFormModal />
    </main>
  )
}