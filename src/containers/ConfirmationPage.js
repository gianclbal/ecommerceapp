import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
const CheckOutPage = () => {
  const username = useSelector(state => state.userReducer.username);
  const history = useHistory();
  const [confirmNumber, setConfirmNumber] = useState(0);

  useEffect(() => {
    const generateConfirmNumber = () => {
      const confirm = Math.floor(Math.random * 9);
      setConfirmNumber(confirm);
    };

    generateConfirmNumber()

  }, [setConfirmNumber])

  const handleGoBackMarket = () => {
    let path = "/market";
    history.push(path);
  };

  return (
    <div>
      <Container>
      <h1>Your order has been placed, {username}!</h1>
      <h3>Confirmation Number: {confirmNumber} </h3>
      <Button variant='primary' onClick={handleGoBackMarket}>Go back to market</Button>
      </Container>
     
    </div>
  );
};

export default CheckOutPage;