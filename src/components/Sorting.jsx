import React, { useState } from "react";

const Sorting = ({ products, setProducts }) => {
  const [selectedOption, setSelectedOption] = useState(""); // State to track the selected sorting option

  // Function to handle sorting based on the selected option
  const handleSort = (event) => {
    const option = event.target.value;
    setSelectedOption(option);

    // Sort the products based on the selected option
    if (option === "priceLowToHigh") {
      const sorted = [...products].sort((a, b) => a.price - b.price);
      setProducts(sorted);
    } else if (option === "priceHighToLow") {
      const sorted = [...products].sort((a, b) => b.price - a.price);
      setProducts(sorted);
    } else if (option === "nameAZ") {
      const sorted = [...products].sort((a, b) =>
        a.title.localeCompare(b.title),
      );
      setProducts(sorted);
    } else if (option === "nameZA") {
      const sorted = [...products].sort((a, b) =>
        b.title.localeCompare(a.title),
      );
      setProducts(sorted);
    }
  };

  //sorting options displayed
  return (
    <div className="sorting-container">
      <label htmlFor="sortSelect">Sort by:</label>
      <select id="sortSelect" onChange={handleSort} value={selectedOption}>
        <option value="">Select an option</option>
        <option value="priceLowToHigh">Price Low to High</option>
        <option value="priceHighToLow">Price High to Low</option>
        <option value="nameAZ">A to Z</option>
        <option value="nameZA">Z to A</option>
      </select>
    </div>
  );
};

export default Sorting;
