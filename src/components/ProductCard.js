import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
// import styles from '../styles/ProductCard.module.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="productCard">
      <img src={product.imageURL} alt={product.name} className="productImage" />
    <div className="productDetail">
      <h3 className="productName">{product.name}</h3>
      <p className="productPrice">Rs.{product.price}</p>
     </div>
      <button onClick={handleAddToCart} className="addToCartButton">Add to Cart</button>
    </div>
  );
};

export default ProductCard;
