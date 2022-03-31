import productsConstant from "./products.constant";

export const initialState = {
  category: "",
  products: [],
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
};

const productsReducer = (state, action) => {
  switch (action.type) {
    case productsConstant.GET_PRODUCTS:
      return { ...state, products: action.payload };
    case productsConstant.GET_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        products: action.payload.products,
        category: action.payload.category,
      };
    case productsConstant.GET_PRODUCTS_BY_FILTER:
      return {
        ...state,
        products: action.payload,
      };

    case productsConstant.SET_TYPECHECK:
      return { ...state, typeList: action.payload };
    case productsConstant.SET_BRANDCHECK:
      return { ...state, brandList: action.payload };
    case productsConstant.SET_PRICERANGE:
      return { ...state, priceRange: action.payload };
    case productsConstant.SET_RATING:
      return { ...state, rating: action.payload };

    case productsConstant.SET_LABELS:
      return {
        ...state,
        typeLabels: action.payload.returnTypeListLabel,
        brandLabels: action.payload.returnBrandListLabel,
        priceLabels: action.payload.priceRange,
        ratingLabels: action.payload.ratingList,
      };
    default:
      return state;
  }
};

export default productsReducer;
