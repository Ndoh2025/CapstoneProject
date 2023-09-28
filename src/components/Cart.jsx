import React, { useEffect, useState } from "react";

function Cart({ cartItems, setCartItems }) {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/carts/5');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCart(data);
        setCartItems([...cartItems, ...cart?.products]);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, [cartItems, setCartItems]);

  // Moved addItemToCart inside the Cart component
  function addItemToCart(item) {
    setCartItems([...cartItems, item]);
  }

  // Moved removeItemFromCart inside the Cart component
  function removeItemFromCart(index) {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
  }

  return (
    <div>
      <h1>Cart Component</h1>
      <ul>
        {cart && (
          <li key={cart.id}>
            <h3>Products:</h3>
            <ul>
              {cart.products?.map((product) => (
                <li key={product.productId}>
                  Product ID: {product.productId}, Quantity: {product.quantity}
                </li>
              ))}
            </ul>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Cart;











// import React, { useEffect, useState } from "react";

// function Cart() {
//   const [cart, setCart] = useState(null);

//   useEffect(() => {
//     fetch('https://fakestoreapi.com/carts/5')
//       .then((res) => res.json())
//       .then((data) => setCart(data))
//       .catch((error) => console.error("Error fetching carts:", error));
//       console.log(cart)
//   }, []);

//   return (
//     <div>
//       <h1>Cart Component</h1>
//       <ul>
//         {cart && (        <li key={cart.id}>
//           <h2>Cart #{cart.id}</h2>
//           <p>User ID: {cart.userId}</p>
//           <p>Date: {cart.date}</p>
//           <h3>Products:</h3>
//           <ul>
//             {cart.products.map((product) => (
//               <li key={product.productId}>
//                 Product ID: {product.productId}, Quantity: {product.quantity}
//               </li>
//             ))} 
//           </ul>
//         </li>)}

//       </ul>
//     </div>
//   );
// }



// export default Cart;
