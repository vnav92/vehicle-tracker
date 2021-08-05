export type VehiclesData = [UfoVehicle, UfoVehicle, UfoVehicle];

export type UfoVehicle = {
  id: string;
  planetName: string;
  coordinates: {
    lat: number;
    lng: number;
  }
};
