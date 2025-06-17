
// Application configuration
const config = {
  // API Configuration
  api: {
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
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
