
// Application configuration
interface ApiConfig {
  baseURL: string;
  timeout: number;
}

interface AppConfig {
  name: string;
  version: string;
  description: string;
}

interface PaginationConfig {
  defaultPageSize: number;
  maxPageSize: number;
}

interface ToastConfig {
  duration: number;
  position: string;
}

interface StorageConfig {
  books: string;
  userPreferences: string;
}

interface FeatureFlags {
  enableBookRating: boolean;
  enableBookReviews: boolean;
  enableUserProfiles: boolean;
}

interface Config {
  api: ApiConfig;
  app: AppConfig;
  pagination: PaginationConfig;
  toast: ToastConfig;
  storage: StorageConfig;
  features: FeatureFlags;
}

const config: Config = {
  // API Configuration
  api: {
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
    timeout: 10000,
  },

  // App Configuration
  app: {
    name: 'BookRental Platform',
    version: '1.0.0',
    description: 'A mini book rental platform for libraries',
  },

  // Pagination Configuration
  pagination: {
    defaultPageSize: 6,
    maxPageSize: 50,
  },

  // Toast Configuration
  toast: {
    duration: 5000,
    position: 'top-right',
  },

  // LocalStorage Keys
  storage: {
    books: 'bookRentalBooks',
    userPreferences: 'bookRentalUserPrefs',
  },

  // Feature Flags
  features: {
    enableBookRating: false,
    enableBookReviews: false,
    enableUserProfiles: false,
  },
};

export default config;
