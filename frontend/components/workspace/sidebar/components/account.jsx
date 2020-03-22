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
        <div className="account-dropdown">
          <div className="p-3">
            <h3>{props.currentUser.username}</h3>
            <div>{props.currentUser.email}</div>
          </div>
            <a className="header-button dropdown-item" href="#" onClick={logout}>
              Log Out
          </a>
        </div>
      )}
    </div>
  );
};
