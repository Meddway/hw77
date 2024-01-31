import React from 'react';
import MessageList from './components/MessagesList';
import MessageForm from './components/MessagesForm';

const App: React.FC = () => {
  return (
    <div>
      <h3>Anonymous Image Board</h3>
      <MessageList />
      <MessageForm />
    </div>
  );
};

export default App;
