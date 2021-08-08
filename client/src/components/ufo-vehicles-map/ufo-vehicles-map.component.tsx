import React, { ComponentProps, useEffect, useState } from 'react';
import classNames from 'classnames';
import L, { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';

import activeUfoIcon from '../../assets/active-ufo-icon.svg';
import defaultUfoIcon from '../../assets/ufo-icon.svg';
import { UfoVehicle } from '../../types';
import { UfoVehiclesSearch } from '../ufo-vehicles-search';
import { MapCenterSetter } from './map-center-setter.component';

import 'leaflet/dist/leaflet.css';
import styles from './ufo-vehicles-map.module.scss';

const ICON_SIZE = 50;
const INITIAL_MAP_CENTER: LatLngExpression = [50, 12];

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
      <MapContainer center={INITIAL_MAP_CENTER} zoom={10} className={styles.mapContainer}>
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
