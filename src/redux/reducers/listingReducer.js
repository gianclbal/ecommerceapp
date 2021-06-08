const INITIAL_STATE = {
  listings: [],
  description: '',
  type: '',
  price: '',
  title: '',
  owner: '',
};

const listingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LISTING_SET_LISTINGS':
      return {
        ...state,
        listings: action.listings,
      };
    case 'LISTING_SET_DESCRIPTION':
      return {
        ...state,
        description: action.description,
      };
    case 'LISTING_SET_TYPE':
      return {
        ...state,
        type: action.type_item
      };
    case 'LISTING_SET_PRICE':
      return {
        ...state,
        price: action.price,
      };
    case 'LISTING_SET_TITLE':
      return {
        ...state,
        title: action.title,
      };
    case 'LISTING_SET_OWNER':
      return {
        ...state,
        owner: action.owner,
      };
    default:
      return state;
  }
};

export default listingReducer;
