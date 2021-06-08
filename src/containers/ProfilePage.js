import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ViewListings from '../components/ViewListings';
import ListingCreationForm from '../components/ListingCreationForm';
import Inquiries from '../components/Inquiries';
import { setUsers } from '../redux/actions/userActions';
import axios from 'axios';
import { setListings } from '../redux/actions/listingActions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Cart from '../components/Cart';


const ProfilePage = ({ isLoggedIn }) => {
  const username = useSelector(state => state.userReducer.username);





  return (
    <div>
    
      <Container>
      <h1>Hello, {username}</h1>
        <Tabs defaultActiveKey="myListings" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="addListing" title="Add a listing">
            <ListingCreationForm/>
          </Tab>
          <Tab eventKey="myListings" title="View my listings">
          <ViewListings userMode={false} />
          <Inquiries toggleInquiry={false} />
          </Tab>
          <Tab eventKey="cart" title="Cart">
          <Cart />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default ProfilePage;