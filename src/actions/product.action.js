import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
} from "./constant";

export const getProductsSuccess = (products) => {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload: products,
  };
};

export const getProductsFailure = (error) => {
  return {
    type: GET_PRODUCTS_FAILURE,
    payload: error,
  };
};

export const getProductsRequest = (category) => {
  return {
    type: GET_PRODUCTS_REQUEST,
    payload: category,
  };
};
