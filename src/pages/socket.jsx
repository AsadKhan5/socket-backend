import React from 'react';
import { Button } from '@/components/ui/button';
import { socket } from './../socket/connect';

const Socket = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Socket Connection</h1>
      <div className="flex flex-col items-center justify-center mt-4">
        <h1 className="text-lg">Socket URL: http://localhost:3000</h1>
        <h1 className="text-lg">Socket Port: 3000</h1>
        <h1>Socket: {socket.connected}</h1>
        <h1>Socket ID: {socket.socketId}</h1>
        <div className="flex gap-4 mt-4">
          <Button onClick={() => socket.connect()}>Connect</Button>
          <Button onClick={() => socket.disconnect()}>Disconnect</Button>
        </div>
      </div>
    </div>
  );
};

export default Socket;
