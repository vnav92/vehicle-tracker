import React, { ComponentProps, useEffect, useState } from 'react';
import classNames from 'classnames';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import defaultUfoIcon from '../../assets/ufo-icon.svg';
import activeUfoIcon from '../../assets/active-ufo-icon.svg';
import { UfoVehicle } from '../../types';
import { MapCenterSetter } from './map-center-setter.component';
import { UfoVehiclesSearch } from '../ufo-vehicles-search';
import styles from './ufo-vehicles-map.module.scss';

const ICON_SIZE = 50;
const defaultIcon = L.icon({
  iconUrl: defaultUfoIcon,
  iconSize: [ICON_SIZE, ICON_SIZE]
});

const activeIcon = L.icon({
  iconUrl: activeUfoIcon,
  iconSize: [ICON_SIZE, ICON_SIZE]
});

export const UfoVehiclesMap: React.FC<
  ComponentProps<typeof MapCenterSetter> & { className?: string }
> = ({ vehiclesData, className, hoveredVehicleId }) => {
  const [visibleVehicles, setVisibleVehicles] = useState<UfoVehicle[] | null>(
    vehiclesData
  );
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    if (!searchValue) {
      setVisibleVehicles(vehiclesData);
    }

    setVisibleVehicles(
      vehiclesData &&
        vehiclesData.filter(vehicle =>
          vehicle.id.toLowerCase().includes(searchValue.toLowerCase())
        )
    );
  }, [searchValue, vehiclesData]);

  return (
    <div className={classNames(styles.mapWrapper, className)}>
      {vehiclesData && (
        <UfoVehiclesSearch
          className={styles.search}
          onVisibleVehiclesChange={setSearchValue}
        />
      )}
      <MapContainer center={[50, 12]} zoom={10} className={styles.mapContainer}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {visibleVehicles?.map(vehicle => (
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
        <MapCenterSetter
          vehiclesData={visibleVehicles}
          hoveredVehicleId={hoveredVehicleId}
        />
      </MapContainer>
    </div>
  );
};
