import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getProductsRequest, setSortRequest } from "../../actions";
import Product from "./Product";
import ProductPagination from "./ProductPagination";

import "./style.scss";

/**
 * @author
 * @function Products
 **/

export const Products = (props) => {
  const dispatch = useDispatch();
  const { products, category, totalProduct } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProductsRequest({ newCategory: category }));
  }, []);

  const renderProducts = (list) => {
    return list.map((product) => (
      <Product product={product} key={product.id} />
    ));
  };

  const hanleSortBy = (value) => {
    dispatch(setSortRequest(value));
  };

  return (
    <Layout sidebar>
      <div className='products-infor'>
        <p>{totalProduct} results found</p>
        <label>
          SortBy:
          <select onChange={(e) => hanleSortBy(e.target.value)}>
            <option value=''>Featured</option>
            <option value='asc'>Price asc</option>
            <option value='desc'>Price desc</option>
          </select>
        </label>
      </div>
      <div className='products-pagination'>
        <ProductPagination />
      </div>
      <div className='products-container'>{renderProducts(products)}</div>
    </Layout>
  );
};
