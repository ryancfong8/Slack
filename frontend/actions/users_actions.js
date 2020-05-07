import * as UserAPIUtil from '../util/users_api_util';
import { receiveCurrentUser } from './sessions_actions';

export const RECEIVE__USERS = 'RECEIVE__USERS';
export const RECEIVE__USER = 'RECEIVE__USER';

const receiveUsers = (users) => ({
  type: RECEIVE__USERS,
  users,
});

const receiveUser = (user) => ({
  type: RECEIVE__USER,
  user,
});

export const getUsers = () => (dispatch) => {
  return UserAPIUtil.getUsers().then((users) => dispatch(receiveUsers(users)));
};

export const getUser = (id) => (dispatch) => {
  return UserAPIUtil.getUser(id).then((user) => dispatch(receiveUser(user)));
};

export const updateUser = (user) => (dispatch) => {
  return UserAPIUtil.updateUser(user).then((user) => {
    dispatch(receiveCurrentUser(user));
    return dispatch(receiveUser(user));
  });
};
