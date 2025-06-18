import { Book } from './booksSlice';

// Types for API responses
interface ResponseMeta {
  meta?: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

interface BooksResponse extends ResponseMeta {
  data: Book[];
  }
 
interface BookResponse extends ResponseMeta {
  data: Book;
}

interface GetBooksParams {
  page?: number;
  author?: string;
  is_available?: string;
  title?: string;
}

interface BookFormData {
  title: string;
  author: string;
  published_date: string;
}

// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Generic API request function
const apiRequest = async <T = any>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
  }
  
  return await response.json();
};

// API Functions
export const getBooks = async (params: GetBooksParams = {}): Promise<BooksResponse> => {
  const { page = 1, author = '', is_available = '', title = '' } = params;
  
  // Build query parameters
  const queryParams = new URLSearchParams();
  queryParams.append('page', page.toString());
  if (author) queryParams.append('author', author);
  if (is_available !== '') queryParams.append('is_available', is_available);
  if (title) queryParams.append('title', title);
  
  const endpoint = `/api/books?${queryParams.toString()}`;
  return await apiRequest<BooksResponse>(endpoint);
};

export const getBookById = async (id: string): Promise<BookResponse> => {
  const endpoint = `/api/books/${id}`;
  return await apiRequest<BookResponse>(endpoint);
};

export const createBook = async (bookData: BookFormData): Promise<Book> => {
  const endpoint = '/api/books';
  return await apiRequest<Book>(endpoint, {
    method: 'POST',
    body: JSON.stringify(bookData),
  });
};

export const rentBook = async (id: string): Promise<Book> => {
  const endpoint = `/api/books/${id}/rent`;
  return await apiRequest<Book>(endpoint, {
    method: 'POST',
  });
};

export const returnBook = async (id: string): Promise<Book> => {
  const endpoint = `/api/books/${id}/return`;
  return await apiRequest<Book>(endpoint, {
    method: 'POST',
  });
};
