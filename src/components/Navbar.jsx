// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom'; 

const Navbar= () => {
  return (
    <div>
      <h1>Welcome to the Capstone eCommerce Store</h1>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
    
      </ul>
    </div>
  );
};

export default Navbar;

