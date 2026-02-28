import { configureStore } from '@reduxjs/toolkit';

// For now, we'll create a basic store. You can add slices later as needed.
export const store = configureStore({
  reducer: {
    // Add your reducers here as you create them
  },
});

export default store;
