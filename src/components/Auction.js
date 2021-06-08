import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import ViewListings from './ViewListings';
import { setUser } from '../redux/actions/messageActions';
import { defaultMaxListeners } from 'ws';

const Auction = ({ ws, userMode }) => {
    const dispatch = useDispatch();
    const text = useSelector(state => state.messageReducer.text);
    const messages = useSelector(state => state.messageReducer.messages);
    const username = useSelector(state => state.userReducer.username);
    // const [messageName, setMessageName] = useState("");
    const [listing, setListing] = useState([]);
    const auctions = useSelector(state => state.auctionReducer.auctions);
    const auctionId = useSelector(state => state.userReducer.auctionId);
   
    console.log("Auction ID here");
    console.log(auctionId);

    // useEffect(() => {
    //     axios.get(`/api/viewListings?listingId=${auctionId}`)
    //         .then((res) => {
    //             setListing(res.data.items);
    //             console.log(res);
    //         })
    //         .catch((e) => console.log(e));

    // }, [setListing, dispatch]);


    const submitHandler = () => {
        
        console.log(text);
        ws.send(JSON.stringify({
            date: new Date(),
            text: text,
        }));
    }

    return (
        <div>
            <ViewListings />
            <h1>Auction</h1>
       
            <input
                value={text}
                onChange={e => dispatch({ type: 'SET_TEXT', text: e.target.value })} />
            <button onClick={() => submitHandler()}>Submit</button>

            <div>
                {messages.map(message => (
                    <div className="message">
                        <h4>{message.date}</h4>
                        {message.text}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Auction;
