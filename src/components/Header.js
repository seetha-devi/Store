import React from 'react';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Header = () => {
  const cartItemCount = useSelector(state => state.cart.items);
  return (
    <header className="header">
      <h4>Teerex Store</h4>
      <div className="buttonContainer">
      <Link to="/" className="link">Product</Link>
      <Link to="/cart">
        <MdOutlineAddShoppingCart className="cartIcon" />
        {cartItemCount.length > 0 && <span className="cartItemCount">{cartItemCount.length}</span>}
      </Link>
      </div>
    </header>
  );
};

export default Header;
