import React, { useContext } from "react";
import "./style.scss";
import { BsSearch } from "react-icons/bs";
import { ProductContext } from "../../Provider/products.provider";

export default function Header() {
  const { setSearching, setPage } = useContext(ProductContext);

  const debounce = (func, wait) => {
    let timeout;
    return function () {
      const context = this,
        args = arguments;

      const executeFunction = function () {
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(executeFunction, wait);
    };
  };

  const handleSearch = debounce((value) => {
    setPage(1);
    setSearching(value);
  }, 500);
  return (
    <header>
      <div className='logo-image'>
        <img src='https://kfinancial.com/wp-content/uploads/2019/02/amazon-logo-vector-png-vector-png-free-amazon-logos-705.jpg' />
      </div>
      <h1 className='brand'>Amazing</h1>
      <form className='header-searchbar' type='submit'>
        <input
          placeholder='Search a product'
          onKeyUp={(e) => handleSearch(e.target.value)}
        />
        <button>
          <BsSearch />
        </button>
      </form>
    </header>
  );
}
