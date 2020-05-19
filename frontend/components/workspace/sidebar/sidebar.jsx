import React, { useState, useEffect } from 'react';
import AccountContainer from './components/account_container';
import ChannelListContainer from './components/channel_list_container';
import DirectListContainer from './components/direct_list_container';

const Sidebar = (props) => {
  const { currentChannel, history, match, receiveHighlightedMessage, className, toggleMobileSidebar } = props;
  return (
    <div className={`sidebar ${className}`}>
      <AccountContainer />
      <ChannelListContainer
        currentChannel={currentChannel}
        history={history}
        match={match}
        receiveHighlightedMessage={receiveHighlightedMessage}
        toggleMobileSidebar={toggleMobileSidebar}
      />
      <DirectListContainer
        currentChannel={currentChannel}
        history={history}
        match={match}
        receiveHighlightedMessage={receiveHighlightedMessage}
        toggleMobileSidebar={toggleMobileSidebar}
      />
    </div>
  );
};

export default Sidebar;
