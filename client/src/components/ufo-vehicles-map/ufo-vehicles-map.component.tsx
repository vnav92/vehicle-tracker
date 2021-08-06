import React, { ComponentProps } from 'react';
import classNames from 'classnames';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

import defaultUfoIcon from '../../assets/ufo-icon.svg';
import activeUfoIcon from '../../assets/active-ufo-icon.svg';
import { MapCenterSetter } from './map-center-setter.component';
import styles from './ufo-vehicles-map.module.scss';

const ICON_SIZE = 50;
const defaultIcon = L.icon({
  iconUrl: defaultUfoIcon,
  iconSize: [ICON_SIZE, ICON_SIZE],
});

const activeIcon = L.icon({
  iconUrl: activeUfoIcon,
  iconSize: [ICON_SIZE, ICON_SIZE],
});

export const UfoVehiclesMap: React.FC<ComponentProps<typeof MapCenterSetter> & { className?: string }> = ({
  vehiclesData,
  className,
  hoveredVehicleId
}) => {

  return (
    <div className={classNames(styles.mapWrapper, className)}>
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
              icon={hoveredVehicleId && hoveredVehicleId === vehicle.id ? activeIcon : defaultIcon}
            />
          ))
        )}
        <MapCenterSetter vehiclesData={vehiclesData} hoveredVehicleId={hoveredVehicleId}/>
      </MapContainer>
    </div>

  )
}
