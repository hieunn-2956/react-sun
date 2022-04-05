import React from "react";
import "./style.scss";
import Rating from "../../../components/UI/Rating";
import Highlighter from "react-highlight-words";
import { useSelector, useDispatch } from "react-redux";

export default function Product({ product }) {
  const { queryString } = useSelector((state) => state.product);
  return (
    <div className='product'>
      <img src={product.image} alt='product-image' />
      <h5>
        <Highlighter
          highlightClassName='product-name'
          searchWords={[queryString]}
          autoEscape={true}
          textToHighlight={product.name}
        />
      </h5>
      <div className='product-infor'>
        <Rating count={product.rating} />
        <h6>{product.price} &#36;</h6>
      </div>
    </div>
  );
}
