'use client'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export const Modal = ({ children, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative glass-morphism-dark rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-dark-600">
        {children}
      </div>
    </div>,
    document.body
  )
}