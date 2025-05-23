# API Integration Guide

## Overview

This guide explains how to add new API calls to new endpoints in the Qalamus frontend application. The frontend follows a structured approach with service classes, type safety, and consistent error handling patterns.

## Architecture Overview

The Qalamus frontend uses a **Service Layer Pattern** for API integration:

```
Component/Hook → Service Class → Backend API → Response → Component/Hook
```

### Key Principles:
- **Type Safety**: All API calls and responses are fully typed
- **Centralized Logic**: API calls are centralized in service classes
- **Consistent Error Handling**: Standardized error handling across all endpoints
- **Reusable Patterns**: Generic response types and utility functions

## Step-by-Step Guide

### 1. Define Types

First, create or update type definitions for your new API endpoint.

#### A. Define the Response Data Type

**File: `src/types/[domain].ts`** (create new file or use existing)

```typescript
/**
 * User profile data structure
 */
export interface UserProfile 
{
  id: string;
  name: string;
  email: string;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

/**
 * User preferences structure
 */
export interface UserPreferences 
{
  language: string;
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
}

/**
 * Update user profile request body
 */
export interface UpdateUserProfileRequest 
{
  name?: string;
  email?: string;
  preferences?: Partial<UserPreferences>;
}
```

#### B. Define API Response Types

**File: `src/types/[domain].ts`**

```typescript
import { ApiResponse } from './api';

/**
 * API response types using the generic ApiResponse structure
 */
export type UserProfileResponse = ApiResponse<UserProfile>;
export type UpdateUserProfileResponse = ApiResponse<UserProfile>;
export type DeleteUserResponse = ApiResponse<{ success: boolean }>;
```

### 2. Create or Update Service Class

#### A. Create New Service (if needed)

**File: `src/services/api/userService.ts`**

```typescript
import { 
  UserProfile, 
  UserProfileResponse, 
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
  DeleteUserResponse 
} from '../../types/user';

/**
 * User service for handling user-related API operations
 * Implements singleton pattern for consistency
 */
class UserService 
{
  private static instance: UserService;
  private baseUrl: string;

  private constructor() 
  {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): UserService 
  {
    if (!UserService.instance) 
    {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  /**
   * Get user profile by ID
   * @param userId - The user ID
   * @returns Promise resolving to user profile data
   */
  public async getUserProfile(userId: string): Promise<UserProfileResponse> 
  {
    try 
    {
      const response = await fetch(`${this.baseUrl}/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers if needed
          // 'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) 
      {
        throw new Error(`Failed to fetch user profile: ${response.status} ${response.statusText}`);
      }

      const data: UserProfileResponse = await response.json();
      
      // Validate response structure
      if (!data.result || !data.result.data) 
      {
        throw new Error('Invalid response structure from user profile endpoint');
      }

      return data;
    } 
    catch (error) 
    {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  /**
   * Update user profile
   * @param userId - The user ID
   * @param updateData - The profile data to update
   * @returns Promise resolving to updated user profile
   */
  public async updateUserProfile(
    userId: string, 
    updateData: UpdateUserProfileRequest
  ): Promise<UpdateUserProfileResponse> 
  {
    try 
    {
      const response = await fetch(`${this.baseUrl}/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) 
      {
        throw new Error(`Failed to update user profile: ${response.status} ${response.statusText}`);
      }

      const data: UpdateUserProfileResponse = await response.json();
      return data;
    } 
    catch (error) 
    {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  /**
   * Delete user account
   * @param userId - The user ID
   * @returns Promise resolving to deletion confirmation
   */
  public async deleteUser(userId: string): Promise<DeleteUserResponse> 
  {
    try 
    {
      const response = await fetch(`${this.baseUrl}/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) 
      {
        throw new Error(`Failed to delete user: ${response.status} ${response.statusText}`);
      }

      const data: DeleteUserResponse = await response.json();
      return data;
    } 
    catch (error) 
    {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const userService = UserService.getInstance();
```

#### B. Add Methods to Existing Service

**File: `src/services/api/transcriptionService.ts`**

```typescript
/**
 * Get video metadata
 * @param videoId - YouTube video ID
 * @returns Promise resolving to video metadata
 */
public async getVideoMetadata(videoId: string): Promise<VideoMetadataResponse> 
{
  try 
  {
    const response = await fetch(`${this.baseUrl}/api/videos/${videoId}/metadata`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) 
    {
      throw new Error(`Failed to fetch video metadata: ${response.status} ${response.statusText}`);
    }

    const data: VideoMetadataResponse = await response.json();
    
    if (!data.result || !data.result.data) 
    {
      throw new Error('Invalid response structure from video metadata endpoint');
    }

    return data;
  } 
  catch (error) 
  {
    console.error('Error fetching video metadata:', error);
    throw error;
  }
}
```

### 3. Create Custom Hook (Optional)

For complex state management, create a custom hook to manage the API integration.

**File: `src/hooks/useUserProfile.ts`**

```typescript
import { useState, useEffect } from 'react';
import { UserProfile, UpdateUserProfileRequest } from '../types/user';
import { userService } from '../services/api/userService';

interface UseUserProfileProps 
{
  userId: string;
}

interface UserProfileState 
{
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  updating: boolean;
}

export function useUserProfile({ userId }: UseUserProfileProps) 
{
  const [state, setState] = useState<UserProfileState>({
    profile: null,
    loading: false,
    error: null,
    updating: false,
  });

  // Load user profile
  useEffect(() => 
  {
    if (!userId) return;

    async function loadProfile() 
    {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try 
      {
        const response = await userService.getUserProfile(userId);
        setState(prev => ({
          ...prev,
          profile: response.result.data,
          loading: false,
        }));
      } 
      catch (error: any) 
      {
        setState(prev => ({
          ...prev,
          error: error.message || 'Failed to load user profile',
          loading: false,
        }));
      }
    }

    loadProfile();
  }, [userId]);

  // Update profile function
  const updateProfile = async (updateData: UpdateUserProfileRequest) => 
  {
    setState(prev => ({ ...prev, updating: true, error: null }));

    try 
    {
      const response = await userService.updateUserProfile(userId, updateData);
      setState(prev => ({
        ...prev,
        profile: response.result.data,
        updating: false,
      }));
      return response.result.data;
    } 
    catch (error: any) 
    {
      setState(prev => ({
        ...prev,
        error: error.message || 'Failed to update user profile',
        updating: false,
      }));
      throw error;
    }
  };

  return {
    ...state,
    updateProfile,
  };
}
```

### 4. Integrate with Components

#### A. Using the Service Directly

```typescript
import React, { useState, useEffect } from 'react';
import { userService } from '../services/api/userService';
import { UserProfile } from '../types/user';

export function UserProfileComponent({ userId }: { userId: string }) 
{
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => 
  {
    async function loadProfile() 
    {
      setLoading(true);
      setError(null);

      try 
      {
        const response = await userService.getUserProfile(userId);
        setProfile(response.result.data);
      } 
      catch (err: any) 
      {
        setError(err.message);
      } 
      finally 
      {
        setLoading(false);
      }
    }

    loadProfile();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile found</div>;

  return (
    <div>
      <h2>{profile.name}</h2>
      <p>{profile.email}</p>
      <p>Theme: {profile.preferences.theme}</p>
    </div>
  );
}
```

#### B. Using Custom Hook

```typescript
import React from 'react';
import { useUserProfile } from '../hooks/useUserProfile';

export function UserProfileComponent({ userId }: { userId: string }) 
{
  const { profile, loading, error, updating, updateProfile } = useUserProfile({ userId });

  const handleUpdateTheme = async (theme: 'light' | 'dark' | 'auto') => 
  {
    try 
    {
      await updateProfile({
        preferences: { theme }
      });
    } 
    catch (err) 
    {
      console.error('Failed to update theme:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile found</div>;

  return (
    <div>
      <h2>{profile.name}</h2>
      <p>{profile.email}</p>
      <div>
        <label>Theme:</label>
        <select 
          value={profile.preferences.theme}
          onChange={(e) => handleUpdateTheme(e.target.value as any)}
          disabled={updating}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto</option>
        </select>
      </div>
    </div>
  );
}
```

## Advanced Patterns

### 1. Request Interceptors

Add common headers, authentication, or request modification:

```typescript
private async makeRequest<T>(
  url: string, 
  options: RequestInit = {}
): Promise<T> 
{
  const token = localStorage.getItem('authToken');
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${this.baseUrl}${url}`, config);
  
  if (!response.ok) 
  {
    if (response.status === 401) 
    {
      // Handle authentication error
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
```

### 2. Response Caching

Add simple in-memory caching for GET requests:

```typescript
private cache = new Map<string, { data: any; timestamp: number }>();
private cacheTimeout = 5 * 60 * 1000; // 5 minutes

public async getCachedData<T>(
  cacheKey: string, 
  fetchFn: () => Promise<T>
): Promise<T> 
{
  const cached = this.cache.get(cacheKey);
  const now = Date.now();

  if (cached && (now - cached.timestamp) < this.cacheTimeout) 
  {
    return cached.data;
  }

  const data = await fetchFn();
  this.cache.set(cacheKey, { data, timestamp: now });
  return data;
}
```

### 3. Request Retry Logic

Add automatic retry for failed requests:

```typescript
private async retryRequest<T>(
  requestFn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> 
{
  for (let attempt = 1; attempt <= maxRetries; attempt++) 
  {
    try 
    {
      return await requestFn();
    } 
    catch (error) 
    {
      if (attempt === maxRetries) throw error;
      
      console.warn(`Request failed (attempt ${attempt}/${maxRetries}), retrying...`);
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
  throw new Error('All retry attempts failed');
}
```

## Best Practices

### 1. Type Safety
- **Always define types** for request and response data
- **Use generic types** for reusable patterns (`ApiResponse<T>`)
- **Validate response structure** before using data

### 2. Error Handling
- **Catch and log errors** at the service level
- **Provide meaningful error messages** to users
- **Handle different error types** (network, authentication, validation)
- **Use try-catch blocks** consistently

### 3. Performance
- **Use appropriate HTTP methods** (GET, POST, PUT, DELETE)
- **Implement caching** for frequently accessed data
- **Add request deduplication** to prevent duplicate API calls
- **Use loading states** to provide user feedback

### 4. Security
- **Validate input data** before sending requests
- **Sanitize user input** to prevent injection attacks
- **Use HTTPS** for all API communications
- **Handle authentication tokens** securely

### 5. Maintainability
- **Follow consistent naming conventions** (camelCase for properties)
- **Document API methods** with JSDoc comments
- **Keep services focused** on single responsibility
- **Write unit tests** for service methods

## Testing

### 1. Service Method Testing

```typescript
// __tests__/services/userService.test.ts
import { userService } from '../src/services/api/userService';

// Mock fetch
global.fetch = jest.fn();

describe('UserService', () => 
{
  beforeEach(() => 
  {
    (fetch as jest.MockedFunction<typeof fetch>).mockClear();
  });

  it('should fetch user profile successfully', async () => 
  {
    const mockProfile = { id: '1', name: 'John Doe', email: 'john@example.com' };
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result: { data: mockProfile } }),
    } as Response);

    const result = await userService.getUserProfile('1');
    
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/users/1'),
      expect.objectContaining({ method: 'GET' })
    );
    expect(result.result.data).toEqual(mockProfile);
  });

  it('should handle API errors gracefully', async () => 
  {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    } as Response);

    await expect(userService.getUserProfile('999')).rejects.toThrow(
      'Failed to fetch user profile: 404 Not Found'
    );
  });
});
```

### 2. Hook Testing

```typescript
// __tests__/hooks/useUserProfile.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useUserProfile } from '../src/hooks/useUserProfile';
import { userService } from '../src/services/api/userService';

jest.mock('../src/services/api/userService');

describe('useUserProfile', () => 
{
  it('should load user profile on mount', async () => 
  {
    const mockProfile = { id: '1', name: 'John Doe' };
    (userService.getUserProfile as jest.Mock).mockResolvedValue({
      result: { data: mockProfile }
    });

    const { result } = renderHook(() => useUserProfile({ userId: '1' }));

    expect(result.current.loading).toBe(true);

    await waitFor(() => 
    {
      expect(result.current.loading).toBe(false);
      expect(result.current.profile).toEqual(mockProfile);
    });
  });
});
```

## Common Gotchas

### 1. CORS Issues
- Ensure backend is configured to accept requests from frontend domain
- Add proper CORS headers in backend configuration

### 2. Environment Variables
- Use `NEXT_PUBLIC_` prefix for client-side environment variables
- Provide fallback values for development

### 3. TypeScript Strict Mode
- Handle null/undefined cases properly
- Use type guards for runtime type checking

### 4. Response Validation
- Always validate API response structure
- Handle unexpected response formats gracefully

### 5. Memory Leaks
- Clean up event listeners and timers in useEffect cleanup
- Cancel pending requests when components unmount

## Conclusion

Following this guide ensures consistent, type-safe, and maintainable API integration across the Qalamus frontend application. The patterns established provide a solid foundation for scaling the application with new endpoints and features while maintaining code quality and developer experience. 