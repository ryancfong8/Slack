import { RECEIVE__USERS, RECEIVE__USER } from '../actions/users_actions';

const UsersReducer = (oldState = { users: [], selectedUser: null }, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE__USERS:
      return Object.assign({}, oldState, { users: action.users });
    case RECEIVE__USER:
      return Object.assign({}, oldState, { selectedUser: action.user });
    default:
      return oldState;
  }
};

export default UsersReducer;
