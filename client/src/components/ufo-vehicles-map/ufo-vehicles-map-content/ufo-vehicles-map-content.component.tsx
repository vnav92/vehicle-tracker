import React from 'react';
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import styles from "./ufo-vehicles-map.module.scss";
import L from "leaflet";
import defaultUfoIcon from "../../assets/ufo-icon.svg";
import activeUfoIcon from "../../assets/active-ufo-icon.svg";
import { UfoVehicle } from "../../types";
import { useMapCenter } from "./ufo-vehicles-map.hook";

const ICON_SIZE = 50;

const defaultIcon = L.icon({
  iconUrl: defaultUfoIcon,
  iconSize: [ICON_SIZE, ICON_SIZE]
});

const activeIcon = L.icon({
  iconUrl: activeUfoIcon,
  iconSize: [ICON_SIZE, ICON_SIZE]
});

type UfoVehiclesMapContent = {
  visibleVehicles: UfoVehicle[];
  hoveredVehicleId: string | null;
}

export const UfoVehiclesMapContent: React.FC<UfoVehiclesMapContent> = ({
  visibleVehicles,
  hoveredVehicleId
}) => {
  useMapCenter(visibleVehicles, hoveredVehicleId)
  return (
    <>
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
    </>
  )
}
