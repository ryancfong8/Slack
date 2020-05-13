import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import Modal from '../../util/modal';
import { searchMessages } from '../../../util/messages_api_util';
import { getChannelName } from '../../util/utils';
import messages_container from './messages_container';

const MessagesSearch = (props) => {
  const { currentUser, currentChannel, history, receiveHighlightedMessage } = props;
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [aggs, setAggs] = useState(null);

  const searchFunc = async (query) => {
    const results = await searchMessages(query);
    const aggs = { ...results.aggregations };
    delete results.aggregations;
    if (!Object.values(results).length) {
      setSearchResults([{ error: 'No Results!' }]);
    } else {
      setSearchResults(Object.values(results));
      setAggs(aggs);
    }
  };

  const onClose = () => {
    setShowSearch(false);
  };

  return (
    <div className="search-feature mr-3">
      <button className="search-input-button" onClick={() => setShowSearch(true)}>
        <i className="fas fa-search mr-2"></i>
        Search Messages
      </button>
      {showSearch && (
        <Modal
          body={
            <MessagesSearchResults
              searchResults={searchResults}
              searchInput={searchInput}
              searchFunc={searchFunc}
              currentUser={currentUser}
              history={history}
              onClose={onClose}
              receiveHighlightedMessage={receiveHighlightedMessage}
              aggs={aggs}
            />
          }
          onClose={onClose}
          currentUser={currentUser}
          currentChannel={currentChannel}
          header={
            <MessagesSearchHeader
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              setSearchResults={setSearchResults}
              setAggs={setAggs}
              searchFunc={searchFunc}
            />
          }
        />
      )}
    </div>
  );
};

export default MessagesSearch;

const MessagesSearchHeader = (props) => {
  const { searchInput, setSearchInput, setSearchResults, searchFunc, setAggs } = props;
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div className="d-flex flex-row align-items-center w-100">
      <i className="fas fa-search mr-2"></i>
      <input
        className="search-input flex-1 mr-3"
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          setSearchResults([]);
          setAggs(null);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            searchFunc(searchInput);
          }
        }}
        placeholder="Search in Messages"
        ref={inputRef}
      />
      <a
        className="clear"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setSearchInput('');
          setSearchResults([]);
        }}
      >
        Clear
      </a>
    </div>
  );
};

const MessagesSearchResults = (props) => {
  const {
    searchResults,
    searchInput,
    searchFunc,
    currentUser,
    history,
    onClose,
    receiveHighlightedMessage,
    aggs,
  } = props;
  const [hover, setHover] = useState(false);
  const [filterUsers, setFilterUsers] = useState({});
  const [filterChannels, setFilterChannels] = useState({});

  if (!searchResults.length) {
    if (!searchInput) {
      return (
        <div className="d-flex flex-row align-items-center justify-content-center blank-input">Search in messages</div>
      );
    } else {
      return (
        <div className="search-query-dropdown w-100">
          <button
            className="search-button d-flex flex-row align-items-center w-100"
            onClick={(e) => {
              e.preventDefault();
              searchFunc(searchInput);
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <i className="fas fa-search mr-2"></i>
            <span className="search-query">{searchInput}</span>
            {hover && <span>{` - Search in messages`}</span>}
          </button>
        </div>
      );
    }
  } else if (searchResults.length === 1 && searchResults[0].error) {
    return (
      <div className="d-flex flex-row align-items-center justify-content-center blank-input text-danger">
        {searchResults[0].error}
      </div>
    );
  }

  let results = searchResults;
  if (Object.keys(filterUsers).length) {
    results = results.filter((res) => filterUsers[res.user_id]);
  }
  if (Object.keys(filterChannels).length) {
    results = results.filter((res) => filterChannels[res.channel_id]);
  }

  const onUserChange = (id) => {
    return (e) => {
      const newUsers = { ...filterUsers };
      if (e.target.checked) {
        newUsers[id] = true;
      } else {
        delete newUsers[id];
      }
      setFilterUsers(newUsers);
    };
  };

  const onChannelChange = (id) => {
    return (e) => {
      const newChannels = { ...filterChannels };
      if (e.target.checked) {
        newChannels[id] = true;
      } else {
        delete newChannels[id];
      }
      setFilterChannels(newChannels);
    };
  };

  return (
    <div className="d-flex flex-row">
      <div className="col col-8">
        <div className="column-header">Messages</div>
        {results.map((message) => {
          const channel = message.channel;
          return (
            <button
              key={message.id}
              type="button"
              className="search-result messages-list-component d-flex flex-column align-items-start"
              onClick={(e) => {
                e.preventDefault();
                receiveHighlightedMessage(message.id);
                if (window.location.href.indexOf(`messages/${message.channel_id}`) === -1) {
                  history.push(`/messages/${message.channel_id}`);
                }
                onClose();
              }}
            >
              <div className="channel-date subtitle">
                <span className="channel-name">
                  {channel.channel_type === 'direct' ? (
                    <span className="green mr-1">•</span>
                  ) : channel.channel_private ? (
                    <i className="fas fa-lock mr-1"></i>
                  ) : (
                    <i className="fas fa-hashtag mr-1"></i>
                  )}
                  {getChannelName(channel, currentUser.id)}
                </span>
                {`  -  ${moment(message.created_at).format('MMM Do')}`}
              </div>
              <div className="d-flex flex-row">
                <img className="message-avatar" src={message.user.avatar_url} />
                <div className="d-flex flex-column flex-1">
                  <div className="d-flex flex-row align-items-end mb-1">
                    <span className="mr-2 username">{message.user.username}</span>
                    <div className="time">{moment(message.created_at).format('LT')}</div>
                  </div>
                  <div
                    className="result-text"
                    dangerouslySetInnerHTML={{ __html: message.body_highlight || message.body }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {aggs && (
        <div className="aggs col col-4">
          <div className="column-header">Filter By</div>
          <div className="filter-block">
            <div className="filter-title">Shared By</div>
            {aggs.filter_users.buckets.map((bucket) => {
              const user = searchResults.find((m) => m.user.id == bucket.key).user;
              return (
                <label className="d-flex flex-row align-items-center" key={bucket.key}>
                  <input type="checkbox" className="mr-1" onChange={onUserChange(parseInt(bucket.key))} />
                  <img className="filter-avatar ml-1 mr-1" src={user.avatar_url} />
                  <span>{user.username}</span>
                </label>
              );
            })}
          </div>
          <div className="filter-block">
            <div className="filter-title">Shared In</div>
            {aggs.filter_channels.buckets.map((bucket) => {
              const message = searchResults.find((m) => m.channel_id == bucket.key);
              const channel = message.channel;
              return (
                <label className="d-flex flex-row align-items-center" key={bucket.key}>
                  <input type="checkbox" className="mr-2" onChange={onChannelChange(parseInt(bucket.key))} />
                  <span>
                    {channel.channel_type === 'direct' ? (
                      <span className="green mr-1">•</span>
                    ) : channel.channel_private ? (
                      <i className="fas fa-lock mr-1"></i>
                    ) : (
                      <i className="fas fa-hashtag mr-1"></i>
                    )}
                    {getChannelName(channel, currentUser.id)}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
