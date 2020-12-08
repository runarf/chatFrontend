import format from 'date-fns/format';
import { disconnect } from 'process';
import React, { useEffect, useState } from 'react';
import { StompApp } from './StompApp';
import { connect, SavedMessage, sendNewMessage } from './stompClient';

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  useEffect(() => {
    connect(setMessages);

    return () => disconnect();
  }, []);

  return (
    <div>
      <div className="App" style={{ width: '300px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>Your name:</div>
          <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
        </div>
        <div id="chatWindow">
          <div
            id="messages"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          >
            {messages.map((messageContainer) => {
              const { id, author, message, timestamp } = messageContainer;
              const formattedDate = format(timestamp, 'd MMM yyyy H:mm');
              return (
                <div
                  key={id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    alignItems: 'flex-start',
                    margin: '10px 0px',
                  }}
                >
                  <small>{author}</small>
                  <div>{message}</div>
                  <small>{formattedDate}</small>
                </div>
              );
            })}
          </div>
          <div id="newMessage" style={{ display: 'flex', width: '100%' }}>
            <textarea
              style={{ flexGrow: 2 }}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <button
              onClick={() => {
                sendNewMessage(name, message);
                setMessage('');
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <StompApp />
    </div>
  );
}

export default App;
