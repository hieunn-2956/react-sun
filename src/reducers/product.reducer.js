import { StaticTimePicker } from "@mui/lab";
import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
  SET_LABELS,
  SET_RATING_CHECK,
  SET_PRICERANGE_CHECK,
  SET_TYPE_CHECK_REQUEST,
  SET_TYPE_CHECK_SUCCESS,
  SET_BRAND_CHECK_REQUEST,
  SET_BRAND_CHECK_SUCCESS,
  SET_RATING_CHECK_REQUEST,
  SET_RATING_CHECK_SUCCESS,
  SET_PRICERANGE_CHECK_REQUEST,
  SET_PRICERANGE_CHECK_SUCCESS,
} from "../actions/constant";

export const initialState = {
  category: "Appliances",
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
      return {
        ...state,
        loading: true,
      };
    case GET_PRODUCTS_SUCCESS:
      const { products, category } = action.payload;
      console.log(category);
      return {
        ...state,
        products,
        category,
        loading: false,
      };
    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    case SET_LABELS: {
      const { brandLabels, typeLabels, priceLabels, ratingLabels } =
        action.payload;
      return {
        ...state,
        brandLabels,
        typeLabels,
        priceLabels,
        ratingLabels,
      };
    }

    case SET_TYPE_CHECK_REQUEST:
      return {
        ...state,
      };
    case SET_TYPE_CHECK_SUCCESS:
      return {
        ...state,
        typeList: action.payload,
      };

    case SET_BRAND_CHECK_REQUEST:
      return {
        ...state,
      };
    case SET_BRAND_CHECK_SUCCESS:
      return {
        ...state,
        brandList: action.payload,
      };

    case SET_RATING_CHECK_REQUEST:
      return {
        ...state,
      };
    case SET_RATING_CHECK_SUCCESS:
      return {
        ...state,
        rating: action.payload,
      };

    case SET_PRICERANGE_CHECK_REQUEST:
      return {
        ...state,
      };

    case SET_PRICERANGE_CHECK_SUCCESS:
      return {
        ...state,
        priceRange: action.payload,
      };

    default:
      return state;
  }
};
