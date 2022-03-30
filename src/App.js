import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Products } from "./container/Products";
import "./App.scss";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
