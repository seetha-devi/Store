
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const response = await axios.get('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    items: [],
    status: 'idle',
    isOpen:false,
    error: null,
  },
  reducers: {
    togglePopup:(state)=> {
      state.isOpen=!state.isOpen
  },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { togglePopup } = catalogSlice.actions;

export default catalogSlice.reducer;
