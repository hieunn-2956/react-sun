import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getProductsRequest } from "../../actions";
import Product from "./Product";

import "./style.scss";

/**
 * @author
 * @function Products
 **/

export const Products = (props) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductsRequest("Appliances"));
  }, []);

  const renderProducts = (list) => {
    return list.map((product) => (
      <Product product={product} key={product.id} />
    ));
  };
  return (
    <Layout sidebar>
      <div className='products-container'>{renderProducts(products)}</div>
    </Layout>
  );
};
