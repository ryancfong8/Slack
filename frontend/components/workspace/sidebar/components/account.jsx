import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ClickOutsideWrapper from '../../../util/click_outsider_wrapper';

export const Account = ({ logout, currentUser, currentChannel }) => {
  const [showDropdown, toggleDropdown] = useState(false);
  return (
    <ClickOutsideWrapper
      onClickOutside={(e) => {
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
                <Link className="account-name" to={`/messages/${currentChannel.id}/users/${currentUser.id}`}>
                  <h3>{currentUser.username}</h3>
                </Link>
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
