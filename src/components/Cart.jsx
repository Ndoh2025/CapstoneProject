import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/Cart";

function Cart({}) {
  const [cart, setCart] = useState(null);
  const [itemQuantities, setItemQuantities] = useState({});

  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/carts/5");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
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
    const initialQuantities = cartItems.reduce((quantities, item) => {
      quantities[item.id] = 1;
      return quantities;
    }, {});

    setItemQuantities(initialQuantities);
  }, [cart]);

  //Add to cart
  //Remove from cart
  //cart items + total amount

  return (
    // <div className="cart-container">
    //   <h2>Shopping Cart</h2>
    //   <div className="cart-items">{cartItems}</div>
    //   <p>Total Value: ${calculateTotalValue().toFixed(2)}</p>
    //   <Link to="/checkout">Checkout</Link>
    // </div>
    <div className="flex-col flex items-center bg-white gap-8 p-10 text-black text-sm">
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <div className="flex justify-between items-center" key={item.id}>
            <div className="flex gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="rounded-md h-24"
              />
              <div className="flex flex-col">
                <h1 className="text-lg font-bold">{item.title}</h1>
                <p className="text-gray-600">{item.price}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                onClick={() => {
                  addToCart(item);
                }}
              >
                +
              </button>
              <p>{item.quantity}</p>
              <button
                className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                onClick={() => {
                  removeFromCart(item);
                }}
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>
      {cartItems.length > 0 ? (
        <div className="flex flex-col justify-between items-center">
          <h1 className="text-lg font-bold">Total: ${getCartTotal()}</h1>
          <button
            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={() => {
              clearCart();
            }}
          >
            Clear cart
          </button>
        </div>
      ) : (
        <h1 className="text-lg font-bold">Your cart is empty</h1>
      )}
    </div>
  );
}

export default Cart;
