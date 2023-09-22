import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);


  useEffect(() => {
    // Define a function to fetch the product information by id
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  // Render loading state while fetching data
  if (!product) {
    return <div>Loading...</div>;
  }

  // Render product details
  return (
    <div>
      <h2>{product.name}</h2>
      <p>Description: {product.description}</p>
      <p>Price: ${product.price}</p>
      {/* Add more product details here */}
    </div>
  );
};

export default Product;
