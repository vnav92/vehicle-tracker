import React from 'react';
import { Marker, TileLayer, Tooltip } from 'react-leaflet';
import L from 'leaflet';

import defaultUfoIcon from '../../../assets/ufo-icon.svg';
import activeUfoIcon from '../../../assets/active-ufo-icon.svg';
import { UfoVehicle } from '../../../types';
import { useMapCenter } from '../ufo-vehicles-map.hook';

import 'leaflet/dist/leaflet.css';
import styles from './ufo-vehicles-map-content.module.scss';

const ICON_SIZE = 50;

const defaultIcon = L.icon({
  iconUrl: defaultUfoIcon,
  iconSize: [ICON_SIZE, ICON_SIZE]
});

const activeIcon = L.icon({
  iconUrl: activeUfoIcon,
  iconSize: [ICON_SIZE, ICON_SIZE]
});

type UfoVehiclesMapContentProps = {
  vehiclesData: UfoVehicle[] | null;
  hoveredVehicleId: string | null;
};

export const UfoVehiclesMapContent: React.FC<UfoVehiclesMapContentProps> = ({
  vehiclesData,
  hoveredVehicleId
}) => {
  useMapCenter(vehiclesData, hoveredVehicleId);
  return (
    <>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {vehiclesData?.map(vehicle => (
        <Marker
          key={vehicle.id}
          position={[vehicle.coordinates.lat, vehicle.coordinates.lng]}
          icon={
            hoveredVehicleId && hoveredVehicleId === vehicle.id
              ? activeIcon
              : defaultIcon
          }
        >
          <Tooltip
            permanent={true}
            direction="bottom"
            className={styles.tooltip}
          >
            {vehicle.id}
          </Tooltip>
        </Marker>
      ))}
    </>
  );
};
