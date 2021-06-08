const INITIAL_STATE = {
  products: [],
  payments: {
    total: 0,
    taxRate: 0.06,
    currency: 'USD'
  },
  owner: '',
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CART_SET_PRODUCTS':
      return {
        ...state,
        products: action.products,
      };
    case 'CART_SET_OWNER':
      return {
        ...state,
        owner: action.owner,
      };
    case 'CART_SET_PAYMENT_TOTAL':
      return {
        ...state,
        payments: {
          ...state.payments,
          total: action.total,
        }
      }
    case 'CART_RESET':
      return INITIAL_STATE; //always return inital state
    default:
      return state;
  }

};


export default cartReducer;
