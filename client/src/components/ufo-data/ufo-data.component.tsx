import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngry,
  faBan,
  faGlobe,
  faIdCard,
  faLocationArrow,
  faSmile
} from '@fortawesome/free-solid-svg-icons';

import { UfoVehicle } from '../../types';
import styles from './ufo-data.module.scss';

type UfoDataProps = {
  vehiclesData: UfoVehicle[] | null;
  className?: string;
  onHoveredVehicleChange: (id: string | null) => void;
};

export const UfoData: React.FC<UfoDataProps> = ({
  vehiclesData,
  className,
  onHoveredVehicleChange
}) => {
  const parsedCoordinate = (coordinate: number) =>
    `${String(coordinate).padEnd(5, '0').replace('.', '°')}'`;

  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.headingSection}>
        <h1 className={styles.header}>Ufo tracker</h1>
        <div className={styles.connectionQualityBadge} role="status">
          {vehiclesData ? 'Signal good' : 'No signal'}
          <span
            className={classNames(
              styles.qualityMarker,
              vehiclesData ? styles.greenMarker : styles.redMarker
            )}
          />
        </div>
      </div>
      {vehiclesData ? (
        <div className={styles.vehiclesWrapper}>
          <h2 className={styles.subHeader}>
            Vehicles currently in the airspace:
          </h2>
          {vehiclesData.map(vehicle => (
            <div
              key={vehicle.id}
              className={styles.vehicleSection}
              data-testid="vehicle-section"
              onMouseEnter={() => onHoveredVehicleChange(vehicle.id)}
              onMouseLeave={() => onHoveredVehicleChange(null)}
            >
              <span className={styles.dataItem}>
                <FontAwesomeIcon icon={faIdCard} /> {vehicle.id}
              </span>
              <span className={styles.dataItem}>
                <FontAwesomeIcon icon={faGlobe} /> {vehicle.planetName}
              </span>
              <span className={styles.dataItem}>
                <FontAwesomeIcon icon={vehicle.isFriend ? faSmile : faAngry} />{' '}
                {vehicle.isFriend ? 'Friend' : 'Enemy'}
              </span>
              <span className={styles.dataItem}>
                <FontAwesomeIcon icon={faLocationArrow} />{' '}
                {parsedCoordinate(vehicle.coordinates.lat)}{' '}
                {parsedCoordinate(vehicle.coordinates.lng)}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noDataWrapper}>
          <FontAwesomeIcon icon={faBan} />
          <h3 className={styles.noDataHeader}>No data</h3>
        </div>
      )}
    </div>
  );
};
