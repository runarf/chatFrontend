import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface MessageContainer {
  id: number;
  date: number;
  message: string;
  author: string;
}

const dateNow = Date.now();
const oneMinute = 60000;

const mockMessages: MessageContainer[] = [
  { author: 'Lana', date: dateNow, id: 0, message: 'Hallo is anyone here?' },
  { author: 'Mark', date: dateNow + oneMinute, id: 1, message: "Yes, I'm here." },
  { author: 'Kim', date: dateNow + 2 * oneMinute, id: 2, message: "I'm also here!" },
  {
    author: 'Lana',
    date: dateNow + 3 * oneMinute,
    id: 3,
    message:
      'Ok I have a question regarding the project we started working on last week. Is there anything I can do to help?',
  },
];

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageContainer[]>([]);

  useEffect(() => {
    const getMessages = () => {
      setMessages(mockMessages);
    };

    getMessages();
  }, []);

  return (
    <div className="App" style={{ width: '300px', margin: '0 auto' }}>
      <div>
        Your name
        <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
      </div>
      <div id="chatWindow">
        <div
          id="messages"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
        >
          {messages.map((messageContainer) => {
            const { id, author, message, date } = messageContainer;
            return (
              <div
                key={id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  alignItems: 'flex-start',
                }}
              >
                <div>{author}</div>
                <div>{message}</div>
                <div>{date}</div>
              </div>
            );
          })}
        </div>
        <div id="newMessage">
          <input type="text" onChange={(e) => setMessage(e.target.value)} value={message} />
          <button
            onClick={() => {
              setMessage('');
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
