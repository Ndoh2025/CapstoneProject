import React from 'react'

export default function ProductDetails({product}) {


  return (
    <div>
     <h2>{product.title}</h2>
            <p>{product.description}</p>
            <img src={product.image} alt={product.title} width="200" />
            <p>Price: ${product.price.toFixed(2)}</p>
  </div>
);
}
