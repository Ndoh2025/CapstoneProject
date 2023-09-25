import React, { useEffect, useState } from 'react';

function Cart() {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/carts')
      .then((res) => res.json())
      .then((data) => setCarts(data))
      .catch((error) => console.error('Error fetching carts:', error));
  }, []);

  return (
    <div>
      <h1>Cart Component</h1>
      <ul>
        {carts.map((cart) => (
          <li key={cart.id}>
            <h2>Cart #{cart.id}</h2>
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
        ))}
      </ul>
    </div>
  );
}

export default Cart;

