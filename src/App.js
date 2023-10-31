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
import UsersCart from "./components/UsersCart";
import Payment from "./components/Payment";
import Shipping from "./components/Shipping";

export default function App() {
  // it would be a good idea to add your auth token to your state HERE - that way you can pass it as props to all child components
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  // in order to get information for the user, you need to send a GET request - https://fakestoreapi.com/docs#u-single
  // See the ReadME. for notes on how you can retrieve a specific user ID.
  const [user, setUser] = useState(null);
  console.log(cart);
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

      <div className="navbar">
        <DropdownMenu user={user} handleLogout={handleLogout} />
        {/* Cart icon */}
        <Link to="/cart" className="cart-icon">
          <i className="fa fa-shopping-cart" aria-hidden="true"></i>
        </Link>
        <li>
          <Link to="/usersCart">My Cart</Link>
        </li>

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
          <Route
            path="/login"
            element={<Login setUser={setUser} setCart={setCart} cart={cart} />}
          />
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
          <Route path="/usersCart" element={<UsersCart />} />
          <Route
            path="/profile"
            element={user ? <Profile user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/checkout"
            element={<Checkout cart={cart} totalValue={totalValue} />}
          />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </>
  );
}
