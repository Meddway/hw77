import { combineReducers } from '@reduxjs/toolkit';
import messagesReducer from './messagesSlice';

const rootReducer = combineReducers({
  messages: messagesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
