import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
} from "../actions/constant";

export const initialState = {
  category: "",
  products: [],
  totalProduct: 0,
  page: 1,
  limit: 12,
  typeList: [],
  brandList: [],
  priceRange: "",
  rating: 0,
  typeLabels: [],
  brandLabels: [],
  priceLabels: [],
  ratingLabels: {},
  loading: true,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return (state = {
        ...state,
        loading: true,
      });
    case GET_PRODUCTS_SUCCESS:
      return (state = {
        ...state,
        products: action.payload.products,
        loading: false,
      });
    case GET_PRODUCTS_FAILURE:
      return (state = {
        ...state,
        error: action.payload.error,
        loading: false,
      });
    default:
      return state;
  }
};
