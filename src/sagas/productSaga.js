import {
  takeEvery,
  select,
  all,
  call,
  put,
  takeLatest,
} from "redux-saga/effects";
import { GET_PRODUCTS_REQUEST } from "../actions/constant";
import { getProductsSuccess, getProductsFailure } from "../actions";
import { initialState } from "../reducers/product.reducer";
import axiosInstance from "../helper/axios";

const getProducts = async (category) => {
  const response = await axiosInstance.get(`/products`, {
    params: {
      _page: initialState.page,
      _limit: initialState.limit,
      categories_like: category,
    },
  });
  return { products: response.data };
};

export function* getProductsByCategory({ payload: category }) {
  try {
    const products = yield getProducts(category);
    yield put(getProductsSuccess(products));
  } catch (error) {
    yield put(getProductsFailure(error));
  }
}

export function* onLoadingProducts() {
  yield takeEvery(GET_PRODUCTS_REQUEST, getProductsByCategory);
}

export function* productSaga() {
  yield all([call(onLoadingProducts)]);
}
