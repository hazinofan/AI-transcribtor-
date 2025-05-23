import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props 
{
  children: ReactNode;
  fallback?: ReactNode;
}

interface State 
{
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary component to catch and handle React errors
 */
export class ErrorBoundary extends Component<Props, State> 
{
  constructor(props: Props) 
  {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State 
  {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) 
  {
    // Log error to console or error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  render() 
  {
    if (this.state.hasError) 
    {
      // Custom fallback UI
      if (this.props.fallback) 
      {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          backgroundColor: 'var(--error-bg, #f8d7da)',
          border: '1px solid var(--error-border, #f5c6cb)',
          borderRadius: '8px',
          margin: '20px',
          color: 'var(--error-color, #721c24)'
        }}>
          <h2>Something went wrong</h2>
          <p>We're sorry, but something unexpected happened.</p>
          <details style={{ marginTop: '10px', textAlign: 'left' }}>
            <summary style={{ cursor: 'pointer', marginBottom: '10px' }}>
              Error Details (click to expand)
            </summary>
            <pre style={{ 
              backgroundColor: 'var(--bg-secondary, #f8f9fa)', 
              padding: '10px', 
              borderRadius: '4px',
              fontSize: '12px',
              overflow: 'auto'
            }}>
              {this.state.error?.toString()}
            </pre>
          </details>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '15px',
              padding: '8px 16px',
              backgroundColor: 'var(--button-primary-bg, #007bff)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
} 