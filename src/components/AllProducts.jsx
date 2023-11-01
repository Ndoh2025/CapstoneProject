import React, { useState, useEffect } from "react";
import Sorting from "./Sorting";
import Filter from "./Filter";
import Cart from "./Cart";
import { useContext } from "react";
import { CartContext } from "../context/Cart";

export default function AllProducts({ handleAddToCart, user }) {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { cartItems, addToCart } = useContext(CartContext);
  const [selectedDescription, setSelectedDescription] = useState(null);

  const toggle = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Fetch all products
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

  // Function to update filteredProducts
  const updateFilteredProducts = (filtered) => {
    setFilteredProducts(filtered);
  };

  // Toggle product description visibility
  const toggleDescription = (productId) => {
    setSelectedDescription(
      selectedDescription === productId ? null : productId,
    );
  };

  // Handle add to cart when the user is not logged in
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
              src={product.image}
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
            <div id="all-products-container">
              {filteredProducts.length === 0 ? (
                // Zero results from filters
                <p>No matching products found.</p>
              ) : (
                filteredProducts.map((filteredProduct) => (
                  <div key={filteredProduct.title} className="product">
                    <img
                      src={filteredProduct.image}
                      width="250"
                      height="300"
                      alt={filteredProduct.title}
                    />
                    <h3>{filteredProduct.title}</h3>
                    <p>${filteredProduct.price}</p>
                    <button
                      className="description-button"
                      onClick={() => toggleDescription(filteredProduct.title)}
                    >
                      {selectedDescription === filteredProduct.title
                        ? "Hide Description"
                        : "Description"}
                    </button>
                    {selectedDescription === filteredProduct.title && (
                      <p className="product-description">
                        {filteredProduct.description}
                      </p>
                    )}
                    <div className="mt-6 flex justify-between items-center">
                      <button
                        className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover-bg-gray-700 focus:outline-none focus-bg-gray-700"
                        onClick={() => {
                          handleAddToCartClick(filteredProduct);
                        }}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <Cart showModal={showModal} toggle={toggle} />
          </div>
        ))}
      </div>
    </div>
  );
}
