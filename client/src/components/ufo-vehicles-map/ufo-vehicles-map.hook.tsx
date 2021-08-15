import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';

import { UfoVehicle } from '../../types';

export const useMapCenter = (
  vehiclesData: UfoVehicle[] | null,
  hoveredVehicleId: string | null
) => {
  const map = useMap();
  const activeVehicle =
    vehiclesData && hoveredVehicleId
      ? vehiclesData.find(vehicle => vehicle.id === hoveredVehicleId)
      : null;

  const getCenterPointCoordinates = (vehiclesData: UfoVehicle[]) => {
    const summedDegrees = vehiclesData.reduce<[number, number]>(
      (acc, curr) => {
        acc[0] += curr.coordinates.lat;
        acc[1] += curr.coordinates.lng;
        return acc;
      },
      [0, 0]
    );

    return [
      summedDegrees[0] / vehiclesData.length,
      summedDegrees[1] / vehiclesData.length
    ];
  };

  useEffect(() => {
    if (vehiclesData?.length) {
      const coordinates = activeVehicle
        ? [activeVehicle.coordinates.lat, activeVehicle.coordinates.lng]
        : getCenterPointCoordinates(vehiclesData);

      map.setView(coordinates as LatLngTuple);
    }
  }, [vehiclesData, map, activeVehicle]);
};
