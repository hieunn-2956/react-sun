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
  SET_PAGE_REQUEST,
  SET_PAGE_SUCCESS,
  SET_SORT_REQUEST,
  SET_SORT_SUCCESS,
  SET_SEARCH_REQUEST,
  SET_SEARCH_SUCCESS,
  SET_CUSTOMPRICE_REQUEST,
  SET_CUSTOMPRICE_SUCCESS,
} from "../actions/constant";
import {
  getProductsSuccess,
  getProductsFailure,
  setLabels,
  setTypeCheckSuccess,
  setBrandCheckSuccess,
  setRatingCheckSuccess,
  setPriceRangeCheckSuccess,
  setPageSuccess,
  setSortSuccess,
  setSearchSuccess,
  setCustomPriceSuccess,
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
  lowPrice,
  highPrice,
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
        ...(category && { categories_like: category }),
        ...(rating && { rating }),
        ...(priceRange && { price_range: priceRange }),
        ...(sortBy && { _sort: "price" }),
        ...(sortBy && { _order: sortBy }),
        ...(queryString && { name_like: queryString }),
        ...(lowPrice && { price_gte: lowPrice }),
        ...(highPrice && { price_lte: highPrice }),
      },
    }
  );
  const totalProduct = response.headers["x-total-count"];
  return { products: response.data, totalProduct };
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
  let typeListLabel = {};
  let typeListArray = [];
  let brandListLabel = {};
  let brandListArray = [];
  let priceRange = [];
  let ratingList = {
    1: { count: 0 },
    2: { count: 0 },
    3: { count: 0 },
    4: { count: 0 },
    5: { count: 0 },
  };
  list.map((data) => {
    if (!priceRange.includes(data.price_range)) {
      priceRange.push(data.price_range);
    }
    // RATING
    let rating = data.rating;
    let tempRatingCount = ratingList[rating];
    if (tempRatingCount) {
      tempRatingCount = ratingList[rating].count;
      tempRatingCount += 1;
      ratingList[rating].count = tempRatingCount;
    }
    // TYPE
    let type = data.type;
    let temTypeCount = typeListLabel[type];
    if (temTypeCount) {
      temTypeCount = typeListLabel[type].count;
      temTypeCount += 1;
      typeListLabel[type].count = temTypeCount;
    } else {
      typeListLabel[type] = { count: 1 };
    }
    //  BRAND
    let brand = data.brand;
    let tempbrandCount = brandListLabel[brand];
    if (tempbrandCount) {
      tempbrandCount = brandListLabel[brand].count;
      tempbrandCount += 1;
      brandListLabel[brand].count = tempbrandCount;
    } else {
      brandListLabel[brand] = { count: 1 };
    }
  });
  for (const [key, value] of Object.entries(brandListLabel)) {
    brandListArray.push({ key, value });
  }
  for (const [key, value] of Object.entries(typeListLabel)) {
    typeListArray.push({ key, value });
  }
  let returnBrandLabels = brandListArray.sort(
    (a, b) => b.value.count - a.value.count
  );
  let returnTypeLabels = typeListArray.sort(
    (a, b) => b.value.count - a.value.count
  );
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
  console.log(product);
  const { category, ...rest } = product;

  try {
    if (newCategory) {
      const { products, totalProduct } = yield getProducts({
        category: newCategory,
        ...rest,
      });
      yield put(
        getProductsSuccess({ products, category: newCategory, totalProduct })
      );
    } else {
      const { products, totalProduct } = yield getProducts({
        category,
        ...rest,
      });
      yield put(getProductsSuccess({ products, category, totalProduct }));
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

export function* filterProductsByCustomPrice({ payload }) {
  yield put(setCustomPriceSuccess(payload));
}

export function* getProductsByPage({ payload: page }) {
  yield put(setPageSuccess(page));
}

export function* getProductsBySort({ payload: sortBy }) {
  yield put(setSortSuccess(sortBy));
}

export function* getProductsBySearch({ payload: queryString }) {
  yield put(setSearchSuccess(queryString));
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

export function* onSetCustomPrice() {
  yield takeLatest(SET_CUSTOMPRICE_REQUEST, filterProductsByCustomPrice);
  yield takeEvery(SET_CUSTOMPRICE_SUCCESS, getProductsByCategory);
}

export function* onSetPage() {
  yield takeLatest(SET_PAGE_REQUEST, getProductsByPage);
  yield takeEvery(SET_PAGE_SUCCESS, getProductsByCategory);
}

export function* onSetSort() {
  yield takeLatest(SET_SORT_REQUEST, getProductsBySort);
  yield takeEvery(SET_SORT_SUCCESS, getProductsByCategory);
}

export function* onSetSearching() {
  yield takeLatest(SET_SEARCH_REQUEST, getProductsBySearch);
  yield takeEvery(SET_SEARCH_SUCCESS, getProductsByCategory);
}

export function* productSaga() {
  yield all([
    call(onLoadingProducts),
    call(onSetType),
    call(onSetBrand),
    call(onSetRating),
    call(onSetPriceRange),
    call(onSetCustomPrice),
    call(onSetPage),
    call(onSetSort),
    call(onSetSearching),
  ]);
}
