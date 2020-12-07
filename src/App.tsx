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
    <div className="App">
      <div>
        Your name
        <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
      </div>
      <div id="chatWindow" style={{ display: 'flex' }}>
        <div id="messages">
          {messages.map((messageContainer) => {
            const { id, author, message, date } = messageContainer;
            return (
              <div key={id}>
                <div>{author}</div>
                <div>{message}</div>
                <div>{date}</div>
              </div>
            );
          })}
        </div>
        <input type="text" onChange={(e) => setMessage(e.target.value)} value={message} />
        <button
          onClick={() => {
            setMessage('');
          }}
        >
          Send
        </button>
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
