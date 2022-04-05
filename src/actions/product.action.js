import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  SET_LABELS,
  SET_PRICERANGE_CHECK,
  SET_RATING_CHECK,
  SET_TYPE_CHECK_REQUEST,
  SET_TYPE_CHECK_SUCCESS,
  SET_BRAND_CHECK_REQUEST,
  SET_BRAND_CHECK_SUCCESS,
  SET_RATING_CHECK_REQUEST,
  SET_RATING_CHECK_SUCCESS,
  SET_PRICERANGE_CHECK_REQUEST,
  SET_PRICERANGE_CHECK_SUCCESS,
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

export const setTypeCheckRequest = (typeList) => {
  return {
    type: SET_TYPE_CHECK_REQUEST,
    payload: typeList,
  };
};

export const setTypeCheckSuccess = (typeList) => {
  return {
    type: SET_TYPE_CHECK_SUCCESS,
    payload: typeList,
  };
};

export const setBrandCheckRequest = (brandList) => {
  return {
    type: SET_BRAND_CHECK_REQUEST,
    payload: brandList,
  };
};

export const setBrandCheckSuccess = (brandList) => {
  return {
    type: SET_BRAND_CHECK_SUCCESS,
    payload: brandList,
  };
};

export const setRatingCheckRequest = (rating) => {
  return {
    type: SET_RATING_CHECK_REQUEST,
    payload: rating,
  };
};

export const setRatingCheckSuccess = (rating) => {
  return {
    type: SET_RATING_CHECK_SUCCESS,
    payload: rating,
  };
};

export const setPriceRangeCheckRequest = (priceRange) => {
  return {
    type: SET_PRICERANGE_CHECK_REQUEST,
    payload: priceRange,
  };
};

export const setPriceRangeCheckSuccess = (priceRange) => {
  return {
    type: SET_PRICERANGE_CHECK_SUCCESS,
    payload: priceRange,
  };
};
