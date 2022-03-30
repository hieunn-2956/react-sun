import React, { useState } from "react";
import "./style.scss";
import { Container } from "react-bootstrap";
import { BsStar, BsStarFill } from "react-icons/bs";

import Header from "../Header";
import Treeview from "./components/Treeview";

const typeList = [
  "Trend cases",
  "Ult protection case",
  "Ink cartridges",
  "Bussiness cases",
  "Connectivity",
];
const brandList = ["Samsung", "Metra", "HP", "Apple"];
const priceRangeList = [
  "< 1",
  "1 - 80",
  "80 - 160",
  "80 - 160",
  "160 - 240",
  "240 - 1.820",
  "1.820 - 3.400",
  "3.400 - 4.980",
  "> 4.980",
];
const stars = [1, 2, 3, 4];

export default function Layout(props) {
  const renderRefindType = () => {
    return (
      <div className='refineby-type'>
        <h5>Type</h5>
        {typeList.map((type) => (
          <label key={type}>
            <input type='checkbox' />
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
        {brandList.map((type) => {
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

  const renderRatings = () => {
    const renderStar = (count) => (
      <div>
        {[...Array(5)].map((_, index) =>
          index < count ? <BsStarFill /> : <BsStar />
        )}
      </div>
    );
    return (
      <div className='refineby-star'>
        <h5>Ratings</h5>
        {stars.map((star) => {
          return (
            <div className='refineby-star__item'>
              {renderStar(star)} <span> &amp; Up</span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderPricesRange = () => {
    return (
      <div className='refineby-price'>
        <h5>Prices</h5>
        {priceRangeList.map((type) => {
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
