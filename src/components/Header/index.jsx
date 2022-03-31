import React from "react";
import "./style.scss";
import { BsSearch } from "react-icons/bs";

export default function Header() {
  return (
    <header>
      <div className='logo-image'>
        <img src='https://kfinancial.com/wp-content/uploads/2019/02/amazon-logo-vector-png-vector-png-free-amazon-logos-705.jpg' />
      </div>
      <h1 className='brand'>Amazing</h1>
      <form className='header-searchbar' type='submit'>
        <input placeholder='Search a product' />
        <button>
          <BsSearch />
        </button>
      </form>
    </header>
  );
}
