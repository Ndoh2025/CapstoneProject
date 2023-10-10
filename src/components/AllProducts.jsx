import React, { useState, useEffect } from "react";
import Sorting from "./Sorting";
import Filter from "./Filter";

export default function AllProducts({ handleAddToCart, user }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState(null);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  //fetch all products
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

  //function to update filteredProducts
  const updateFilteredProducts = (filtered) => {
    setFilteredProducts(filtered);
  };

  //toggle product description visibility
  const toggleDescription = (productId) => {
    setSelectedDescription(
      selectedDescription === productId ? null : productId,
    );
  };

  //handle add to cart when user is not logged in
  const handleAddToCartClick = (product) => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }
    handleAddToCart(product);
  };

  return (
    <div>
      <div className="container">
        <div className="navbar">
          <Sorting
            products={filteredProducts}
            setProducts={setFilteredProducts}
          />
          <Filter
            products={products}
            setFilteredProducts={updateFilteredProducts}
          />
        </div>

        <div id="all-products-container">
          {filteredProducts.length === 0 ? (
            //zero results from filters
            <p>No matching products found.</p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="product">
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
                  onClick={() => toggleDescription(product.id)}
                >
                  {/*Description button */}
                  {selectedDescription === product.id
                    ? "Hide Description"
                    : "Description"}
                </button>
                {selectedDescription === product.id && (
                  <p className="product-description">{product.description}</p>
                )}{" "}
                {/*Add item to cart*/}
                <button
                  className="add-button"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
