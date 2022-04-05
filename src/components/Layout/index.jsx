import React, { useState } from "react";
import "./style.scss";
import { Container } from "react-bootstrap";
import { BsStar, BsStarFill } from "react-icons/bs";
import Rating from "../UI/Rating";

import Header from "../Header";
import Treeview from "./components/Treeview";
import { useSelector, useDispatch } from "react-redux";
import {
  setTypeCheckRequest,
  setBrandCheck,
  setPriceRangeCheck,
  setRatingCheck,
  setBrandCheckRequest,
  setRatingCheckRequest,
  setPriceRangeCheckRequest,
} from "../../actions";

export default function Layout(props) {
  const dispatch = useDispatch();
  const { typeLabels, brandLabels, priceLabels, ratingLabels } = useSelector(
    (state) => state.product
  );
  const { typeList, brandList, priceRange, rating } = useSelector(
    (state) => state.product
  );
  console.log(typeList, brandList, priceRange, rating);

  const handleFilterByType = (event) => {
    let updatedList = [...typeList];
    const { checked, value } = event.target;
    if (checked) {
      updatedList = [...typeList, value];
    } else {
      updatedList.splice(typeList.indexOf(value), 1);
    }
    dispatch(setTypeCheckRequest(updatedList));
  };

  const handleFilterByBrand = (event) => {
    let updatedList = [...brandList];
    const { checked, value } = event.target;
    if (checked) {
      updatedList = [...brandList, value];
    } else {
      updatedList.splice(brandList.indexOf(value), 1);
    }
    dispatch(setBrandCheckRequest(updatedList));
  };

  const handleFilterRating = (value) => {
    if (value != rating) {
      dispatch(setRatingCheckRequest(value));
    } else {
      dispatch(setRatingCheckRequest(""));
    }
  };

  const handleFilterPriceRange = (value) => {
    if (value != priceRange) {
      dispatch(setPriceRangeCheckRequest(value));
    } else {
      dispatch(setPriceRangeCheckRequest(""));
    }
  };

  const renderRefindType = (labels) => {
    return (
      <div className='refineby-type'>
        <h5>Type</h5>
        {labels.map((type) => (
          <label key={type}>
            <input type='checkbox' value={type} onChange={handleFilterByType} />
            {type}
          </label>
        ))}
      </div>
    );
  };

  const renderBrands = (labels) => {
    return (
      <div className='refineby-brand'>
        <h5>Brand</h5>
        {labels.map((type) => (
          <label key={type}>
            <input
              type='checkbox'
              value={type}
              onChange={handleFilterByBrand}
            />
            {type}
          </label>
        ))}
      </div>
    );
  };

  const renderRatings = (labels) => {
    return (
      <div className='refineby-star'>
        <h5>Ratings</h5>
        {Object.entries(labels)
          .reverse()
          .map((rat) => (
            <div
              className='refineby-star__item'
              onClick={(e) => handleFilterRating(rat[0])}
            >
              <Rating count={rat[0]} />
              <span className={rat[0] == rating ? "active" : null}>
                &amp; Up {rat[1].count}
              </span>
            </div>
          ))}
      </div>
    );
  };

  const renderPricesRange = (labels) => {
    return (
      <div className='refineby-price'>
        <h5>Prices</h5>
        {labels.map((type) => {
          return (
            <p onClick={(e) => handleFilterPriceRange(type)}>
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
                  {renderRefindType(typeLabels)}
                  {renderBrands(brandLabels)}
                  {renderRatings(ratingLabels)}
                  {renderPricesRange(priceLabels)}
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
