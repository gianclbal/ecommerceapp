const INITIAL_STATE = {
    user: {},
    userCart: [],
    username: '',
    password: '',
    isLoggedIn: false,
    auctionId:'',
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USER_SET_USER':
            return {
                ...state,
                user: action.user,
            };
        case 'USER_SET_USERNAME':
            return {
                ...state,
                username: action.username,
            };
        // case 'USER_SET_USERS':
        //     return {
        //         ...state,
        //         users: action.users,
        //     };
        case 'USER_SET_CART':
            return {
                ...state,
                userCart: action.userCart,
            };
        case 'USER_SET_PASSWORD':
            return {
                ...state,
                password: action.password,
            };
        case 'USER_SET_IS_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
            };
        case 'USER_SET_AUCTION_LISTID':
            return {
                ...state,
                auctionId: action.auctionId,
            };

        case 'USER_RESET':
            return INITIAL_STATE; //always return inital state
        default:
            return state;
    }
};

export default userReducer;