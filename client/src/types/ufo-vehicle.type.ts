export type UfoVehicle = {
  id: string;
  planetName: string;
  isFriend: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
};
