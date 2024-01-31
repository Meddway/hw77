import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store';

interface Message {
  id: string;
  author?: string;
  message: string;
  image?: string | null;
}

interface MessagesState {
  messages: Message[];
}

const initialState: MessagesState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;

export const fetchMessages = (): AppThunk => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:8000/api/messages');
    const data = await response.json();

    dispatch(setMessages(data));
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};

export default messagesSlice.reducer;
