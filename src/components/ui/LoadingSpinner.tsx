import React from 'react';
import { BaseComponentProps } from '../../types/common';
import styles from '../../styles/components/ui/LoadingSpinner.module.css';

interface LoadingSpinnerProps extends BaseComponentProps 
{
  text?: string;
  color?: string;
}

/**
 * Reusable Loading Spinner component
 */
export function LoadingSpinner({ 
  size = 'medium', 
  className = '', 
  text,
  color = 'currentColor'
}: LoadingSpinnerProps) 
{
  const containerClasses = [styles.container, className].filter(Boolean).join(' ');
  const spinnerClasses = [styles.spinner, styles[size]].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <svg
        className={spinnerClasses}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        style={{ color }}
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
      {text && (
        <p className={styles.text}>
          {text}
        </p>
      )}
    </div>
  );
} 