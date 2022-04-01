import React, { createContext, useReducer, useState } from "react";
import productsConstant from "./products.constant";
import axiosInstance from "../helper/axios";
import productsReducer, { initialState } from "./products.reducer";

export const ProductContext = createContext({
  initialState,
});

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);
  const {
    category,
    products,
    page,
    limit,
    typeList,
    brandList,
    priceRange,
    rating,
    typeLabels,
    brandLabels,
    priceLabels,
    ratingLabels,
  } = state;

  const getProductsByCategory = async (category) => {
    try {
      const res = await axiosInstance.get(`/products`, {
        params: {
          _page: page,
          _limit: limit,
          categories_like: category,
        },
      });
      const products = res.data;

      dispatch({
        type: productsConstant.GET_PRODUCTS_BY_CATEGORY,
        payload: { products, category },
      });
      const allData = await axiosInstance.get(`/products`, {
        params: {
          categories_like: category,
        },
      });
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
      allData.data.map((data) => {
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
      let returnTypeListLabel = typeListLabel.slice(0, 5);
      let returnBrandListLabel = brandListLabel.slice(0, 5);
      dispatch({
        type: productsConstant.SET_LABELS,
        payload: {
          returnTypeListLabel,
          returnBrandListLabel,
          priceRange,
          ratingList,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getProductsByFilter = async ({ category, typeList, brandList }) => {
    const typeParams = typeList.map((type) => `&type=${type}`).join(",");
    const brandParams = brandList.map((brand) => `&brand=${brand}`).join(",");

    const res = await axiosInstance.get(
      `/products?${typeParams}${brandParams}`,
      {
        params: {
          _page: page,
          _limit: limit,
          categories_like: category,
        },
      }
    );
    const products = res.data;
    dispatch({
      type: productsConstant.GET_PRODUCTS_BY_FILTER,
      payload: products,
    });
  };

  const setTypeCheck = async (typeList) => {
    await dispatch({
      type: productsConstant.SET_TYPECHECK,
      payload: typeList,
    });

    await getProductsByFilter({ category, typeList, brandList });
  };

  const setBrandCheck = async (brandList) => {
    await dispatch({
      type: productsConstant.SET_BRANDCHECK,
      payload: brandList,
    });
    await getProductsByFilter({ category, typeList, brandList });
  };

  const setRating = async (rating) => {
    await dispatch({
      type: productsConstant.SET_RATING,
      payload: rating,
    });
  };

  const setPriceRange = async (priceRange) => {
    await dispatch({
      type: productsConstant.SET_PRICERANGE,
      payload: priceRange,
    });
  };

  return (
    <ProductContext.Provider
      value={{
        category,
        products,
        page,
        limit,
        typeList,
        brandList,
        priceRange,
        rating,
        typeLabels,
        brandLabels,
        priceLabels,
        ratingLabels,
        getProductsByCategory,
        setTypeCheck,
        setBrandCheck,
        setPriceRange,
        setRating,
        getProductsByFilter,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
