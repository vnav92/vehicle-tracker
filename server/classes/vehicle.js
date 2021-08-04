const DESIRED_RANDOM_AVERAGE = 0.5;
const MOVE_STEP = 1;

module.exports = {
  Car: class {
    constructor(vehicle) {
      this.vehicle = vehicle;
      this.initialCoordinates = this.vehicle.coordinates;
    }

    randomlySetPosition(position) {
      const shouldIncrease = position > DESIRED_RANDOM_AVERAGE
        ? Math.random() >= 0.5
        : Math.random() > 0.5;

      return shouldIncrease
        ? position + MOVE_STEP
        : position - MOVE_STEP
    }

    getCarWithNewCoordinates() {
      this.initialCoordinates = {
        lat: {
          degrees: this.vehicle.coordinates.lat.degrees,
          minutes: this.randomlySetPosition(this.initialCoordinates.lat.minutes)
        },
        lng: {
          degrees: this.vehicle.coordinates.lng.degrees,
          minutes: this.randomlySetPosition(this.initialCoordinates.lng.minutes)
        }
      }

      return {
        id: this.vehicle.id,
        coordinates: {
          lat: Number(`${this.initialCoordinates.lat.degrees}.${this.initialCoordinates.lat.minutes}`),
          lng: Number(`${this.initialCoordinates.lng.degrees}.${this.initialCoordinates.lng.minutes}`)
        }
      }
    }
  }
}
