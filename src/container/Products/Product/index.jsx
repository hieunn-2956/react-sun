import React from "react";
import { BsStarFill, BsStar } from "react-icons/bs";
import "./style.scss";
import Rating from "../../../components/UI/Rating";

export default function Product({ product }) {
  const renderStar = (count) => (
    <div>
      {[...Array(5)].map((_, index) =>
        index < count ? <BsStarFill /> : <BsStar />
      )}
    </div>
  );

  return (
    <div className='product'>
      <img src={product.image} alt='product-image' />
      <h5>{product.name}</h5>
      <div className='product-infor'>
        <Rating count={product.rating} />
        <h6>{product.price} &#36;</h6>
      </div>
    </div>
  );
}
