import React, { useState } from 'react';

export const Account = props => {
  const { logout } = props;
  const [showDropdown, toggleDropdown] = useState(false);
  return (
    <div
      className="account"
      onClick={e => {
        e.preventDefault();
        toggleDropdown(!showDropdown);
      }}
    >
      <h5 className="mb-0">Slack</h5>
      <div className="username">{props.currentUser.username}</div>
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
