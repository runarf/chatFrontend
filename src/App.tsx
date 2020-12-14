import { FC, useEffect, useState } from 'react';
import { subscribeToNewMessages, SavedMessage, sendNewMessage } from './stompClient';
import format from 'date-fns/format';

export const baseUrl = `http://localhost:8080`;

function App() {
  const [author, setAuthor] = useState('');

  return (
    <div>
      <div style={{ width: '300px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>Your name:</div>
          <input type="text" onChange={(event) => setAuthor(event.target.value)} value={author} />
        </div>
        <div>
          <SavedMessages />
          <NewMessage author={author} />
        </div>
      </div>
    </div>
  );
}

export default App;

const SavedMessages = () => {
  const [savedMessages, setSavedMessages] = useState<SavedMessage[]>([]);

  useEffect(() => {
    fetch(`${baseUrl}/saved-messages`)
      .then((response) => response.json())
      .then((data) => {
        setSavedMessages(data);
      });

    subscribeToNewMessages((newMessage) => {
      setSavedMessages((previouslySavedMessages) => [...previouslySavedMessages, newMessage]);
    });
  }, []);

  return (
    <div
      id="messages"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
    >
      {savedMessages.map((savedMessage) => {
        const { id, author, message, timestamp } = savedMessage;
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
  );
};

const NewMessage: FC<{ author: string }> = ({ author }) => {
  const [newMessage, setNewMessage] = useState('');

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <textarea
        style={{ flexGrow: 2 }}
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <button
        onClick={() => {
          sendNewMessage(author, newMessage);
          setNewMessage('');
        }}
      >
        Send
      </button>
    </div>
  );
};
