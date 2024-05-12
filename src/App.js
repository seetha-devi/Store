import React, {useEffect, useState}from 'react';
import ProductListing from './components/ProductListing';
import Header from './components/Header';
import ShoppingCart from './components/ShoppingCart';
import Error from './components/Error';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  { useSelector, useDispatch } from 'react-redux';
import { setError } from './features/cart/cartSlice'
function App() {
  const dispatch = useDispatch();
  const carterror = useSelector(state => state.cart.error);
  const producterror = useSelector(state => state.catalog.error);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleclose = () => {
    dispatch(setError(null)); 
    setErrorMessage(null); 
  }

  useEffect(() => {
    let timeoutid
    const errorhandler = () => {
      const message = carterror || producterror;
      setErrorMessage(message); 
        timeoutid = setTimeout(() => {
          handleclose()
      }, 5000);
    };

    if (carterror || producterror) {
      errorhandler(); 
    }

    return () => {
      
      clearTimeout(timeoutid);
    };
  }, [carterror, producterror, dispatch]);

  return (
    <Router>
      <div className="App">
        <Header />
        {errorMessage && <Error  message={errorMessage} onClose={handleclose}/> }
        <Routes>
          <Route path="/" exact element={<ProductListing/>} />
          <Route path="/cart" element={<ShoppingCart/>} />
        </Routes>
     
      </div>
    </Router>
  );
}

export default App;
