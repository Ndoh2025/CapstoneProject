import React, { useState, useEffect } from "react";

function Cart() {
  // Initialize state to store the list of carts
  const [cart, setCarts] = useState({});

  // Use useEffect to make the API request when the component mounts
  useEffect(() => {
    // Fetch the list of carts from the API
    fetch("https://fakestoreapi.com/carts/user/2")
      .then((res) => res.json())
      .then((json) => setCarts(json[0]))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // The empty dependency array ensures this effect runs only once
console.log(cart)
  return (
    <div>
      <h1>Cart List</h1>
      <ul>
          <li key={cart.id}>
            <h2>Cart ID: {cart.id}</h2>
            <p>User ID: {cart.userId}</p>
            <p>Date: {cart.date}</p>
            <h3>Products:</h3>
            <ul>
               {cart.products.map((product) => (
                <li key={product.productId}>
                  Product ID: {product.productId}, Quantity: {product.quantity}
                </li>
              ))}
            </ul>
          </li>
      </ul>
    </div>
  );
}

export default Cart;
