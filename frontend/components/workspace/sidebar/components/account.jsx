import React, { useState } from 'react';
import ClickOutsideWrapper from '../../../util/click_outsider_wrapper';

export const Account = (props) => {
  const { logout, currentUser } = props;
  const [showDropdown, toggleDropdown] = useState(false);
  return (
    <ClickOutsideWrapper
      onClickOutside={(e) => {
        e.preventDefault();
        toggleDropdown(false);
      }}
    >
      <div
        className="account"
        onClick={(e) => {
          e.preventDefault();
          toggleDropdown(!showDropdown);
        }}
      >
        <h5 className="mb-0 app-name">ChatHero</h5>
        <div className="username">{currentUser.username}</div>
        {showDropdown && (
          <div className="account-dropdown">
            <div className="p-3">
              <div className="d-flex flex-row align-items-center">
                <img className="account-avatar" src={currentUser.avatar_url} />
                <h3>{currentUser.username}</h3>
              </div>
              <div>{currentUser.email}</div>
            </div>
            <a className="header-button dropdown-item" href="#" onClick={logout}>
              Log Out
            </a>
          </div>
        )}
      </div>
    </ClickOutsideWrapper>
  );
};
