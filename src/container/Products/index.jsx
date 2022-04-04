import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { ProductContext } from "../../Provider/products.provider";
import PaginationControlled from "../../components/Layout/components/Pagination";
import Product from "./Product";

import "./style.scss";

/**
 * @author
 * @function Products
 **/

export const Products = (props) => {
  const { products, getProductsByCategory, setSortBy } =
    useContext(ProductContext);
  console.log(products);

  useEffect(() => {
    getProductsByCategory("Audio");
  }, []);

  const renderProducts = (list) => {
    return list.map((product) => (
      <Product product={product} key={product.id} />
    ));
  };

  const hanleSortBy = (value) => {
    setSortBy(value);
  };

  return (
    <Layout sidebar>
      <div className='products-container'>
        <div className='products-sort'>
          <label>
            SortBy:
            <select onChange={(e) => hanleSortBy(e.target.value)}>
              <option value=''>Featured</option>
              <option value='asc'>Price asc</option>
              <option value='desc'>Price desc</option>
            </select>
          </label>
        </div>
        <div class='products-pagination'>
          <PaginationControlled />
        </div>

        {products && renderProducts(products)}
      </div>
    </Layout>
  );
};
