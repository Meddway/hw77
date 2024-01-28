import fs from 'fs';
import path from 'path';

export interface Message {
  id: string;
  author: string;
  message: string;
  image: string | null;
}

const dbPath = path.resolve(__dirname, '../uploads/messages.json');

export const getMessages = (): Message[] => {
  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export const addMessage = (newMessage: Message): void => {
  const messages = getMessages();
  newMessage.id = newMessage.id || Date.now().toString();
  messages.push(newMessage);
  fs.writeFileSync(dbPath, JSON.stringify(messages, null, 2), 'utf-8');
};
