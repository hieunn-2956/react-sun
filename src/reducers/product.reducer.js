import { StaticTimePicker } from "@mui/lab";
import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
  SET_LABELS,
  SET_TYPE_CHECK_REQUEST,
  SET_TYPE_CHECK_SUCCESS,
  SET_BRAND_CHECK_REQUEST,
  SET_BRAND_CHECK_SUCCESS,
  SET_RATING_CHECK_REQUEST,
  SET_RATING_CHECK_SUCCESS,
  SET_PRICERANGE_CHECK_REQUEST,
  SET_PRICERANGE_CHECK_SUCCESS,
  SET_PAGE_REQUEST,
  SET_PAGE_SUCCESS,
  SET_SORT_REQUEST,
  SET_SORT_SUCCESS,
  SET_SEARCH_REQUEST,
  SET_SEARCH_SUCCESS,
  SET_CUSTOMPRICE_SUCCESS,
  SET_CUSTOMPRICE_REQUEST,
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
  sortBy: "",
  queryString: "",
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
      const { products, category, totalProduct } = action.payload;
      console.log(category);
      return {
        ...state,
        products,
        category,
        totalProduct,
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
        page: 1,
      };

    case SET_BRAND_CHECK_REQUEST:
      return {
        ...state,
      };
    case SET_BRAND_CHECK_SUCCESS:
      return {
        ...state,
        brandList: action.payload,
        page: 1,
      };

    case SET_RATING_CHECK_REQUEST:
      return {
        ...state,
      };
    case SET_RATING_CHECK_SUCCESS:
      return {
        ...state,
        rating: action.payload,
        page: 1,
      };

    case SET_PRICERANGE_CHECK_REQUEST:
      return {
        ...state,
      };

    case SET_PRICERANGE_CHECK_SUCCESS:
      return {
        ...state,
        priceRange: action.payload,
        page: 1,
        lowPrice: "",
        highPrice: "",
      };

    case SET_PAGE_REQUEST:
      return {
        ...state,
      };

    case SET_PAGE_SUCCESS:
      return {
        ...state,
        page: action.payload,
      };

    case SET_SORT_REQUEST:
      return {
        ...state,
      };

    case SET_SORT_SUCCESS:
      return {
        ...state,
        sortBy: action.payload,
      };

    case SET_SEARCH_REQUEST:
      return {
        ...state,
      };

    case SET_SEARCH_SUCCESS:
      return {
        ...state,
        queryString: action.payload,
        page: 1,
      };

    case SET_CUSTOMPRICE_REQUEST:
      return {
        ...state,
      };

    case SET_CUSTOMPRICE_SUCCESS:
      const { lowPrice, highPrice } = action.payload;
      return {
        ...state,
        lowPrice,
        highPrice,
        priceRange: "",
        page: 1,
      };

    default:
      return state;
  }
};
