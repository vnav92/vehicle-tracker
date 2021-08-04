import React, { useEffect } from 'react';
import socketClient  from "socket.io-client";

import { VehiclesData } from './types';

const DEFAULT_PORT = 8080;

const App = () => {

  useEffect(() => {
    const newSocket = socketClient(`http://${window.location.hostname}:${DEFAULT_PORT}`);

    newSocket.on('data', (data: VehiclesData) => {
      console.log('data arrived', data)
    })
    return () => {
      newSocket.close()
    };
  }, []);

  return (
    <p>this is a place for the future app</p>
  )
}

export default App;
