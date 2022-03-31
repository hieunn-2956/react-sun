import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Products } from "./container/Products";
import "./App.scss";
import ProductProvider from "./Provider/products.provider";

function App() {
  return (
    <ProductProvider>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Products />} />
        </Routes>
      </div>
    </ProductProvider>
  );
}

export default App;
