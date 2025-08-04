import { useEffect, useRef, useCallback } from "react";

export function useWebSocket(url, onMessage) {
  const socketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectDelay = 1000; // Start with 1 second
  const initialDelay = 500; // Small delay before first connection attempt

  const connect = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    console.log(`Attempting to connect to WebSocket: ${url}`);
    
    try {
      const socket = new WebSocket(url);
      socketRef.current = socket;

      socket.onopen = () => {
        console.log("WebSocket connected successfully:", url);
        reconnectAttemptsRef.current = 0; // Reset reconnect attempts on successful connection
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("WebSocket message received:", data);
          onMessage?.(data);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        console.error("WebSocket URL:", url);
        console.error("WebSocket readyState:", socket.readyState);
      };

      socket.onclose = (event) => {
        console.warn("WebSocket closed:", event);
        console.warn("Close code:", event.code);
        console.warn("Close reason:", event.reason);
        
        // Attempt to reconnect if not a normal closure
        if (event.code !== 1000 && reconnectAttemptsRef.current < maxReconnectAttempts) {
          const delay = reconnectDelay * Math.pow(2, reconnectAttemptsRef.current);
          console.log(`Attempting to reconnect in ${delay}ms (attempt ${reconnectAttemptsRef.current + 1}/${maxReconnectAttempts})`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptsRef.current++;
            connect();
          }, delay);
        } else if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
          console.error("Max reconnection attempts reached. Giving up.");
        }
      };
    } catch (error) {
      console.error("Error creating WebSocket connection:", error);
    }
  }, [url, onMessage]);

  useEffect(() => {
    // Add a small delay before first connection attempt to allow server to be ready
    const initialTimeout = setTimeout(() => {
      connect();
    }, initialDelay);

    return () => {
      console.log("Cleanup: closing WebSocket");
      clearTimeout(initialTimeout);
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (socketRef.current) {
        socketRef.current.close(1000, "Component unmounting");
      }
    };
  }, [connect]);

  // Return the socket ref for external access if needed
  return socketRef.current;
}
