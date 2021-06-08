import React from 'react';
import Cart from '../components/Cart';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


const CartPage = () => {
  const history = useHistory();
  const products = useSelector(state => state.cartReducer.products);

  const handleCheckOutClick = () => {
    let path = "/checkout";
    history.push(path);
  };

  return (
    <div>
      <Container>
      <h1>Your Cart</h1>
      <Cart />
      
      <Button variant="primary" onClick={handleCheckOutClick} disabled={products.length === 0}>Checkout</Button>

      </Container>
     
    </div>
  );
};

export default CartPage;