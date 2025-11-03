'use client'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useModal } from '@/contexts/ModalContext'

export const Modal = ({ children }) => {
  const { isModalOpen, closeModal } = useModal()

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeModal()
    }

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => document.removeEventListener('keydown', handleEscape)
  }, [isModalOpen, closeModal])

  if (!isModalOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeModal}
      />
      <div className="relative glass-morphism rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>,
    document.body
  )
}