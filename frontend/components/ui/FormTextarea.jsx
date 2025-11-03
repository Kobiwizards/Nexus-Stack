'use client'
import { cn } from '@/lib/utils'

export const FormTextarea = ({ 
  label, 
  required = false, 
  rows = 4, 
  className, 
  ...props 
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        required={required}
        className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
        {...props}
      />
    </div>
  )
}