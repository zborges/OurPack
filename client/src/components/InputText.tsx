import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

export interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  function InputText({ label, error, className = '', ...props }, ref) {
    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={props.id}
          className="text-sm font-semibold text-gray-700 uppercase tracking-wide"
        >
          {label}
        </label>
        <input
          ref={ref}
          className={`input-default ${error ? 'border-red-500' : ''} ${className}`}
          {...props}
        />
        {error && (
          <span className="text-sm text-red-600">{error}</span>
        )}
      </div>
    )
  },
)