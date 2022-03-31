import productsConstant from "./products.constant";

export const initialState = { products: [] };

const productsReducer = (state, action) => {
  switch (action.type) {
    case productsConstant.GET_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

export default productsReducer;
