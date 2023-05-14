import React, { useState } from 'react';
import useWebSocket from '../../shared/hooks/api/useWebSocket';
import styles from './WebSocketSample.module.scss';

const WebSocketSample = () => {
  const {
    messages,
    isConnected,
    connect,
    sendMessage,
    disconnect,
  } = useWebSocket<string>({
    url: 'wss://demo.piesocket.com/v3/channel_1?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self',
  });
  const [newMessage, setNewMessage] = useState('');

  return (
    <>
      <h2>Websocket : useWebSocket</h2>
      <div>{`Is Connected : ${isConnected}`}</div>
      <div className={styles.messagesContainer}>
        {messages.map((message, index) => <div key={`websocket-message-${index}`} className={styles.message}>{message}</div>)}
      </div>
      <input value={newMessage} placeholder='new message' onChange={(event) => setNewMessage(event.target.value)} />
      <button type='button' onClick={() => sendMessage(newMessage)}>Send message</button>
      <button type='button' onClick={() => (isConnected ? disconnect() : connect())}>{`${isConnected ? 'Close' : 'Open'} websocket connexion`}</button>
    </>
  );
};

export default WebSocketSample;
