import React, { useEffect, useState } from "react";
import socketClient from "socket.io-client";

import { VehiclesData } from "./types";
import { UfoData, UfoVehiclesMap } from "./components";

import styles from "./App.module.scss";

const DEFAULT_PORT = 8080;

const App = () => {
  const [vehiclesData, setVehiclesData] = useState<VehiclesData | null>(null);
  const [hoveredVehicleId, setHoveredVehicleId] = useState<string | null>(null);
  useEffect(() => {
    const newSocket = socketClient(
      `http://${window.location.hostname}:${DEFAULT_PORT}`
    );

    newSocket.on("data", (data: VehiclesData) => {
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
