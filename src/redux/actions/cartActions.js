export const setProducts = products => ({
  type: 'CART_SET_PRODUCTS',
  products,
});


export const setCartTotal = total => ({
  type: 'CART_SET_PAYMENT_TOTAL',
  total,
});

export const setOwner = owner => ({
  type: 'CART_SET_OWNER',
  owner,
});

export const cartReset = {
  type: 'CART_RESET'
}
    