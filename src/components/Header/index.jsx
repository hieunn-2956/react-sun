import React from "react";
import "./style.scss";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setSearchRequest } from "../../actions";

export default function Header() {
  const dispatch = useDispatch();
  const { queryString } = useSelector((state) => state.product);

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

  const handleSearchingProduct = debounce((value) => {
    dispatch(setSearchRequest(value));
  }, 500);

  return (
    <header>
      <div className='logo-image'>
        <img src='https://kfinancial.com/wp-content/uploads/2019/02/amazon-logo-vector-png-vector-png-free-amazon-logos-705.jpg' />
      </div>
      <h1 className='brand'>Amazing</h1>
      <from className='header-searchbar' type='submit'>
        <input
          placeholder='Search a product'
          onKeyUp={(e) => handleSearchingProduct(e.target.value)}
        />
        <button>
          <BsSearch />
        </button>
      </from>
    </header>
  );
}
