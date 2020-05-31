export const RECEIVE__LOADING_STATE = 'RECEIVE__LOADING_STATE';

export const receiveLoadingState = (loading) => ({
  type: RECEIVE__LOADING_STATE,
  loading,
});
