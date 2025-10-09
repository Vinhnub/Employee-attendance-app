import React, { useEffect, useState } from "react";

export default function Chat() {
  const [socket, setSocket] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5173/ws");

    ws.onopen = () => {
      console.log("✅ Connected to Python WebSocket server");
      ws.send(JSON.stringify({ key: "hello" }));
    };

    ws.onmessage = (event) => {
      console.log("📩 Message from server:", event.data);
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onclose = () => console.log("❌ Disconnected from server");
    ws.onerror = (err) => console.error("⚠️ WebSocket error:", err);

  }, []);

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
