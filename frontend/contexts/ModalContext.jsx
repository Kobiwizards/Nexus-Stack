// contexts/ModalContext.jsx
'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const ModalContext = createContext()

export function ModalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState('project')

  const openModal = (type = 'project') => {
    setModalType(type)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = 'unset'
  }

  // ADD THIS USEEFFECT TO LISTEN FOR THE CUSTOM EVENT
  useEffect(() => {
    const handleOpenModal = (event) => {
      const type = event.detail?.type || 'project'
      openModal(type)
    }

    // Listen for the custom event that Navbar dispatches
    window.addEventListener('openModal', handleOpenModal)

    // Cleanup the event listener
    return () => {
      window.removeEventListener('openModal', handleOpenModal)
    }
  }, []) // Empty dependency array means this runs once on mount

  return (
    <ModalContext.Provider value={{
      isModalOpen,
      modalType,
      openModal,
      closeModal
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within ModalProvider')
  }
  return context
}