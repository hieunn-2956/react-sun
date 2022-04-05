import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
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
  SET_SEARCH_SUCCESS,
  SET_SEARCH_REQUEST,
  SET_PRICELOW_REQUEST,
  SET_PRICELOW_SUCCESS,
  SET_CUSTOMPRICE_REQUEST,
  SET_CUSTOMPRICE_SUCCESS,
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

export const setPageRequest = (page) => {
  return {
    type: SET_PAGE_REQUEST,
    payload: page,
  };
};

export const setPageSuccess = (page) => {
  return {
    type: SET_PAGE_SUCCESS,
    payload: page,
  };
};

export const setSortRequest = (sort) => {
  return {
    type: SET_SORT_REQUEST,
    payload: sort,
  };
};

export const setSortSuccess = (sort) => {
  return {
    type: SET_SORT_SUCCESS,
    payload: sort,
  };
};

export const setSearchRequest = (queryString) => {
  return {
    type: SET_SEARCH_REQUEST,
    payload: queryString,
  };
};

export const setSearchSuccess = (queryString) => {
  return {
    type: SET_SEARCH_SUCCESS,
    payload: queryString,
  };
};

export const setCustomPriceRequest = (value) => {
  return {
    type: SET_CUSTOMPRICE_REQUEST,
    payload: value,
  };
};

export const setCustomPriceSuccess = (value) => {
  return {
    type: SET_CUSTOMPRICE_SUCCESS,
    payload: value,
  };
};
