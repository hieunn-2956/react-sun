import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { ProductContext } from "../../Provider/products.provider";
import axiosInstance from "../../helper/axios";
import Product from "./Product";

import "./style.scss";

/**
 * @author
 * @function Products
 **/

export const Products = (props) => {
  const { products, getProducts } = useContext(ProductContext);

  useEffect(() => {
    getProducts();
  }, []);

  const renderProducts = (list) => {
    return list.map((product) => (
      <Product product={product} key={product.id} />
    ));
  };

  return (
    <Layout sidebar>
      <div className='products-container'>
        {products && renderProducts(products)}
      </div>
    </Layout>
  );
};
