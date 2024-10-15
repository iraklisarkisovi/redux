import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://crudapi.co.uk/api/v1/probe';
const API_KEY = '_vaUTERVqtdv_7UFoOCC38u7K8u8qn3tR8u-X-xsyeWyCsxwsA';

 
export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: API_KEY,
    },
  });
  return response.data;
});

 
export const addItem = createAsyncThunk('items/addItem', async (item) => {
  const response = await axios.post(API_URL, item, {
    headers: {
      Authorization: API_KEY,
    },
  });
  return response.data;
});

 
export const deleteItem = createAsyncThunk('items/deleteItem', async (id) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: API_KEY,
    },
  });
  return id;
});

 
const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    theme: 'light', 
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';  
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;  
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);  
      });
  },
});

 
export const { toggleTheme } = itemsSlice.actions;  
export default itemsSlice.reducer; 

