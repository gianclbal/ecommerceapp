import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setListings } from '../redux/actions/listingActions';
import { setAuctionListId } from '../redux/actions/userActions';
import Listing from './Listing';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Inquiries from './Inquiries';

const ViewListings = ({ userMode }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user);
  const username = useSelector(state => state.userReducer.username);
  const password = useSelector(state => state.userReducer.password);
  const listings = useSelector(state => state.listingReducer.listings);
  const auctionId = useSelector(state => state.userReducer.auctionId);
  const auctions = useSelector(state => state.auctionReducer.auctions);
  // const [listId, setListId] = useState(" ");


  const handleGetId = (id) => {
    dispatch(setAuctionListId(id));
    console.log("Succesfully stored auction list id.")
  }

  let userListing = [];
  let auctionListing = [];

  useEffect(() => {
    axios.get(`/api/viewListings`)
      .then((res) => {
        dispatch(setListings(res.data.items));
        console.log(res);
      })
      .catch((e) => console.log(e));
  }, [setListings, dispatch]);


  const renderSwitch = (param) => {
    switch (param) {
      case false:
        return userListing = listings.filter((listing) => listing.ownerid === user._id)
        .map((l, i) => (
            <Col>
              <Listing key={i} listing={l} userMode={userMode} handleGetId={handleGetId} />
            </Col>
          
        ))
      case true:
        return listings.map((listing, i) => (
        
            <Col>
              <Listing key={i} listing={listing} userMode={userMode} handleGetId={handleGetId} />
            </Col>
       
          
        ))
      case "auction":
        return auctions.map((listing, i) => (
       
            <Col>
            <Listing key={i} listing={listing} userMode={userMode} handleGetId={handleGetId} />
            </Col>
       
          ))

      default:
        return userListing = listings.filter((listing) => listing.ownerid === user._id)
        .map((l, i) => (
        
            <Col>
              <Listing key={i} listing={l} userMode={userMode} handleGetId={handleGetId} />
          </Col>
      
        ))

    }
  }


  return (
    <div>
      <Container fluid>

     
     <Row>
          {renderSwitch(userMode)}
      </Row>
      </Container>
         

      
        
    </div>
  );
};

export default ViewListings;