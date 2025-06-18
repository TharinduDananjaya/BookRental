import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as booksAPI from './booksAPI';
import { BookFormData, BooksState, FetchBooksParams } from '@/types';


// Async thunks
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (params: FetchBooksParams = {}) => {
    const { page = 1, author = '', is_available = '', title ='' } = params;
    const response = await booksAPI.getBooks({ page, author, is_available, title });
    console.log('Fetched books:', response);
    return response;
  }
);

export const fetchBookById = createAsyncThunk(
  'books/fetchBookById',
  async (id: string) => {
    const response = await booksAPI.getBookById(id);
    console.log('Fetched book by ID:', response);
    return response;
  }
);

export const addBook = createAsyncThunk(
  'books/addBook',
  async (bookData: BookFormData) => {
    const response = await booksAPI.createBook(bookData);
    return response;
  }
);

export const rentBook = createAsyncThunk(
  'books/rentBook',
  async (id: string) => {
    const response = await booksAPI.rentBook(id);
    return response;
  }
);

export const returnBook = createAsyncThunk(
  'books/returnBook',
  async (id: string) => {
    const response = await booksAPI.returnBook(id);
    return response;
  }
);

const initialState: BooksState = {
  books: [],
  currentBook: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  filters: {
    author: '',
    available: ''
  }
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<BooksState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCurrentBook: (state) => {
      state.currentBook = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch books
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload.data;
        state.currentPage = action.payload.meta.current_page;
        state.totalPages = Math.ceil(action.payload.meta.total / action.payload.meta.per_page);
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch books';
      })
      // Fetch book by ID
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBook = action.payload.data || null;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch book';
      })
      // Add book
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.unshift(action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add book';
      })
      // Rent book
      .addCase(rentBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rentBook.fulfilled, (state, action) => {
        state.loading = false;
        // Update the book in the list
        const index = state.books.findIndex(book => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
        // Update current book if it's the same
        if (state.currentBook && state.currentBook.id === action.payload.id) {
          state.currentBook = action.payload;
        }
      })
      .addCase(rentBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to rent book';
      })
      // Return book
      .addCase(returnBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(returnBook.fulfilled, (state, action) => {
        state.loading = false;
        // Update the book in the list
        const index = state.books.findIndex(book => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
        // Update current book if it's the same
        if (state.currentBook && state.currentBook.id === action.payload.id) {
          state.currentBook = action.payload;
        }
      })
      .addCase(returnBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to return book';
      });
  },
});

export const { setFilters, clearCurrentBook, clearError } = booksSlice.actions;
export default booksSlice.reducer;
