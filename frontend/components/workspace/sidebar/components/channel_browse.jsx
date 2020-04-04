import React, { useState, useEffect } from 'react';
import Modal from '../../../util/modal';
import { searchChannels } from '../../../../util/channel_api_util';

export default function ChannelBrowse(props) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const results = await searchChannels({ query: search, is_member: false });
      setResults(Object.values(results));
    }
    fetchData();
  }, [search]);

  const onChange = e => {
    setSearch(e.target.value);
  };

  const { onClose, history } = props;

  const renderBody = (
    <>
      <input
        className="channel-browse-input mb-3 w-100"
        onChange={onChange}
        placeholder="Search for channel name or description"
      />
      <div className="results-list">
        {results.map(result => (
          <ChannelListResultItem channel={result} key={result.id} onClose={onClose} history={history} />
        ))}
      </div>
    </>
  );

  return (
    <Modal
      header={<h3 className="create-channel-header">Find a channel</h3>}
      body={renderBody}
      onClose={onClose}
      modalSize="modal-md modal-dialog-centered"
      className="channel-browse-modal"
    />
  );
}

const ChannelListResultItem = props => {
  const { channel, history, onClose } = props;
  return (
    <div
      className="d-flex flex-column channel-browse-item"
      onClick={e => {
        e.preventDefault();
        history.push(`/messages/${channel.id}`);
        onClose();
      }}
    >
      <h6 className="list-item-name"># {channel.name}</h6>
      <div className="d-flex flex-row subtitle">
        <span className="mr-2">
          {channel.members.length} member{channel.members.length !== 1 ? 's' : ''}
        </span>
        •<span className="ml-2">{channel.description}</span>
      </div>
    </div>
  );
};
