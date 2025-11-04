'use client'
import { useState } from 'react'
import { useModal } from '@/contexts/ModalContext'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { services } from '@/data/servicesData'

export const ProjectFormModal = () => {
  const { isModalOpen, closeModal } = useModal()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    projectType: [],
    details: ''
  })

  const projectTypes = [
    'Web Application',
    'Mobile Application', 
    'E-commerce Platform',
    'SaaS Product',
    'API Development',
    'AI/ML Solution',
    'Cloud Migration',
    'UI/UX Design',
    'Other'
  ]

  const budgetRanges = [
    '$1k - $5k',
    '$5k - $10k', 
    '$10k - $25k',
    '$25k - $50k',
    '$50k+'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Form submission logic will be implemented later
    console.log('Form submitted:', formData)
    closeModal()
  }

  const handleProjectTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      projectType: prev.projectType.includes(type)
        ? prev.projectType.filter(t => t !== type)
        : [...prev.projectType, type]
    }))
  }

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Start Your Project</h2>
          <button
            onClick={closeModal}
            className="text-dark-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-dark-700/50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Company
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue"
                placeholder="Your Company"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Project Budget
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue"
              >
                <option value="">Select budget range</option>
                {budgetRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Interested Service
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({...formData, service: e.target.value})}
              className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue"
            >
              <option value="">Select a service</option>
              {services.map(service => (
                <option key={service.id} value={service.title}>{service.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Project Type (Select all that apply)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {projectTypes.map(type => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.projectType.includes(type)}
                    onChange={() => handleProjectTypeChange(type)}
                    className="rounded bg-dark-700 border-dark-600 text-accent-blue focus:ring-accent-blue"
                  />
                  <span className="text-sm text-dark-300">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Project Details *
            </label>
            <textarea
              required
              rows={4}
              value={formData.details}
              onChange={(e) => setFormData({...formData, details: e.target.value})}
              className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue"
              placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" variant="primary" className="flex-1">
              Send Message
            </Button>
            <Button type="button" variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}