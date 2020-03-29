import { RECEIVE__USERS } from '../actions/users_actions';

const UsersReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE__USERS:
      return action.users;
    default:
      return oldState;
  }
};

export default UsersReducer;
