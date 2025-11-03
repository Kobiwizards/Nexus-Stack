'use client'
import { Button } from './Button'

export const ProjectLink = ({ projectId, liveUrl, caseStudyUrl }) => {
  // This component will be connected to backend to update URLs
  return (
    <div className="flex gap-3 mt-4">
      <Button 
        variant="primary" 
        size="sm"
        onClick={() => window.open(liveUrl, '_blank')}
        disabled={!liveUrl || liveUrl === '#'}
      >
        {liveUrl && liveUrl !== '#' ? 'View Live Site' : 'Link Coming Soon'}
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => window.open(caseStudyUrl, '_blank')}
        disabled={!caseStudyUrl || caseStudyUrl === '#'}
      >
        Case Study
      </Button>
    </div>
  )
}