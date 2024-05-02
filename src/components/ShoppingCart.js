import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice';
import { MdDeleteOutline } from "react-icons/md";
const ShoppingCart = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const total = useSelector(state => state.cart.total);

  const handleRemoveFromCart = id => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  if (items.length === 0) {
    return (
      <div className="shoppingCart">
        <h2 className="cartTitle">Shopping Cart</h2>
        <p>No items found in the cart.</p>
      </div>
    );
  }

  return (
    <div className="shoppingCart">
      <h2 className="cartTitle">Shopping Cart</h2>
      <div className="styles.cartItems">
        {items.map(item => (
          <div key={item.id} className="cartItem">
            <div className="cartItemDetails">
              <img src={item.imageURL} alt={item.name} className="cartItemImage" />
              <div className="cartItemInfo">
                <p className="cartItemName">{item.name}</p>
                <p className="cartItemPrice">Price: ${item.price}</p>
              </div>
            </div>
            <div className="cartItemActions">
              <div className="quantityControl">
                <button
                  className="quantityButton"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={e => handleQuantityChange(item.id, parseInt(e.target.value))}
                  className="quantityInput"
                />
                <button
                  className="quantityButton"
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button onClick={() => handleRemoveFromCart(item.id)} className="removeFromCartButton">Remove</button>
              <MdDeleteOutline className="removeicon" onClick={() => handleRemoveFromCart(item.id)} />
            </div>
          </div>
        ))}
      </div>
      <div className="cartTotal">
        <p className="totalText">Total: ${total}</p>
        <button className="checkoutButton">Checkout</button>
      </div>
      </div>
  );
};

export default ShoppingCart;
