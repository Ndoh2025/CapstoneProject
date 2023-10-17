import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cart, setCart] = useState(null);

<<<<<<< HEAD
  const handleLogin = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/users");
      const users = await response.json();

      const user = users.find(
        (u) => u.username === username && u.password === password,
      );

      if (user) {
        setCart(user.cart);
        // Redirect the user on successful login
        // we'll just display a success message here.
        alert("Login successful! Redirecting...");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("An error occurred while logging in");
=======
  // Function to handle form submission
  // this will need to be an async function now
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform authentication here (you would typically send a request to a server)
    // For this example, let's assume successful login if username and password are both "admin"

    // https://fakestoreapi.com/docs#auth => this shows you how to send a request to successfully log a user in
    // because this is a "fake" api, you must use an existing user's credentials: https://fakestoreapi.com/docs#u-all
    if (username === "admin" && password === "admin") {
      // use fetch - you need to make a POST request with the username and password in the body 
      alert("Login successful!");
      // await the response - if successful, it will be a token (random string of numbers and letters). 
      // you can store the token - in state as well as localStorage
    } else {
      // if not successful, you can use something like this alert to inform the user. 
      alert("Login failed. Please check your username and password.");
>>>>>>> 4cde0663519b635ff094b1258e631993eee6f23a
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      {cart && (
        <div>
          <h3>Your Cart</h3>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Login;
