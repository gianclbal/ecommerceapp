import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';
import Cart from '../components/Cart';
import axios from 'axios';
import { setListings } from '../redux/actions/listingActions';
import { setProducts } from '../redux/actions/cartActions';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CheckOutPage = () => {
  const dispatch = useDispatch();
  const username = useSelector(state => state.userReducer.username);
  const history = useHistory();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const user = useSelector(state => state.userReducer.user);
  const products = useSelector(state => state.cartReducer.products);


  const handlePlaceOrder = (e, productArray) => {
    e.preventDefault()
    productArray.forEach(p => console.log(p.listingId))
    productArray.forEach(p => {
      axios.get(`/api/deleteListing?id=${p.listingId}`)
        .then((res) => {
          dispatch(setListings(res.data.items));
          console.log("AFTER DELETION");
          console.log(res);
        })
        .catch(() => console.log('Failed to delete item.'))

      axios.get(`/api/deleteFromCart?listingId=${p.listingId}&cartId=${user._id}`)
        .then((res) => {
          dispatch(setProducts(res.data.cart));
          console.log(res);
        })
        .catch(() => console.log('Failed to delete item.'))
    })

  };

  const handleCaptcha = (value) => {
    console.log("Captcha value:", value)
  };


  const handleGoToConfirm = () => {
    let path = "/orderconfirmed";
    history.push(path);
  }

  return (
    <div>
      <Container>
        <h1>Place your order</h1>
        <Cart />
        <Form>
          <Form.Group className="mb-3" controlId="formFullName">
            <Form.Label>Full name</Form.Label>
            <Form.Control type="email" placeholder="Enter your full name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control placeholder="Apartment, studio, or floor" />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control />
            </Form.Group>
          </Row>

          <ReCAPTCHA
            sitekey="6LeBNNgaAAAAAKsnTZEWqr84T6_ATj8rYH9tQ1xg"
            onChange={handleCaptcha}
          />


          <Button disabled={products.length === 0} variant="primary" type="submit" onClick={(e) => { handlePlaceOrder(e, products); handleGoToConfirm(); }}>
            Place Order
  </Button>
        </Form>


      </Container>
    </div>
  );
};

export default CheckOutPage;

/* <h1>Check Out</h1>
       <Cart />

       <form>
         <label>UserName: {username}</label>
         <label>Full Name</label>
         <input
           id="input-name"
           placeholder="Name"
           onChange={(e) => setName(e.target.value)}
           value={name}
           required
         />
         <label>Address</label>
         <input
           id="input-address"
           placeholder="Address"
           onChange={(e) => setAddress(e.target.value)}
           required
           value={address}
         />
         <label>Credit Card Number</label>
         <input
           id="credit-card"
           placeholder="Credit Card Number"
           onChange={(e) => setCreditCard(e.target.value)}
           required
           value={creditCard}
         />
         <ReCAPTCHA
           sitekey="6LeBNNgaAAAAAKsnTZEWqr84T6_ATj8rYH9tQ1xg"
           onChange={handleCaptcha}
         />
         <button type="submit" onClick={(e) => { handlePlaceOrder(e, products); handleGoToConfirm(); }}>Place Order</button>
       </form> */