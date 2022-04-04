import React, { useState } from "react";
import "./style.scss";
import { Container } from "react-bootstrap";
import { BsStar, BsStarFill } from "react-icons/bs";
import Rating from "../UI/Rating";

import Header from "../Header";
import Treeview from "./components/Treeview";
import { useSelector, dispatch } from "react-redux";

export default function Layout(props) {
  const { typeLabels, brandLabels, priceLabels, ratingLabels } = useSelector(
    (state) => state.product
  );

  const renderRefindType = (labels) => {
    return (
      <div className='refineby-type'>
        <h5>Type</h5>
        {labels.map((type) => (
          <label key={type}>
            <input type='checkbox' />
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
        <input placeholder='Search for other' />
        {labels.map((type) => {
          return (
            <label>
              <input type='checkbox' />
              {type}
            </label>
          );
        })}
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
            <div className='refineby-star__item'>
              <Rating count={rat[0]} />
              <span>&amp; Up {rat[1].count}</span>
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
            <p>
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
