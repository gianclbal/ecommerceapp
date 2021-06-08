import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setCartTotal } from '../redux/actions/cartActions';
import axios from 'axios';
import { setListings } from '../redux/actions/listingActions';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';


const Cart = () => {
    const dispatch = useDispatch();

    const taxRate = useSelector(state => state.cartReducer.payments.taxRate)
    const products = useSelector(state => state.cartReducer.products);
    const listings = useSelector(state => state.listingReducer.listings);
    const cartTotal = useSelector(state => state.cartReducer.payments.total);
    const user = useSelector(state => state.userReducer.user);
    const [listId, setListId] = useState('');
    let userCart = [];

    let priceArray = products.filter((p) => p.cartId === user._id).map((item) => {
        return parseInt(item.price);
    });

    useEffect(() => {
        axios.get(`/api/viewCart?cartId=${user._id}`)
            .then((res) => {
                console.log(res);
                dispatch(setProducts(res.data.cart));
                console.log(products);
            })
            .catch(() => console.log('Failed to view cart'));


    }, [setProducts])

    const handleDelete = async (listingId) => {
        console.log(listingId);
        axios.get(`/api/deleteFromCart?listingId=${listingId}&cartId=${user._id}`)
            .then((res) => {
                dispatch(setProducts(res.data.cart));
            })
            .catch(() => console.log('Failed to delete item.'));
    };

    //Calculates the subtotal or price before tax
    const totalCalculator = () => {
        //Puts all prices in an array and parses them. 
        let reducer = (accumulator, currentValue) => accumulator + currentValue;

        if (priceArray == 0) {
            return 0
        } else {
            let cartSum = priceArray.reduce(reducer);
            let tax = taxRate * cartSum;
            let total = tax + cartSum;
            return total;
        }
    }

    const handleTotalChange = (e) => {
        const action = setCartTotal(e.target.value);
        dispatch(action);
    }


    //CURRENCY FORMATTER (Transforms strings to currency strings)
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });



    const checkAvailability = (productId) => {
        let isAvailable = false;
        listings.forEach((item) => {
            if (item._id === productId) {
                console.log("Item exists ")
                isAvailable = true;
            }
        })

        return isAvailable;
    }



    return (
        <div>
            {products.length === 0 ? <h5>Your shopping cart is empty</h5> : 
            
           
           

            <ListGroup variant="flush">
            

                {userCart = products.filter((p) => p.cartId === user._id).map((product, index) => (
                    <div>
                        {checkAvailability(product.listingId) ?
                            <ListGroup.Item>
                                <h5>{product.title}</h5>
                                <h6 className="mb-2 text-muted">{product.type}</h6>
                                <p>{product.description}</p>
                                <h6>{formatter.format(product.price)}</h6>
                                    <Button variant="danger" onClick={() => handleDelete(product.listingId)}>Delete</Button>
                            </ListGroup.Item>
                            :
                            <div>
                                <ListGroup.Item variant="warning">
                                    <div>
                                        <h5>Item no longer available. Please delete from your cart.</h5>
                                        <Button variant="primary" onClick={() => handleDelete(product.listingId)}>Delete</Button>
                                    </div>
                                </ListGroup.Item>

                            </div>
                        }
                    </div>
                ))}
                 
                 
            </ListGroup>
            }

                <h4 onChange={() => handleTotalChange}>Subtotal: {formatter.format(totalCalculator())}</h4>

            
        </div>
    );
};

export default Cart;


