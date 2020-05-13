import { combineReducers } from 'redux';

import SessionsReducer from './sessions_reducer';
import ChannelsReducer from './channel_reducer';
import MessageReducer from './message_reducer';
import UsersReducer from './users_reducer';
import MessageHighlightReducer from './message_highlight_reducer';

const rootReducer = combineReducers({
  session: SessionsReducer,
  channels: ChannelsReducer,
  messages: MessageReducer,
  messageHighlight: MessageHighlightReducer,
  users: UsersReducer,
});

export default rootReducer;
