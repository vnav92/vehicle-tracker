export type VehiclesData = [UfoVehicle, UfoVehicle, UfoVehicle];

export type UfoVehicle = {
  id: string;
  planetName: string;
  isFriend: boolean;
  coordinates: {
    lat: number;
    lng: number;
  }
};
