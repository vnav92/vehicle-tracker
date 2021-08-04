export type VehiclesData = [Vehicle, Vehicle, Vehicle];

export type Vehicle = {
  id: number;
  coordinates: {
    lat: number;
    lng: number;
  }
};
