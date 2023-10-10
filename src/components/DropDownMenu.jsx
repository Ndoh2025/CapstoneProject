import React from "react";
import { Link } from "react-router-dom";

const DropdownMenu = ({ user, handleLogout }) => {
  return (
    <div className="dropdown">
      <button className="dropbtn">Menu</button>
      <div className="dropdown-content">
        {user && user.token ? (
          // If user is logged in
          <>
            <p>Welcome!</p>

            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>

            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          // If user is not logged in
          <>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;
