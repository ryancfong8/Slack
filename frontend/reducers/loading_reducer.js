import { RECEIVE__LOADING_STATE } from '../actions/loading_actions';

const LoadingReducer = (oldState = false, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE__LOADING_STATE:
      return action.loading;
    default:
      return oldState;
  }
};

export default LoadingReducer;
