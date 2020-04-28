import React from 'react';
import AccountContainer from './components/account_container';
import ChannelListContainer from './components/channel_list_container';
import DirectListContainer from './components/direct_list_container';

export const Sidebar = props => {
  const { currentChannel, history, match } = props;
  return (
    <div className="sidebar">
      <AccountContainer />
      <ChannelListContainer currentChannel={currentChannel} history={history} match={match} />
      <DirectListContainer currentChannel={currentChannel} history={history} match={match} />
    </div>
  );
};
