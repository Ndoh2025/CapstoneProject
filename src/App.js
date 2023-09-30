import React, { useEffect, useState } from 'react'
import './style/index.css'
import Products from './components/Products'
import Login from './components/Login'
import { Routes, Route} from "react-router-dom";
import Product from './components/Product'
import Cart from './components/Cart'
import Navbar from './components/Navbar'

const App = () => {
  const [cartItems, setCartItems] = useState([]);
      return (
    <>
    <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Products cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path='/products/:id' element={<Product />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
      </Routes>

    </>
  );
}

export default App;

