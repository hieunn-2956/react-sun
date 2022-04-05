import {
  takeEvery,
  select,
  all,
  call,
  put,
  takeLatest,
} from "redux-saga/effects";
import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  SET_TYPE_CHECK_REQUEST,
  SET_BRAND_CHECK_REQUEST,
  SET_RATING_CHECK_REQUEST,
  SET_PRICERANGE_CHECK_REQUEST,
  SET_TYPE_CHECK_SUCCESS,
  SET_RATING_CHECK_SUCCESS,
  SET_PRICERANGE_CHECK_SUCCESS,
  SET_BRAND_CHECK_SUCCESS,
} from "../actions/constant";
import {
  getProductsSuccess,
  getProductsFailure,
  setLabels,
  setTypeCheckSuccess,
  setBrandCheckSuccess,
  setRatingCheckSuccess,
  setPriceRangeCheckSuccess,
} from "../actions";
import { initialState } from "../reducers/product.reducer";
import axiosInstance from "../helper/axios";

const getProduct = (state) => state.product;

const getProducts = async ({
  category,
  typeList,
  brandList,
  rating,
  priceRange,
  sortBy,
  queryString,
  page,
}) => {
  const typeParams =
    typeList && typeList.map((type) => `&type=${type}`).join("");
  const brandParams =
    brandList && brandList.map((brand) => `&brand=${brand}`).join("");
  const response = await axiosInstance.get(
    `/products?${typeParams}${brandParams}`,
    {
      params: {
        _page: page,
        _limit: initialState.limit,
        categories_like: category,
        ...(rating && { rating }),
        ...(priceRange && { price_range: priceRange }),
        ...(sortBy && { _sort: "price" }),
        ...(sortBy && { _order: sortBy }),
        ...(queryString && { name_like: queryString }),
      },
    }
  );
  return response.data;
};

const getAllProducts = async (category) => {
  const response = await axiosInstance.get(`/products`, {
    params: {
      categories_like: category,
    },
  });
  return { products: response.data };
};

const getLabels = (list) => {
  let typeListLabel = [];
  let brandListLabel = [];
  let priceRange = [];
  let ratingList = {
    1: { count: 0 },
    2: { count: 0 },
    3: { count: 0 },
    4: { count: 0 },
    5: { count: 0 },
  };
  list.map((data) => {
    if (!typeListLabel.includes(data.type)) {
      typeListLabel.push(data.type);
    }
    if (!brandListLabel.includes(data.brand)) {
      brandListLabel.push(data.brand);
    }
    if (!priceRange.includes(data.price_range)) {
      priceRange.push(data.price_range);
    }
    let rating = data.rating;
    let tempRatingCount = ratingList[rating];
    if (tempRatingCount) {
      tempRatingCount = ratingList[rating].count;
      tempRatingCount += 1;
      ratingList[rating].count = tempRatingCount;
    }
  });
  let returnTypeLabels = typeListLabel.slice(0, 5);
  let returnBrandLabels = brandListLabel.slice(0, 5);
  return {
    brandLabels: returnBrandLabels,
    typeLabels: returnTypeLabels,
    priceLabels: priceRange,
    ratingLabels: ratingList,
  };
};

export function* setLabelsByCategory({ payload }) {
  try {
    const allProducts = yield getAllProducts(payload.category);
    const labels = yield getLabels(allProducts.products);
    yield put(setLabels(labels));
  } catch (err) {
    console.log(err);
  }
}

export function* getProductsByCategory({ payload }) {
  const { newCategory } = payload;
  const product = yield select(getProduct);
  const { category, ...rest } = product;

  try {
    if (newCategory) {
      const products = yield getProducts({
        category: newCategory,
        ...rest,
      });
      yield put(getProductsSuccess({ products, category: newCategory }));
    } else {
      const products = yield getProducts({
        category,
        ...rest,
      });
      yield put(getProductsSuccess({ products, category }));
    }
  } catch (error) {
    yield put(getProductsFailure(error));
  }
}

export function* filterProductsByType({ payload: typeList }) {
  yield put(setTypeCheckSuccess(typeList));
}

export function* filterProductsByBrand({ payload: brandList }) {
  yield put(setBrandCheckSuccess(brandList));
}

export function* filterProductsByRating({ payload: rating }) {
  yield put(setRatingCheckSuccess(rating));
}

export function* filterProductsByPriceRange({ payload: priceRange }) {
  yield put(setPriceRangeCheckSuccess(priceRange));
}

export function* onLoadingProducts() {
  yield takeEvery(GET_PRODUCTS_REQUEST, getProductsByCategory);
  yield takeEvery(GET_PRODUCTS_SUCCESS, setLabelsByCategory);
}

export function* onSetType() {
  yield takeLatest(SET_TYPE_CHECK_REQUEST, filterProductsByType);
  yield takeEvery(SET_TYPE_CHECK_SUCCESS, getProductsByCategory);
}

export function* onSetBrand() {
  yield takeLatest(SET_BRAND_CHECK_REQUEST, filterProductsByBrand);
  yield takeEvery(SET_BRAND_CHECK_SUCCESS, getProductsByCategory);
}

export function* onSetRating() {
  yield takeLatest(SET_RATING_CHECK_REQUEST, filterProductsByRating);
  yield takeEvery(SET_RATING_CHECK_SUCCESS, getProductsByCategory);
}

export function* onSetPriceRange() {
  yield takeLatest(SET_PRICERANGE_CHECK_REQUEST, filterProductsByPriceRange);
  yield takeEvery(SET_PRICERANGE_CHECK_SUCCESS, getProductsByCategory);
}

export function* productSaga() {
  yield all([
    call(onLoadingProducts),
    call(onSetType),
    call(onSetBrand),
    call(onSetRating),
    call(onSetPriceRange),
  ]);
}
