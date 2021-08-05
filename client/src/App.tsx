import React, { useEffect, useState } from 'react';
import socketClient  from "socket.io-client";

import { VehiclesData } from './types';
import { VehiclesMap } from "./components";

const DEFAULT_PORT = 8080;

const App = () => {

  const [vehiclesData, setVehiclesData] = useState<VehiclesData | null>(null);
  useEffect(() => {
    const newSocket = socketClient(`http://${window.location.hostname}:${DEFAULT_PORT}`);

    newSocket.on('data', (data: VehiclesData) => {
      setVehiclesData(data)
    })
    return () => {
      newSocket.close()
    };
  }, []);

  return (
    <>
      <p>this is a place for the future app</p>
      <VehiclesMap vehiclesData={vehiclesData}/>
    </>
  )
}

export default App;
