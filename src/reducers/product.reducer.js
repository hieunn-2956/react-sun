import { StaticTimePicker } from "@mui/lab";
import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
  SET_LABELS,
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
      return {
        ...state,
        loading: true,
      };
    case GET_PRODUCTS_SUCCESS:
      const { products, category } = action.payload;
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
    default:
      return state;
  }
};
