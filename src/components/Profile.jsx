import React from "react";

const Profile = ({ user }) => {
  // Destructure user data
  const { name, email, address, username, number } = user;

  //displaying user data
  return (
    <div>
      <h2>
        {name.firstname} {name.lastname}
      </h2>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Phone: {number}</p>
      {address && (
        <p>
          Address: {address.street}, {address.city}, {address.zipcode}
        </p>
      )}
      <button type="submit">Update</button>
    </div>
  );
};

export default Profile;
