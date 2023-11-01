import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser, setCart, cart }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  console.log(cart);
  const handleLogin = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/users");
      const users = await response.json();

      const user = users.find(
        (u) => u.username === username && u.password === password,
      );
      setUser(user);

      if (user) {
        setCart(user?.cart ? user.cart : []);
        // Redirect the user on successful login
        // we'll just display a success message here.
        alert("Login successful! Redirecting...");
        navigate("/");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("An error occurred while logging in");
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
