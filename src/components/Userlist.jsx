import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    email: '',
    username: '',
    password: '',
    name: {
      firstname: '',
      lastname: '',
    },
    address: {
      city: '',
      street: '',
      number: '',
      zipcode: '',
      geolocation: {
        lat: '',
        long: '',
      },
    },
    phone: '',
  });

  useEffect(() => {
    // Fetch users from the API when the component mounts
    fetch('https://fakestoreapi.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // POST request to add a new user
    fetch('https://fakestoreapi.com/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        // Add the new user to the list of users
        setUsers((prevUsers) => [...prevUsers, data]);
        // Reset the form
        setNewUser({
          email: '',
          username: '',
          password: '',
          name: {
            firstname: '',
            lastname: '',
          },
          address: {
            city: '',
            street: '',
            number: '',
            zipcode: '',
            geolocation: {
              lat: '',
              long: '',
            },
          },
          phone: '',
        });
      });
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name.firstname} {user.name.lastname} - {user.email}
          </li>
        ))}
      </ul>
      <h2>Add a New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
          />
        </div>
        {/* Add other input fields for the user properties */}
        <div>
          <button type="submit">Add User</button>
        </div>
      </form>
    </div>
  );
};

export default UserList;
