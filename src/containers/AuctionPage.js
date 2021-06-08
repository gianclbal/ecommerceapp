import React, { useState } from 'react';
import Auction from '../components/Auction';
import Listing from '../components/Listing';


const AuctionPage = ({ ws, userMode }) => {

  return (
    <div>
      <Auction ws={ws} userMode={userMode} />
    </div>
  );
};

export default AuctionPage;