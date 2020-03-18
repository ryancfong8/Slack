import React from 'react';
import AccountContainer from './components/account_container';
import ChannelListContainer from './components/channel_list_container';
import DirectListContainer from './components/direct_list_container';

export const Sidebar = props => {
  return (
    <div className="sidebar">
      <AccountContainer />
      <ChannelListContainer />
      <DirectListContainer />
    </div>
  );
};
