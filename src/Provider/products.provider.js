import React, { createContext, useReducer, useState } from "react";
import productsConstant from "./products.constant";
import axiosInstance from "../helper/axios";
import productsReducer, { initialState } from "./products.reducer";

export const ProductContext = createContext({
  initialState,
});

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const { products } = state;

  const getProducts = async () => {
    try {
      const res = await axiosInstance(
        `/products?_page=${page}&_limit=${limit}`
      );
      const products = res.data;
      dispatch({
        type: productsConstant.GET_PRODUCTS,
        payload: products,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProductContext.Provider value={{ products, getProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
