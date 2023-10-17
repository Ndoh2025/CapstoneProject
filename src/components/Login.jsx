import React, { useState } from "react";

export default function Login() {
  // State variables to hold user input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
