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
    queryString,
    products,
    totalProduct,
    page,
    sortBy,
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

  const getProductsByFilter = async ({
    category,
    typeList,
    brandList,
    rating,
    priceRange,
    sortBy,
    queryString,
    page,
  }) => {
    const typeParams = typeList.map((type) => `&type=${type}`).join("");
    const brandParams = brandList.map((brand) => `&brand=${brand}`).join("");
    const response = await axiosInstance.get(
      `/products?${typeParams}${brandParams}`,
      {
        params: {
          _page: page,
          _limit: limit,
          categories_like: category,
          ...(rating && { rating }),
          ...(priceRange && { price_range: priceRange }),
          ...(sortBy && { _sort: "price" }),
          ...(sortBy && { _order: sortBy }),
          ...(queryString && { name_like: queryString }),
        },
      }
    );
    const products = response.data;
    const totalProduct = response.headers["x-total-count"];
    dispatch({
      type: productsConstant.GET_PRODUCTS_BY_FILTER,
      payload: { products, totalProduct },
    });
  };

  const getProductsByCategory = async (newCategory) => {
    try {
      const res = await axiosInstance.get(`/products`, {
        params: {
          _page: page,
          _limit: limit,
          categories_like: newCategory,
        },
      });
      const products = res.data;
      const totalProduct = res.headers["x-total-count"];

      await dispatch({
        type: productsConstant.GET_PRODUCTS_BY_CATEGORY,
        payload: { products, category: newCategory, totalProduct },
      });

      const allData = await axiosInstance.get(`/products`, {
        params: {
          categories_like: newCategory,
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
      await dispatch({
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

  const setTypeCheck = async (typeList) => {
    await dispatch({
      type: productsConstant.SET_TYPECHECK,
      payload: typeList,
    });

    await getProductsByFilter({
      category,
      typeList,
      brandList,
      priceRange,
      rating,
      sortBy,
      queryString,
    });
  };

  const setBrandCheck = async (brandList) => {
    await dispatch({
      type: productsConstant.SET_BRANDCHECK,
      payload: brandList,
    });
    await getProductsByFilter({
      category,
      typeList,
      brandList,
      priceRange,
      rating,
      sortBy,
      queryString,
    });
  };

  const setRating = async (rating) => {
    await dispatch({
      type: productsConstant.SET_RATING,
      payload: rating,
    });
    await getProductsByFilter({
      category,
      typeList,
      brandList,
      priceRange,
      rating,
      sortBy,
      queryString,
    });
  };

  const setPriceRange = async (priceRange) => {
    await dispatch({
      type: productsConstant.SET_PRICERANGE,
      payload: priceRange,
    });
    await getProductsByFilter({
      category,
      typeList,
      brandList,
      priceRange,
      rating,
      sortBy,
      queryString,
    });
  };

  const setPage = async (pageClick) => {
    await dispatch({
      type: productsConstant.SET_PAGE,
      payload: { page: pageClick },
    });
    await getProductsByFilter({
      category,
      typeList,
      brandList,
      priceRange,
      page: pageClick,
      rating,
      sortBy,
      queryString,
    });
  };

  const setSortBy = async (sortBy) => {
    await dispatch({
      type: productsConstant.SET_SORTBY,
      payload: sortBy,
    });
    await getProductsByFilter({
      category,
      typeList,
      brandList,
      priceRange,
      rating,
      sortBy,
      queryString,
    });
  };

  const setSearching = async (queryString) => {
    await dispatch({
      type: productsConstant.SET_SEARCHING,
      payload: queryString,
    });
    await getProductsByFilter({
      category,
      typeList,
      brandList,
      priceRange,
      rating,
      sortBy,
      queryString,
    });
  };

  return (
    <ProductContext.Provider
      value={{
        category,
        products,
        totalProduct,
        page,
        limit,
        sortBy,
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
        setPage,
        setSortBy,
        setSearching,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
