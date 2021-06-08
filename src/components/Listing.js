import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setListings } from '../redux/actions/listingActions';
import { setInquiries } from '../redux/actions/inquiryActions';
import { setProducts } from '../redux/actions/cartActions';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { setAuction } from '../redux/actions/auctionActions';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Inquiries from './Inquiries';

const Listing = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const products = useSelector(state => state.cartReducer.products);
  const [message, setMessage] = useState('');
  const user = useSelector(state => state.userReducer.user);
  const [listId, setListId] = useState('');
  const auctionId = useSelector(state => state.userReducer.auctionId);
  const auctions = useSelector(state => state.auctionReducer.auctions);
  // const [query, setQuery] = useState('' || {});
  // const users = useSelector(state => state.userReducer.users);

  useEffect(() => {
    axios.get(`api/getAuctions`)
      .then((res) => {
        dispatch(setAuction(res.data.auctions));
        console.log("AUCTION ITEMS RECEIVED FROM DATABASE into REDUCER");
        console.log(res);
      })
      .catch(e => console.log(e));

  }, [setProducts, setAuction]);

  //ADD TO CART

  const handleAddToCart = (listing) => {
    const cartItem = {
      cartId: user._id,
      description: listing.description,
      type: listing.type,
      title: listing.title,
      price: listing.price,
      listingId: listing._id,
    }

    axios.post(`/api/addToCart?listingId=${listing._id}`, cartItem)
      .then((res) => {
        console.log(res);
        const productArray = res.data.cart;
        dispatch(setProducts(productArray));
        // alert(`${listing.title} succesfully added to cart.`)
      })
      .catch((e) => console.log(e));

  }


  //DELETE LISTING

  const handleDelete = (listingId) => {
    axios.get(`/api/deleteListing?id=${listingId}`)
      .then((res) => {
        dispatch(setListings(res.data.items));
        console.log("AFTER DELETION");
        console.log(res);
      })
      .catch(() => console.log('Failed to delete item.'));

  }

  const handleAuctionClick = (e, listingId) => {
    console.log(listingId);
    e.preventDefault();

    const auctionItem = {
      listingId: listingId,
    }

    axios.post(`/api/makeAuction?listingId=${listingId}`, auctionItem)
      .then((res) => {
        console.log(res);
        console.log("RES FROM AUCTION HERE")
        dispatch(setAuction(res.data.auctions));
      })
      .catch((e) => console.log(e + "Error fetching auction data"))

    // console.log(listingId);
    props.handleGetId(listingId);

  }

  // const handleDelete = (listingId) => {


  const handleGetInquiry = (itemId) => {
    axios.get(`/api/getInquiries?listingId=${itemId}`)
      .then((res) => {
        dispatch(setInquiries(res.data.inquiries));
        console.log(res);
      })
      .catch((e) => console.log(e));
  };

  const addInquiry = (e) => {
    setMessage(e.target.value);
  };

  // const handleHideInquiry = () => {
  //   return <p></p>
  // }

  const handleInquirySubmit = (e, itemId) => {
    // console.log(listing);
    e.preventDefault();
    const body = {
      message: message,
      listingIdParent: itemId,
    };
    console.log(body);

    axios.post(`/api/makeInquiry?listingId=${itemId}`, body)

      .then((res) => console.log(res))
      .catch((e) => console.log(e));

  };

  const handleGoToAuctionPage = () => {
    let path = "/auction";
    history.push(path);
  }





  //CURRENCY FORMATTER (Transforms strings to currency strings)
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });


  const renderSwitch = (param) => {
    switch (param) {
      case false:
        return <div>
          <ButtonGroup>
            <Button variant="primary" onClick={() => handleDelete(props.listing._id)}>Delete</Button>
            <Button variant="primary" onClick={() => handleGetInquiry(props.listing._id)}>Get Inquiry</Button>
            <Button variant="primary" onClick={(e) => handleAuctionClick(e, props.listing._id)}>Auction</Button>

          </ButtonGroup>

        </div>
      case true:
        return <div>
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} value={message} onChange={addInquiry} />
            </Form.Group>
            <ButtonGroup>
              <Button variant="primary" type="submit" onClick={(e) => {
                console.log(props.listing._id);
                handleInquirySubmit(e, props.listing._id);
              }}>Inquire</Button>

            </ButtonGroup>


          </Form>
          {auctions.find(({ listingId }) => listingId === props.listing._id) ?
            <Button variant="primary" type="submit" onClick={() => handleGoToAuctionPage()}>Join Auction</Button>
            :
            null
          }
          <Button variant="primary" type="submit" onClick={() => handleAddToCart(props.listing)}>Add to Cart</Button>
         
        </div>


      default:

    }
  }


  return (
    <>

      <Card style={{ width: '20rem' }}>
        <Card.Body>
          <Card.Title>{props.listing.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{props.listing.type}</Card.Subtitle>
          {/* <Card.Subtitle className="mb-2 text-muted">Owner: {props.listing.ownerid}</Card.Subtitle> */}
          <Card.Text>
            {props.listing.description}
          </Card.Text>
          <Card.Text><h5>{formatter.format(props.listing.price)}</h5></Card.Text>

          {renderSwitch(props.userMode)}
        </Card.Body>
      </Card>


    </>

  );
};


export default Listing;


//ADD TO CART

// const handleAddToCart = (listing) => {
//   const cartItem = {
//     cartId: user._id,
//     description: listing.description,
//     type: listing.type,
//     title: listing.title,
//     price: listing.price,
//     listingId: listing._id,
//   }

//   axios.post(`/api/addToCart?listingId=${listing._id}`, cartItem)
//     .then((res) => {
//       console.log(res);
//       const productArray = res.data.cart;
//       dispatch(setProducts(productArray));
//       // alert(`${listing.title} succesfully added to cart.`)
//     })
//     .catch((e) => console.log(e));

// }

// const addItem = (item) => {
  //   setCart((prev) => {
  //     return [item, ...prev]
  //   });

  // };



  // const removeItem = (targetIndex) => {
  //   setCart((prev) => {
  //     return prev.filter((i, index) => index !== targetIndex);
  //   });

  // };



  // const itemAlreadyInCart = products.includes(listing);
