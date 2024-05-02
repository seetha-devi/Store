import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
  error:null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, imageURL, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem?.totalquantity === quantity) {
        state.error = `This item ${name} is already in the cart.`;
        return;
      }

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ id, name, price, imageURL, quantity: 1, totalquantity: quantity });
      }
      state.total += price;
    },
    removeFromCart: (state, action) => {
      const idToRemove = action.payload;
      const itemToRemove = state.items.find(item => item.id === idToRemove);
      state.total -= itemToRemove.price * itemToRemove.quantity;
      state.items = state.items.filter(item => item.id !== idToRemove);
    },
    updateQuantity: (state, action) => {
      const { id, quantity: requestedQuantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);

      if (!itemToUpdate) {
        console.error(`Item with id ${id} not found in the cart.`);
        return;
      }

      if (requestedQuantity > itemToUpdate.totalquantity) {
        state.error = `Max quantity reached.`
        return;
      }

      const quantityDifference = requestedQuantity - itemToUpdate.quantity;

      itemToUpdate.quantity = requestedQuantity;

      state.total += quantityDifference * itemToUpdate.price;
    },
    setError:(state) => {
      state.error=null
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, setError } = cartSlice.actions;

export default cartSlice.reducer;
