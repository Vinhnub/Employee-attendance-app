import React, { useEffect, useState } from "react";
import { useWebSocket } from "../Service/WebsocketProvicer";

export default function Chat() {
  const { socket, isConnected } = useWebSocket();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ key: input }));
      setInput("");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Raw WebSocket Chat</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
