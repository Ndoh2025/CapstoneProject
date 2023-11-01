import React, { useState, useEffect } from "react";
//import { deleteCart, singleCart, getSingleProduct, getAllUsers } from "./api";
//import "./css/UsersCart.css";
import { useNavigate } from "react-router-dom";
// import {
//   getCartFromLocalStorage,
//   saveCartToLocalStorage,
// } from "../Context/Cart";

const getCartFromLocalStorage = () => {
  const cartData = localStorage.getItem("cart");
  return JSON.parse(cartData);
};

export default function UsersCart({ cart, setCart, user }) {
  // const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [username, setUsername] = useState("");
  const [userTotalPrice, setTotalPrice] = useState(0);
  const [deletedCart, setDeletedCart] = useState({});
  const [mySingleCart, setSingleCart] = useState([]);

  //local storage
  // useEffect(() => {
  //   const usernameFromLocalStorage = localStorage.getItem("username");
  //   setUsername(usernameFromLocalStorage);

  //   const cartData = getCartFromLocalStorage("cart");
  //   setCart(cartData);
  // }, []);

  // increase and decrease
  function increaseQuantity() {
    alert("Product Quantity Increased");
  }

  function decreaseQuantity() {
    alert("Product Quantity Decreased");
  }

  //fetch cart
  // useEffect(() => {
  //   const fetchCart = async () => {
  //     try {
  //       const myStoredCartUserId = localStorage.getItem("cartUserId");
  //       const myCart = await singleCart(myStoredCartUserId);
  //       console.log("Cart Data:", myCart);

  //       setCart(myCart);
  //       saveCartToLocalStorage(myCart);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchCart();
  // }, []);

  //all users
  // useEffect(() => {
  //   const fetchAllUsers = async () => {
  //     try {
  //       const allUsers = await getAllUsers();

  //       const loggedInUser = allUsers.find(
  //         (user) => user.username === username,
  //       );

  //       if (loggedInUser) {
  //         localStorage.setItem("cartUserId", loggedInUser.id);
  //         console.log("All Users", allUsers);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
  //   fetchAllUsers();
  // }, [username]);

  //fetch cart products
  // useEffect(() => {
  //   const fetchCartProducts = async () => {
  //     let productList = [];

  //     for (const product of cart.products || []) {
  //       const details = await getSingleProduct(product.productId);
  //       productList.push({ ...details, quantity: product.quantity });
  //     }

  //     setProducts(productList);
  //   };

  //   fetchCartProducts();
  // }, [cart]);

  // //single cart for user
  // useEffect(() => {
  //   const fetchSingleCart = async () => {
  //     try {
  //       const mySingleCart = await singleCart(
  //         localStorage.getItem("cartUserId"),
  //       );
  //       setSingleCart(mySingleCart);
  //     } catch (error) {
  //       console.error("Error", error);
  //     }
  //   };

  //   fetchSingleCart();
  // }, []);

  //total price
  useEffect(() => {
    let totalPrice = 0;

    for (const product of products) {
      totalPrice += product.price * product.quantity;
    }

    setTotalPrice(totalPrice);
  }, [products]);

  //Delete cart
  const handleDeleteCart = async () => {
    try {
      const deletedUsersCart = localStorage.getItem("cartUserId");
      const myDeletedItems = await deleteCart(deletedUsersCart);
      setDeletedCart(myDeletedItems);
      setCart([]);
      setProducts([]);
      setTotalPrice(0);
      alert(`${username}'s cart has been deleted. Add More Items`);

      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //useNavigate
  const navigate = useNavigate();

  function checkout() {
    navigate("/checkout", {
      state: {
        cart: cart,
        products: products,
      },
    });
  }

  function backToProducts() {
    navigate("/main-all-products");
  }
  console.log(user);
  return (
    <>
      <div className="second-cart-container">
        <h6>{`${user}'s Cart`}</h6>

        {products.length === 0 ? (
          <>
            <span style={{ fontSize: "22pt" }}>
              Please Login To See Your Cart
            </span>
            <br />
          </>
        ) : (
          products.map((item, index) => {
            return (
              <div className="usersProducts" key={index}>
                <img
                  src={item.image}
                  className="userProductImage"
                  alt={item.title}
                />
                <span>{item.title}</span>
                <span>${item.price}</span>

                <div className="cart-buttons">
                  <button onClick={decreaseQuantity}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={increaseQuantity}>+</button>
                </div>
                <hr />
              </div>
            );
          })
        )}

        <span className="total-price">Total: ${userTotalPrice.toFixed(2)}</span>
        <button onClick={backToProducts}>Back To Products</button>
        <button onClick={checkout}>Check Out</button>

        <button onClick={handleDeleteCart}>Delete Cart</button>
      </div>
    </>
  );
}
