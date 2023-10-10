import React, { useState } from "react";

export default function Filter({ products, setFilteredProducts }) {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");

  const handleFilter = () => {
    // Filtering logic based on user selections
    const filteredProducts = products.filter((product) => {
      const categoryPass =
        !categoryFilter || product.category === categoryFilter;
      const minPricePass =
        !minPriceFilter || product.price >= parseFloat(minPriceFilter);
      const maxPricePass =
        !maxPriceFilter || product.price <= parseFloat(maxPriceFilter);

      return categoryPass && minPricePass && maxPricePass;
    });

    setFilteredProducts(filteredProducts);
  };

  return (
    <div className="filter-container">
      {/* Category selection */}
      <label>
        Category:
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelry</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
      </label>

      {/* Minimum price selection*/}
      <label>
        Min Price:
        <select
          value={minPriceFilter}
          onChange={(e) => setMinPriceFilter(e.target.value)}
        >
          <option value="">Any</option>
          <option value="10">$5</option>
          <option value="20">$10</option>
          <option value="30">$20</option>
          <option value="30">$30</option>
        </select>
      </label>

      {/* Maximum price selection */}
      <label>
        Max Price:
        <select
          value={maxPriceFilter}
          onChange={(e) => setMaxPriceFilter(e.target.value)}
        >
          <option value="">Any</option>
          <option value="25">$25</option>
          <option value="50">$50</option>
          <option value="100">$100</option>
          <option value="150">$150</option>
        </select>
      </label>

      <button onClick={handleFilter}>Apply Filters</button>
    </div>
  );
}
