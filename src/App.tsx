import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface MessageContainer {
  id: number;
  date: string;
  message: string;
  author: string;
}

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageContainer[]>([]);
  return (
    <div className="App">
      <div>
        Your name
        <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
      </div>
      <div id="chatWindow">
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
