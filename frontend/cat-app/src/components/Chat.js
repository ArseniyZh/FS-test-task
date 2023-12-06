import React, { useState, useEffect } from 'react';
import { userInfoRequest } from '../requests/main';

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [userName, setUserName] = useState('Гость');

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8000/ws/chat/');

    newSocket.onopen = async () => {
      console.log('WebSocket connection opened');

      try {
        let response = await userInfoRequest();
        if (response.status === 200) {
          let data = await response.json();
          setUserName(data.username);
        }
      } catch {
        console.log("ошибка")
      }
    };

    newSocket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setChatHistory((prevHistory) => [...prevHistory, receivedMessage.message]);
    };

    newSocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [userName]);

  const sendMessage = () => {
    if (socket && message.trim() !== '') {
      const messageObject = {
        message: `${userName}: ${message.trim()}`,
        group_name: 'main',
      };
      socket.send(JSON.stringify(messageObject));
      setMessage('');
    }
  };

  return (
    <div>
      <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
        {chatHistory.map((chatMessage, index) => (
          <div key={index}>{chatMessage}</div>
        ))}
      </div>
      <div style={{ display: 'flex' }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ flex: '1', marginRight: '10px', padding: '5px' }}
        />
        <button
          style={{ background: '#3498db', color: '#fff', border: 'none', padding: '8px 15px', cursor: 'pointer' }}
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
