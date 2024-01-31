import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../store/messagesSlice';

const MessagesForm: React.FC = () => {
  const dispatch = useDispatch();
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('author', author);
    formData.append('message', message);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('http://localhost:8000/api/messages', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const newMessage = await response.json();
        dispatch(addMessage(newMessage));
        setAuthor('');
        setMessage('');
        setImage(null);
      } else {
        console.error('Failed to add message:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Author:
          <input type="text" value={author} onChange={handleAuthorChange} />
        </label>
      </div>
      <div>
        <label>
          Message:
          <input type="text" value={message} onChange={handleMessageChange} />
        </label>
      </div>
      <div>
        <label>
          Image:
          <input type="file" onChange={handleImageChange} />
        </label>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default MessagesForm;
