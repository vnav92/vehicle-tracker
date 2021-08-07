import React, { useEffect, useState } from 'react';
import socketClient from 'socket.io-client';

import { UfoVehicle } from './types';
import { UfoData, UfoVehiclesMap } from './components';

import styles from './App.module.scss';

export const DEFAULT_PORT = 8080;

const App = () => {
  const [vehiclesData, setVehiclesData] = useState<UfoVehicle[] | null>(null);
  const [hoveredVehicleId, setHoveredVehicleId] = useState<string | null>(null);
  useEffect(() => {
    const newSocket = socketClient(
      `http://${window.location.hostname}:${DEFAULT_PORT}`
    );

    newSocket.on('data', (data: UfoVehicle[]) => {
      setVehiclesData(data);
    });
    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <UfoVehiclesMap
        vehiclesData={vehiclesData}
        hoveredVehicleId={hoveredVehicleId}
        className={styles.layoutMember}
      />
      <UfoData
        vehiclesData={vehiclesData}
        onHoveredVehicleChange={id => setHoveredVehicleId(id)}
        className={styles.layoutMember}
      />
    </div>
  );
};

export default App;
