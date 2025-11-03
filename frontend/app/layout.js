import { Inter } from 'next/font/google'
import './globals.css'
import { ModalProvider } from '@/contexts/ModalContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Nexus Stack - Modern Tech Solutions',
  description: 'Transform your vision into reality with cutting-edge software development, AI automation, and digital solutions.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  )
}