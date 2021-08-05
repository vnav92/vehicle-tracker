import React, { ComponentProps } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

import icon from '../../assets/ufo-icon.svg';
import { MapCenterSetter } from './map-center-setter.component';
import styles from './ufo-vehicles-map.module.scss';

const ICON_SIZE = 50;
const defaultIcon = L.icon({
  iconUrl: icon,
  iconSize: [ICON_SIZE, ICON_SIZE]
});

export const UfoVehiclesMap: React.FC<ComponentProps<typeof MapCenterSetter>> = ({
  vehiclesData
}) => {

  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        center={[50, 12]}
        zoom={10}
        className={styles.mapContainer}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {vehiclesData && (
          vehiclesData.map(vehicle => (
            <Marker
              key={vehicle.id}
              position={[vehicle.coordinates.lat, vehicle.coordinates.lng]}
              icon={defaultIcon}
            />
          ))
        )}
        <MapCenterSetter vehiclesData={vehiclesData}/>
      </MapContainer>
    </div>

  )
}
