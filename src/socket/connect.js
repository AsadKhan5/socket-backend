import { useReducer, useEffect } from 'react';
import { io } from 'socket.io-client';

const initialState = {
  connected: false,
  socketId: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'CONNECT':
      return {
        ...state,
        connected: true,
        socketId: action.payload,
      };
    case 'DISCONNECT':
      return {
        ...state,
        connected: false,
        socketId: null,
      };
    default:
      return state;
  }
}

// Create socket instance (don't auto connect)
const URL = 'http://localhost:3000';
export const socket = io(URL, {
  autoConnect: false,
});

export function useSocket() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Handle socket events
    socket.on('connect', () => {
      dispatch({ type: 'CONNECT', payload: socket.id });
    });

    socket.on('disconnect', () => {
      dispatch({ type: 'DISCONNECT' });
      console.log('Disconnected from server');
    });

    socket.on('message-recieved', (message) => {
      console.log('Message:', message);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message-recieved');
    };
  }, []);

  // Trigger connection
  const connect = () => {
    if (!socket.connected) socket.connect();
  };

  // Trigger disconnection
  const disconnect = () => {
    if (socket.connected) socket.disconnect();
  };

  // Emit message
  const sendMessage = (message, socketId) => {
    socket.emit('message', { message, socketId });
  };

  return {
    state,
    connect,
    disconnect,
    sendMessage,
  };
}
