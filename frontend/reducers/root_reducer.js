import { combineReducers } from 'redux';

import SessionsReducer from './sessions_reducer';
import ChannelsReducer from './channel_reducer';

const rootReducer = combineReducers({
  session: SessionsReducer,
  channels: ChannelsReducer
});

export default rootReducer;
