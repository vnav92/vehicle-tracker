const DESIRED_RANDOM_AVERAGE = 0.5;
const MOVE_STEP = 1;

module.exports = {
  Ufo: class {
    constructor(ufo) {
      this.ufo = ufo;
      this.initialCoordinates = this.ufo.coordinates;
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
          degrees: this.ufo.coordinates.lat.degrees,
          minutes: this.randomlySetPosition(this.initialCoordinates.lat.minutes)
        },
        lng: {
          degrees: this.ufo.coordinates.lng.degrees,
          minutes: this.randomlySetPosition(this.initialCoordinates.lng.minutes)
        }
      }

      return {
        ...this.ufo,
        coordinates: {
          lat: Number(`${this.initialCoordinates.lat.degrees}.${this.initialCoordinates.lat.minutes}`),
          lng: Number(`${this.initialCoordinates.lng.degrees}.${this.initialCoordinates.lng.minutes}`)
        }
      }
    }
  }
}
