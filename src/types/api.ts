/**
 * Common API response structure
 */
export interface ApiResponse<T> 
{
  result: 
  {
    data: T;
  };
}

/**
 * API error response structure
 */
export interface ApiError 
{
  message: string;
  code?: string;
  status?: number;
}

/**
 * Loading states for API requests
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Generic API service configuration
 */
export interface ApiServiceConfig 
{
  baseUrl: string;
  timeout?: number;
  retries?: number;
}

/**
 * HTTP methods for API requests
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * Generic API request options
 */
export interface ApiRequestOptions 
{
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
} 