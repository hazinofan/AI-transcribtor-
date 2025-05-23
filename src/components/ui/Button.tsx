import React from 'react';
import { BaseComponentProps, ComponentSize, ComponentStatus } from '../../types/common';
import styles from '../../styles/components/ui/Button.module.css';

interface ButtonProps extends BaseComponentProps 
{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  status?: ComponentStatus;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Reusable Button component with multiple variants and states
 */
export function Button({
  children,
  className = '',
  size = 'medium',
  variant = 'primary',
  status = 'default',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props
}: ButtonProps) 
{
  const buttonClasses = [
    styles.button,
    styles[size],
    status === 'default' ? styles[variant] : styles[status],
    (disabled || loading) && styles.disabled,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <svg 
          className={styles.loadingSpinner}
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            style={{ opacity: 0.25 }}
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            style={{ opacity: 0.75 }}
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
} 