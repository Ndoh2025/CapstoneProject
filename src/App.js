import React, { useState } from "react";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import AllProducts from "./components/AllProducts";
import "./App.css";
import Cart from "./components/Cart";
import DropdownMenu from "./components/DropDownMenu";
import Login from "./components/Login";
import Sorting from "./components/Sorting";
import Filter from "./components/Filter";
import Profile from "./components/Profile";
import Checkout from "./components/Checkout";

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
  };

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  //Cart calculations
  const totalValue = cart.reduce((accumulator, item) => {
    return accumulator + item.price;
  }, 0);

  return (
    <>
      <header>
        50% Off Summer Sale Going On Now! + Free shipping for orders over $50!
      </header>

      <h1 id="capstone">Capstone e-Commerce Store</h1>

      {/* Nav Bar */}
      <div className="navbar">
        {/* Drop downmenu for home and login */}
        <DropdownMenu user={user} handleLogout={handleLogout} />
        {/* Cart icon */}
        <Link to="/cart" className="cart-icon">
          <i className="fa fa-shopping-cart" aria-hidden="true"></i>
        </Link>
        {cartVisible && (
          <Cart
            cart={cart}
            handleRemoveFromCart={handleRemoveFromCart}
            totalValue={totalValue}
          />
        )}
      </div>

      {/*Routing paths*/}
      <div id="main-section">
        <Routes>
          <Route
            path="/"
            element={<AllProducts handleAddToCart={handleAddToCart} />}
          />
          <Route
            path="/"
            element={
              <AllProducts handleAddToCart={handleAddToCart} user={user} />
            }
          />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                handleRemoveFromCart={handleRemoveFromCart}
                totalValue={totalValue}
                user={user}
              />
            }
          />
          <Route path="/sorting" element={<Sorting />} />
          <Route path="/filter" element={<Filter />} />
          <Route
            path="/profile"
            element={user ? <Profile user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/checkout"
            element={<Checkout cart={cart} totalValue={totalValue} />}
          />
        </Routes>
      </div>
    </>
  );
}
