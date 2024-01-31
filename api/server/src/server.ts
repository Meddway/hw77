import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {addMessage, getMessages, Message} from "./db";
import {upload} from "./multer";




const app = express();
const port = 8000;

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/api/messages', (_req, res) => {
  const messages = getMessages();
  res.json(messages);
});

app.post('/api/messages', upload.single('image'), (req: Request, res: Response) => {
  const { author, message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const newMessage: Message = {
    id: uuidv4(),
    author: author || 'Anonymous',
    message,
    image: req.file ? `/uploads/${req.file.filename}` : null,
  };
  addMessage(newMessage);
  res.status(201).json(newMessage);
});

app.use((err: Error, _req: Request, res: Response) => {
  if (err.message === 'Only images are allowed') {
    return res.status(400).json({ error: 'Only images are allowed' });
  }
  return res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
