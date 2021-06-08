const INITIAL_STATE = {
    auctions: [],
  };
  
  const auctionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'AUCTION_SET_AUCTIONS':
        return{
          ...state,
          auctions: action.auctions,
        };
      default:
        return state;
  
    }
  
  
  };
  
  
  export default auctionReducer;
  