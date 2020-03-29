import * as UserAPIUtil from '../util/users_api_util';

export const RECEIVE__USERS = 'RECEIVE__USERS';

const receiveUsers = users => ({
  type: RECEIVE__USERS,
  users
});

export const getUsers = () => dispatch => {
  return UserAPIUtil.getUsers().then(users => dispatch(receiveUsers(users)));
};
