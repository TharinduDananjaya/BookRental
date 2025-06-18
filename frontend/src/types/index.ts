
export interface Book{
    id: number;
    title: string;
    author: string;
    published_date: string; 
    created_at: string;
    updated_at: string;

}

export interface BookFormData {
  title: string;
  author: string;
  published_date: string;
}

export interface ResponseMeta {
  meta?: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface GetBooksParams {
  page?: number;
  author?: string;
  is_available?: string;
  title?: string;
}

export interface BookFormData {
  title: string;
  author: string;
  published_date: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  published_date: string;
  is_available: boolean;
  description?: string;
  isbn?: string;
  genre?: string;
}

export interface BooksState {
  books: Book[];
  currentBook: Book | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  filters: {
    author: string;
    available: string;
    title?: string;
  };
}

export interface FetchBooksParams {
  page?: number;
  author?: string;
  is_available?: string;
  title?: string;
}

