import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { ProductContext } from "../../Provider/products.provider";
import Product from "./Product";

import "./style.scss";

/**
 * @author
 * @function Products
 **/

export const Products = (props) => {
  const { products, getProductsByCategory } = useContext(ProductContext);

  useEffect(() => {
    getProductsByCategory("Audio");
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
