// API exports - centralized API functions
export * from '../features/books/booksAPI';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

interface ApiRequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

// Generic API request function
export const apiRequest = async <T = any>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    ...apiConfig,
    ...options,
    headers: {
      ...apiConfig.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const data = await response.json();
    console.log(data);
    return data?.data || [];
    
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
