import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode
} from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md'
  icon?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'secondary', size = 'md', icon, className = '', children, type = 'button', ...props },
  ref
): ReactElement {
  return (
    <button
      ref={ref}
      type={type}
      className={`btn btn-${variant} btn-${size}${className ? ` ${className}` : ''}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
})

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  active?: boolean
}

export function IconButton({
  label,
  active = false,
  className = '',
  children,
  type = 'button',
  ...props
}: IconButtonProps): ReactElement {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={`icon-btn${active ? ' is-active' : ''}${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </button>
  )
}
