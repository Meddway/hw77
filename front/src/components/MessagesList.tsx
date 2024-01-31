import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {RootState} from '../store/rootReducer';
import {fetchMessages} from '../store/messagesSlice';

const MessagesList: React.FC = () => {
  const dispatch = useDispatch();

  const messages = useSelector((state: RootState) => state.messages.messages);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  return (
    <div>
      <h2>Messages List</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <strong>{message.author || 'Anonymous'}</strong>: {message.message}
            {message.image && <img src={message.image} alt="Message" />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessagesList;
