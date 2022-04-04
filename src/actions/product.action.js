import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  SET_LABELS,
} from "./constant";

export const getProductsSuccess = (productsPayload) => {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload: productsPayload,
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

export const setLabels = (label) => {
  return {
    type: SET_LABELS,
    payload: label,
  };
};
