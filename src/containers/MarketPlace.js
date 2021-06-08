import React from 'react';
import ViewListings from '../components/ViewListings';
import Cart from '../components/Cart';
import { useSelector } from 'react-redux';
import Auction from '../components/Auction';
import { Asset } from '../assets/1x/Asset.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MarketPlace = ({ ws }) => {
 
  return (
    <div>
      <Container>
        <h1>Listings</h1>
            <ViewListings userMode={true} />
      </Container>
     


    </div>
  );
};

export default MarketPlace;