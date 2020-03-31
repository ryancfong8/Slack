import React, { useState, useEffect, useRef } from 'react';
import Modal from '../../../util/modal';
import { usePrevious } from '../../../util/utils';
import { searchUsers } from '../../../../util/users_api_util';

export default function ChannelDirect(props) {
  const inputRef = useRef(null);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState([]);
  const prevSelected = usePrevious(selected) || [];
  useEffect(() => {
    async function fetchData() {
      const results = await searchUsers(search, selected);
      setResults(Object.values(results));
      // focus input if user was selected
      if (prevSelected.length !== selected.length) {
        if (prevSelected.length + 1 === selected.length) setSearch('');
        inputRef.current.focus();
      }
    }
    fetchData();
  }, [search, selected]);

  const onChange = e => {
    setSearch(e.target.value);
  };

  const { onClose, history, currentUserId } = props;
  const renderBody = (
    <>
      <div className="d-flex flex-row w-100 mb-3">
        <div className="multi-select-input">
          {selected &&
            selected.length > 0 &&
            selected.map(user => (
              <UserSelectedItem key={user.id} user={user} selected={selected} setSelected={setSelected} />
            ))}
          <input
            ref={inputRef}
            className="channel-direct-input w-100"
            onChange={onChange}
            placeholder={selected.length ? '' : 'Find or start a conversation'}
            value={search}
          />
        </div>
        <button
          type="button"
          className={`btn btn-sm submit-btn btn-primary d-flex flex-row justify-content-center align-items-center ml-3${
            selected && selected.length === 0 ? ' disabled' : ''
          }`}
          disabled={selected && selected.length === 0}
        >
          <span className="font-weight-bold">Go</span>
        </button>
      </div>
      <div className="results-list">
        {results.map(result => (
          <UsersListResultItem
            user={result}
            key={result.id}
            onClose={onClose}
            history={history}
            currentUserId={currentUserId}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
    </>
  );
  return (
    <Modal
      header={<h3 className="create-channel-header">Direct Messages</h3>}
      body={renderBody}
      onClose={onClose}
      modalSize="modal-md modal-dialog-centered"
      className="channel-direct-modal"
    />
  );
}

const UsersListResultItem = props => {
  const { user, currentUserId, selected, setSelected } = props;
  return (
    <div
      className="d-flex flex-row channel-browse-item"
      onClick={e => {
        e.preventDefault();
        setSelected(selected.concat([user]));
      }}
    >
      <h6 className="list-item-name mb-0 mr-2">
        {user.username} {user.id === currentUserId && <span className="subtitle">(you)</span>}
      </h6>
      •<span className="ml-2">{user.name}</span>
    </div>
  );
};

const UserSelectedItem = props => {
  const { user, selected, setSelected } = props;
  return (
    <div className="selected-item d-flex flex-row justify-content-between align-items-center">
      <span className="username mr-3">{user.username}</span>
      <div
        className="delete-selected"
        onClick={e => {
          e.preventDefault();
          setSelected(selected.filter(u => u.id !== user.id));
        }}
      >
        <i className="fa fa-times" aria-hidden="true"></i>
      </div>
    </div>
  );
};
