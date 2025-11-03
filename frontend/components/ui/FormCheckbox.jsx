'use client'
import { cn } from '@/lib/utils'

export const FormCheckbox = ({ 
  label, 
  checked, 
  onChange, 
  className,
  ...props 
}) => {
  return (
    <label className={cn('flex items-center space-x-3 cursor-pointer', className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 bg-slate-700 border border-gray-600 rounded focus:ring-blue-500 focus:ring-2 text-blue-500"
        {...props}
      />
      <span className="text-sm text-gray-300">{label}</span>
    </label>
  )
}