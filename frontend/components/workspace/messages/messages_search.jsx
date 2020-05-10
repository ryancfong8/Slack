import React, { useState } from 'react';
import Modal from '../../util/modal';
import { searchMessages } from '../../../util/messages_api_util';

const MessagesSearch = (props) => {
  const { currentUser, currentChannel } = props;
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchFunc = async (query) => {
    const results = await searchMessages(query);
    debugger;
    setSearchResults(results);
  };

  return (
    <div className="mr-3">
      <button className="search-input-button" onClick={(e) => setShowSearch(true)}>
        <i className="fas fa-search mr-2"></i>
        Search Messages
      </button>
      {showSearch && (
        <Modal
          body={
            <MessagesSearchResults searchResults={searchResults} searchInput={searchInput} searchFunc={searchFunc} />
          }
          onClose={() => setShowSearch(false)}
          currentUser={currentUser}
          currentChannel={currentChannel}
          header={
            <MessagesSearchHeader
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              setSearchResults={setSearchResults}
            />
          }
        />
      )}
    </div>
  );
};

export default MessagesSearch;

const MessagesSearchHeader = (props) => {
  const { searchInput, setSearchInput, setSearchResults } = props;
  return (
    <div className="d-flex flex-row align-items-center w-100">
      <i className="fas fa-search mr-2"></i>
      <input
        className="search-input flex-1 mr-3"
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          setSearchResults([]);
        }}
        placeholder="Search Messages"
      />
      <a
        className="clear"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setSearchInput('');
        }}
      >
        Clear
      </a>
    </div>
  );
};

const MessagesSearchResults = (props) => {
  const { searchResults, searchInput, searchFunc } = props;
  const [hover, setHover] = useState(false);
  if (!searchResults.length) {
    if (!searchInput) {
      return <div className="d-flex flex-row align-items-center justify-content-center">Search in messages</div>;
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
            {hover && <span> - Search in messages</span>}
          </button>
        </div>
      );
    }
  }
  return (
    <div>
      {searchResults.map((message) => (
        <div>{message.body}</div>
      ))}
    </div>
  );
};
