import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDescription, setType, setPrice, setTitle, setListings } from '../redux/actions/listingActions';
import { setUsers, setUserListing } from '../redux/actions/userActions';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const ListingCreationForm = () => {
  const dispatch = useDispatch(); //alerts react something has changed, pass it to dispatch
  const description = useSelector(state => state.listingReducer.description);
  const type = useSelector(state => state.listingReducer.type);
  const price = useSelector(state => state.listingReducer.price);
  const title = useSelector(state => state.listingReducer.title);
  const listings = useSelector(state => state.listingReducer.listings);
  const username = useSelector(state => state.userReducer.username);
  const password = useSelector(state => state.userReducer.password);
  const user = useSelector(state => state.userReducer.user);
  // const userListing = useSelector(state => state.userReducer.userListing);


  useEffect(() => {

  }, [setListings, handleSubmit])

  const handleDescriptionChange = (e) => {
    const action = setDescription(e.target.value);
    dispatch(action);
  };

  const handleTypeChange = (e) => {
    const action = setType(e.target.value);
    dispatch(action);
  };

  const handlePriceChange = (e) => {
    const action = setPrice(e.target.value);
    dispatch(action);
  };

  const handleTitleChange = (e) => {
    const action = setTitle(e.target.value);
    dispatch(action);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      description: description,
      type: type,
      price: price,
      title: title,
      ownerid: user._id,
    };

    axios.post(`/api/createListing?ownerid=${user._id}`, body)
      .then((res) => {
        console.log(res);
        const newItem = res.data.userItems;

        console.log(newItem);

        const listingArray = res.data.items; //
        dispatch(setListings(listingArray)); //this replaces the whole listing with the new item
        // dispatch(setUserListing(newItem)); //this takes in only the new item. Not the whole array.
      })
      .catch((e) => console.log('Failed to make post' + e));

    axios.get(`/api/viewListings`)
      .then((res) => {
        dispatch(setListings(res.data.items));
        console.log(res);
      })
      .catch((e) => console.log(e));


  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            id="input-title"
            placeholder="Title"
            required
            onChange={handleTitleChange}
            value={title}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formType">
          <Form.Label>Type</Form.Label>
          <Form.Control
            id="input-type"
            placeholder="Type"
            onChange={handleTypeChange}
            required
            value={type}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            id="input-description"
            placeholder="Description"
            onChange={handleDescriptionChange}
            value={description}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            id="input-price"
            placeholder="Price"
            type="number"
            min="1"
            step="any"
            required
            onChange={handlePriceChange}
            value={price}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
  </Button>
      </Form>

      {/* <h2>{user._id}</h2> */}
      {/* <p>Description:</p>
      <form onSubmit={handleSubmit}>
        <input
          id="input-description"
          placeholder="Description"
          onChange={handleDescriptionChange}
          value={description}></input>
        <p>Type:</p>
        <input
          id="input-type"
          placeholder="Type"
          onChange={handleTypeChange}
          required
          value={type}></input>
        <p>Price:</p>
        <input
          id="input-price"
          placeholder="Price"
          type="number"
          min="1"
          step="any"
          required
          onChange={handlePriceChange}
          value={price}></input>
        <p>Title:</p>
        <input
          id="input-title"
          placeholder="Title"
          required
          onChange={handleTitleChange}
          value={title}></input>

        <button type="submit">Submit</button>

      </form> */}


    </div>
  );
};

export default ListingCreationForm;
