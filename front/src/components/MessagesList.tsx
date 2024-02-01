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

  const messageStyle = {
    margin: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
  };

  const imageStyle = {
    width: '100px',
    height: '100px',
    marginLeft: '10px',
    borderRadius: '5px',
  };

  return (
    <div>
      <h2>Messages List</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id} style={messageStyle}>
            <strong>{message.author || 'Anonymous'}</strong>: {message.message}
            {message.image && (
              <img
                key={message.id}
                src={`http://localhost:8000${message.image}`}
                alt={`Message ${message.id}`}
                style={imageStyle}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessagesList;
