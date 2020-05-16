import React, { useState, useEffect } from 'react';
import { transitions, positions, Provider as AlertProvider, useAlert } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import AccountContainer from './components/account_container';
import ChannelListContainer from './components/channel_list_container';
import DirectListContainer from './components/direct_list_container';

const Sidebar = (props) => {
  const { currentChannel, history, match, receiveHighlightedMessage } = props;
  const options = {
    position: 'top right',
    timeout: 30000,
    offset: '10px',
    transition: transitions.SCALE,
    containerStyle: {
      fontSize: '15px',
    },
  };
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <div className="sidebar">
        <AccountContainer />
        <ChannelListContainer
          currentChannel={currentChannel}
          history={history}
          match={match}
          receiveHighlightedMessage={receiveHighlightedMessage}
        />
        <DirectListContainer
          currentChannel={currentChannel}
          history={history}
          match={match}
          receiveHighlightedMessage={receiveHighlightedMessage}
        />
      </div>
    </AlertProvider>
  );
};

export default Sidebar;
