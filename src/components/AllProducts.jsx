import React, { useState, useEffect } from "react";
import Sorting from "./Sorting";
import Filter from "./Filter";
import Cart from "./Cart";
import { useContext } from "react"; // Removed duplicate import for useEffect
import { CartContext } from "../context/Cart";

export default function AllProducts({ handleAddToCart, user }) {
  const [showModal, setShowModal] = useState(false); // Changed setshowModal to setShowModal
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { cartItems, addToCart } = useContext(CartContext);
  const [selectedDescription, setSelectedDescription] = useState(null);

  const toggle = () => {
    setShowModal(!showModal); // Changed setshowModal to setShowModal
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // fetch all products
  const fetchAllProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const result = await response.json();
      setProducts(result);
      setFilteredProducts(result);
    } catch (err) {
      console.error(err);
    }
  };

  // function to update filteredProducts
  const updateFilteredProducts = (filtered) => {
    setFilteredProducts(filtered);
  };

  // toggle product description visibility
  const toggleDescription = (productId) => {
    setSelectedDescription(
      selectedDescription === productId ? null : productId,
    );
  };

  // handle add to cart when the user is not logged in
  const handleAddToCartClick = (product) => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }
    handleAddToCart(product);
  };

  return (
    <div className="flex flex-col justify-center bg-gray-100">
      <div className="flex justify-between items-center px-20 py-5">
        <h1 className="text-2xl uppercase font-bold mt-10 text-center mb-10">
          Shop
        </h1>
        {!showModal && (
          <button
            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={toggle}
          >
            Cart ({cartItems.length})
          </button>
        )}
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg px-10 py-10"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="rounded-md h-48"
            />
            <div className="mt-4">
              <h1 className="text-lg uppercase font-bold">{product.title}</h1>
              <p className="mt-2 text-gray-600 text-sm">
                {product.description.slice(0, 40)}...
              </p>
              <p className="mt-2 text-gray-600">${product.price}</p>
              <button
                onClick={() => {
                  addToCart(product);
                }}
              >
                add to cart
              </button>
            </div>
            {/* <div id="all-products-container"> */}
            {/* {filteredProducts.length === 0 ? (
          //zero results from filters
          <p>No matching products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.title} className="product">
              <img
                src={product.image}
                width="250"
                height="300"
                alt={product.title}
              />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <button
                className="description-button"
                onClick={() => toggleDescription(product.title)}
              >
                {selectedDescription === product.title
                  ? "Hide Description"
                  : "Description"}
              </button>
              {selectedDescription === product.title && (
                <p className="product-description">{product.description}</p>
              )} */}
            {/* <div className='mt-6 flex justify-between items-center'>
                <button
                  className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover-bg-gray-700 focus:outline-none focus-bg-gray-700'
                  onClick={() => {
                    handleAddToCartClick(product); // Moved inside the loop
                  }}
                >Add to cart</button>
              </div>
            </div>
          ))
        } */}
            {/* </div> */}
            <Cart showModal={showModal} toggle={toggle} />
          </div>
        ))}
      </div>
    </div>
  );
}
