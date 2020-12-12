import format from 'date-fns/format';
import { useEffect, useState } from 'react';
import { connect, SavedMessage, sendNewMessage } from './stompClient';

export const baseUrl = `http://localhost:8080`;

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  useEffect(() => {
    fetch(`${baseUrl}/saved-messages`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      });

    connect((newMessage) => setMessages((previousMessages) => [...previousMessages, newMessage]));
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
    </div>
  );
}

export default App;
