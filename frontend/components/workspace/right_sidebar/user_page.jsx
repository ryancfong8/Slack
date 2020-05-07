import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Modal from '../../util/modal';
import UserEditForm from './user_edit_form';

const UserPage = (props) => {
  const { selectedUser, getUser, match, currentUser, updateUser, history, getMessages, currentChannel } = props;
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  useEffect(() => {
    async function fetchData() {
      await getUser(parseInt(match.params.userId));
      setLoading(false);
    }
    fetchData();
  }, [match.params.userId]);
  if (loading) return <div className="d-flex flex-row align-items-center">Loading</div>;
  return (
    <div className="right-sidebar user-page">
      <div className="title d-flex flex-row align-items-center justify-content-between">
        <div className="d-flex flex-column">
          <h6>Profile</h6>
        </div>
        <div
          className="close"
          onClick={(e) => {
            e.preventDefault();
            history.push(`/messages/${match.params.channelId}`);
          }}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </div>
      </div>
      <img className="selected-user-avatar" src={selectedUser.avatar_url} />
      <div className="buttons d-flex flex-row justify-content-center">
        {/* <Link className="btn message-btn d-flex flex-row align-items-center justify-content-center" to="/">
          Message
        </Link> */}
        {selectedUser.id === currentUser.id && (
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              setShowEditModal(true);
            }}
          >
            Edit Profile
          </button>
        )}
      </div>
      <div className="user-info username d-flex flex-row align-items-center">
        <h5 className="mb-0">{selectedUser.name ? selectedUser.name : selectedUser.username}</h5>
        <span className="green ml-2">•</span>
      </div>
      <div className="user-info">
        <div className="subtitle">Display Name</div>
        {selectedUser.username}
      </div>
      <div className="user-info">
        <div className="subtitle">Date Joined</div>
        {moment(selectedUser.created_at).format('LLL')}
      </div>
      {showEditModal && (
        <Modal
          body={
            <UserEditForm
              currentUser={currentUser}
              updateUser={updateUser}
              onClose={() => setShowEditModal(false)}
              getMessages={getMessages}
              currentChannel={currentChannel}
            />
          }
          onClose={() => setShowEditModal(false)}
          modalSize="modal-md modal-dialog-centered"
          header={<div className="user-form-header">Edit your profile</div>}
        />
      )}
    </div>
  );
};

export default UserPage;
