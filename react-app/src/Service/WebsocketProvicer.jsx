import React, { createContext, useContext, useEffect, useRef, useState, useMemo } from "react";

const WebSocketContext = createContext(null);

export const useWebSocket = () => useContext(WebSocketContext);

export function WebSocketProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState(null); // 👈 track socket state
  const ws = useRef(null);

  useEffect(() => {
    const socketInstance = new WebSocket(`ws://${IP_NETWORK}:${PORT}`);
    ws.current = socketInstance;

    socketInstance.onopen = () => {
      console.log("✅ WebSocket connected");
      setSocket(socketInstance);  // 👈 update state
      setIsConnected(true);
    };

    socketInstance.onclose = () => {
      console.log("❌ WebSocket disconnected");
      setIsConnected(false);
    };

    socketInstance.onerror = (err) => {
      console.error("⚠️ WebSocket error:", err);
    };

    return () => {
      socketInstance.close();
    };
  }, []);

  // 👇 this ensures components see updated socket after connection
  const contextValue = useMemo(() => ({ socket, isConnected }), [socket, isConnected]);

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
}
