import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './features/itemsSlice';  
import themeReducer from './features/themeSlice';  

const store = configureStore({
  reducer: {
    items: itemsReducer,
    theme: themeReducer,  
  },
});

export default store;
