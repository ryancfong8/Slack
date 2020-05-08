import React, { useState } from 'react';
import Modal from '../../util/modal';

const MessagesSearch = (props) => {
  const { currentUser, currentChannel } = props;
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="mr-3">
      <button className="search-input-button" onClick={(e) => setShowSearch(true)}>
        <i className="fas fa-search mr-2"></i>
        Search Messages
      </button>
      {showSearch && (
        <Modal
          body={<MessagesSearchResults searchResults={searchResults} />}
          onClose={() => setShowSearch(false)}
          currentUser={currentUser}
          currentChannel={currentChannel}
          header={<MessagesSearchHeader searchInput={searchInput} setSearchInput={setSearchInput} />}
        />
      )}
    </div>
  );
};

export default MessagesSearch;

const MessagesSearchHeader = (props) => {
  const { searchInput, setSearchInput } = props;
  return (
    <div className="d-flex flex-row align-items-center w-100">
      <i className="fas fa-search mr-2"></i>
      <input
        className="search-input flex-1 mr-3"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
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
  const { searchResults } = props;
  if (!searchResults.length)
    return <div className="d-flex flex-row align-items-center justify-content-center">Search Messages</div>;
};
