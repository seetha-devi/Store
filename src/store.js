import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from './features/cart/cartSlice.js';
// import ProductReducer from './features/product/productSlice.js';
import cartReducer from './features/cart/cartSlice';
import catalogReducer from './features/catalog/catalogSlice';

const store = configureStore({
  reducer: {
    // cart: cartReducer,
    // product:ProductReducer,
    cart: cartReducer,
    catalog: catalogReducer,
  },
  // devTools:true,
});

export default store;



