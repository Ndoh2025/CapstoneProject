import React, { useEffect, useState } from 'react'
import './style/index.css'
import Products from './components/Products'
import Login from './components/Login'
import ProductDetails from './components/ProductDetails'
import { Routes, Route} from "react-router-dom";
import Product from './components/Product'
import Cart from './components/Cart'
import UserList from './components/Userlist'

const App = () => {
 
      return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Products />} />
        <Route path='/products/:id' element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/userlist" element={<UserList />} />
      </Routes>
    </>
  );
}

export default App;

