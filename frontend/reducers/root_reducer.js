import { combineReducers } from 'redux';

import SessionsReducer from './sessions_reducer';
import ChannelsReducer from './channel_reducer';
import MessageReducer from './message_reducer';

const rootReducer = combineReducers({
  session: SessionsReducer,
  channels: ChannelsReducer,
  message: MessageReducer
});

export default rootReducer;
