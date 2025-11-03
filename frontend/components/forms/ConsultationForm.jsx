'use client'
import { useState } from 'react'
import { useModal } from '@/contexts/ModalContext'
import { Button } from '@/components/ui/Button'
import { FormInput } from '@/components/ui/FormInput'
import { FormSelect } from '@/components/ui/FormSelect'
import { FormCheckbox } from '@/components/ui/FormCheckbox'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export const ConsultationForm = () => {
  const { closeModal } = useModal()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    goals: '',
    agreeToTerms: false
  })

  const serviceOptions = [
    { value: 'custom-software', label: 'Custom Software Development' },
    { value: 'mobile-app', label: 'Mobile App Development' },
    { value: 'ai-automation', label: 'AI Automation Solutions' },
    { value: 'cloud-devops', label: 'Cloud & DevOps' },
    { value: 'ui-ux', label: 'UI/UX Design' }
  ]

  const budgetOptions = [
    { value: '1k-5k', label: '$1k - $5k' },
    { value: '5k-10k', label: '$5k - $10k' },
    { value: '10k-25k', label: '$10k - $25k' },
    { value: '25k-50k', label: '$25k - $50k' },
    { value: '50k+', label: '$50k+' }
  ]

  const timelineOptions = [
    { value: 'urgent', label: 'ASAP (1-4 weeks)' },
    { value: 'standard', label: 'Standard (4-12 weeks)' },
    { value: 'flexible', label: 'Flexible (3-6 months)' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions')
      return
    }

    setIsLoading(true)
    // TODO: Implement consultation form submission
    console.log('Consultation form submitted:', formData)
    setTimeout(() => {
      setIsLoading(false)
      closeModal()
      alert('Consultation scheduled successfully! We will contact you within 2 hours.')
    }, 2000)
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.checked
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="John Doe"
        />
        <FormInput
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Your Company"
        />
      </div>

      <FormInput
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="john@example.com"
      />

      <FormSelect
        label="Service Interest"
        name="service"
        value={formData.service}
        onChange={handleChange}
        options={serviceOptions}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormSelect
          label="Project Budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          options={budgetOptions}
        />
        <FormSelect
          label="Timeline"
          name="timeline"
          value={formData.timeline}
          onChange={handleChange}
          options={timelineOptions}
        />
      </div>

      <FormTextarea
        label="Project Goals & Requirements"
        name="goals"
        value={formData.goals}
        onChange={handleChange}
        rows={4}
        placeholder="Describe your project goals, target audience, and any specific requirements..."
      />

      <FormCheckbox
        name="agreeToTerms"
        checked={formData.agreeToTerms}
        onChange={handleCheckboxChange}
        label="I agree to receive communications and schedule a 30-minute free consultation"
        required
      />

      <div className="flex gap-3 pt-4">
        <Button 
          type="submit" 
          variant="primary" 
          className="flex-1"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner size="sm" className="mr-2" />
              Scheduling...
            </div>
          ) : (
            'Schedule Consultation'
          )}
        </Button>
        <Button 
          type="button" 
          variant="secondary" 
          onClick={closeModal}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}