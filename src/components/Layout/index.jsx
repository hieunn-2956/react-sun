import React, { useState, useContext } from "react";
import "./style.scss";
import { Container } from "react-bootstrap";
import { ProductContext } from "../../Provider/products.provider";

import Header from "../Header";
import Treeview from "./components/Treeview";
import Rating from "../UI/Rating";

export default function Layout(props) {
  const { typeList, setTypeCheck, rating, priceRange } =
    useContext(ProductContext);
  const { brandList, setBrandCheck, setRating, setPriceRange } =
    useContext(ProductContext);
  const { typeLabels, brandLabels, priceLabels, ratingLabels } =
    useContext(ProductContext);

  const handleFilterByType = (event) => {
    let updatedList = [...typeList];
    const { checked, value } = event.target;
    if (checked) {
      updatedList = [...typeList, value];
    } else {
      updatedList.splice(typeList.indexOf(value), 1);
    }
    setTypeCheck(updatedList);
  };

  const handleFilterByBrand = (event) => {
    let updatedList = [...brandList];
    const { checked, value } = event.target;
    if (checked) {
      updatedList = [...brandList, value];
    } else {
      updatedList.splice(brandList.indexOf(value), 1);
    }
    setBrandCheck(updatedList);
  };

  const renderRefindType = () => {
    return (
      <div className='refineby-type'>
        <h5 onClick={() => console.log(typeList)}>Type</h5>
        {typeLabels.map((type) => (
          <label key={type}>
            <input type='checkbox' value={type} onChange={handleFilterByType} />
            {type}
          </label>
        ))}
      </div>
    );
  };

  const renderBrands = () => {
    return (
      <div className='refineby-brand'>
        <h5>Brand</h5>
        <input placeholder='Search for other' />
        {brandLabels.map((type) => {
          return (
            <label>
              <input
                type='checkbox'
                value={type}
                onChange={handleFilterByBrand}
              />
              {type}
            </label>
          );
        })}
      </div>
    );
  };

  const renderRatings = () => {
    return (
      <div className='refineby-star'>
        <h5>Ratings</h5>
        {Object.entries(ratingLabels)
          .reverse()
          .map((rating) => (
            <div
              className='refineby-star__item'
              onClick={(e) => setRating(rating[0])}
            >
              <Rating count={rating[0]} />{" "}
              <span> &amp; Up {rating[1].count}</span>
            </div>
          ))}
      </div>
    );
  };

  const renderPricesRange = () => {
    return (
      <div className='refineby-price'>
        <h5>Prices</h5>
        {priceLabels.map((type) => {
          return (
            <p onClick={(e) => setPriceRange(type)}>
              <span> &#36; </span> {type}
            </p>
          );
        })}
        <div className='custom-price'>
          <label>
            &#36;
            <input type='text' />
          </label>
          <p>to</p>
          <label>
            &#36;
            <input type='text' />
          </label>
        </div>
      </div>
    );
  };
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container>
          <div className='layout-container'>
            <nav className='sidebar'>
              <div className='sidebar-container'>
                <div className='refineby'>
                  <Treeview />
                  <h4>Refine by</h4>
                  {renderRefindType()}
                  {renderBrands()}
                  {renderRatings()}
                  {renderPricesRange()}
                </div>
              </div>
            </nav>
            <div className='content'>{props.children}</div>
          </div>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
}
