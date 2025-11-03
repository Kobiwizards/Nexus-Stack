'use client'
import { createContext, useContext, useState } from 'react'

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