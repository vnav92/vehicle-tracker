import React, { ComponentProps, useEffect, useState } from 'react';
import classNames from 'classnames';
import { LatLngExpression } from 'leaflet';
import { MapContainer } from 'react-leaflet';

import { UfoVehicle } from '../../types';
import { UfoVehiclesSearch } from '../ufo-vehicles-search';
import { UfoVehiclesMapContent } from './ufo-vehicles-map-content/ufo-vehicles-map-content.component';

import styles from './ufo-vehicles-map.module.scss';

const INITIAL_MAP_CENTER: LatLngExpression = [50, 12];

export const UfoVehiclesMap: React.FC<
  ComponentProps<typeof UfoVehiclesMapContent> & { className: string }
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
      <MapContainer
        center={INITIAL_MAP_CENTER}
        zoom={10}
        className={styles.mapContainer}
      >
        <UfoVehiclesMapContent
          vehiclesData={visibleVehicles}
          hoveredVehicleId={hoveredVehicleId}
        />
      </MapContainer>
    </div>
  );
};
