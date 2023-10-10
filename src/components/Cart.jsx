import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart({ setCartItems }) {
  const [cart, setCart] = useState(null);
  const [itemQuantities, setItemQuantities] = useState({});

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/carts/5");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCart(data);
        setCartItems([...cartItems, ...cart?.products]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  });

  // const  = ({ cart, handleRemoveFromCart, totalValue, user, updateTotal}) => {
  // Initializing itemQuantities state with beginning cart item quantities

  const calculateTotalValue = () => {
    // Calculate the total value based on the current cart items and quantities
    return cart.reduce(
      (total, item) => total + item.price * (item.quantity || 0),
      0,
    );
  };

  useEffect(() => {
    //object with initial quantities based on the items in the cart
    const initialQuantities = cart.reduce((quantities, item) => {
      quantities[item.id] = 1;
      return quantities;
    }, {});

    setItemQuantities(initialQuantities);
  }, [cart]);

  //Add to cart
  const handleAddToCart = (itemId) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1,
    }));
    updateTotal();
  };
  //Remove from cart
  const handleDecreaseQuantity = (itemId) => {
    if (itemQuantities[itemId] > 0) {
      setItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: prevQuantities[itemId] - 1,
      }));
      updateTotal();
    }
  };

  const calculateItemTotal = (itemId) => {
    const quantity = itemQuantities[itemId] || 0;
    return quantity * cart.find((item) => item.id === itemId)?.price || 0;
  };

  //if user isn't logged in prompt them to login to see their cart
  if (!user) {
    return (
      <div className="cart-container">
        <p>
          Please <Link to="/login"> log in</Link> to view your cart.
        </p>
      </div>
    );
  }

  const cartItems = cart.map((item) => (
    <div key={item.id} className="cart-item">
      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p>${item.price}</p>
        <p>Quantity: {itemQuantities[item.id] || 0}</p>
        <p>Total: ${calculateItemTotal(item.id).toFixed(2)}</p>
        <img src={item.image} width="100" height="200" alt={item.title} />
      </div>
      <div className="quantity-controls">
        <button onClick={() => handleDecreaseQuantity(item.id)}> - </button>
        <button onClick={() => handleAddToCart(item.id)}> + </button>
      </div>
      <button
        onClick={() => handleRemoveFromCart(item.id)}
        className="remove-button"
      >
        Remove
      </button>
    </div>
  ));

  //cart items + total amount
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart-items">{cartItems}</div>
      <p>Total Value: ${calculateTotalValue().toFixed(2)}</p>
      <Link to="/checkout">Checkout</Link>
    </div>
  );
}

export default Cart;
