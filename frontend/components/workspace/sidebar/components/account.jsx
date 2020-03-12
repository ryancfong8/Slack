import React, { useState } from 'react';

export const Account = props => {
  const { logout } = props;
  const [showDropdown, toggleDropdown] = useState(false);
  return (
    <div
      onClick={e => {
        e.preventDefault();
        toggleDropdown(!showDropdown);
      }}
    >
      <h1>CleanChat</h1>
      <div>{props.currentUser.username}</div>
      {showDropdown && (
        <div>
          <h3>{props.currentUser.username}</h3>
          <div>{props.currentUser.email}</div>
          <button className="header-button" onClick={logout}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};
