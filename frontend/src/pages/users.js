
// Filename - pages/index.js

import React from "react";

const Users = ({ state }) => {
  return (
    <div>
      
      <h2>User Data:</h2>
      <ul>
        {state.userData.map(user => (
          <li key={user.id}>
            <strong>UserID:</strong> {user.id} <br />
            <strong>Name:</strong> {user.first_name} {user.last_name} <br />
            <strong>Email:</strong> {user.email} <br />
            <strong>Created at:</strong> {user.created_at} <br />
            <strong>Updated at:</strong> {user.updated_at} <br />
            <strong>Logged in ever?:</strong> {user.has_logged_in} <br />
            {/* You can render more user properties if needed */}
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default Users;