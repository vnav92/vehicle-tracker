import React, { useEffect } from "react";
import { LatLngTuple } from "leaflet";
import { useMap } from "react-leaflet";

import { VehiclesData } from "../../types";

type MapCenterSetterProps = {
  vehiclesData: VehiclesData | null
}
export const MapCenterSetter: React.FC<MapCenterSetterProps> = ({ vehiclesData }) => {
  const map = useMap();

  const getCenterPointCoordinates = (vehiclesData: VehiclesData) => {
    const summedDegrees = vehiclesData.reduce<[number, number]>((acc, curr, index, arr) => {
      acc[0] += curr.coordinates.lat;
      acc[1] += curr.coordinates.lng;
      return acc
    }, [0, 0]);

    return [summedDegrees[0] / vehiclesData.length, summedDegrees[1] / vehiclesData.length] as LatLngTuple
  }

  useEffect(() => {
    if (vehiclesData) {
      map.setView(getCenterPointCoordinates(vehiclesData))
    }
  }, [vehiclesData, map])

  return null
}
