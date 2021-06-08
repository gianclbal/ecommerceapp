export const setUserName = username => ({ 
    type: 'USER_SET_USERNAME',
    username,
});

export const setUser = user => ({ 
    type: 'USER_SET_USER',
    user,
});

export const setPassword = password => ({
    type: 'USER_SET_PASSWORD',
    password,
});

export const setIsLoggedIn = isLoggedIn => ({
    type: 'USER_SET_IS_LOGGED_IN',
    isLoggedIn,
});

export const setIsOwner = isOwner => ({
    type: 'USER_SET_IS_OWNER',
    isOwner,
});

export const setAuctionListId = auctionId => ({
    type: 'USER_SET_AUCTION_LISTID',
    auctionId,
  });
  
export const setUserCart = userCart => ({
type: 'USER_SET_CART',
userCart,
});
  
export const userLogOut = {
    type: 'USER_RESET'
}
      


