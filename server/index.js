const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const { Car } = require('./classes/vehicle');
const { initialData } = require('./consts/initial-data');

const DEFAULT_PORT = 8080;
const DATA_EMIT_INTERVAL = 2000;

http.listen(DEFAULT_PORT, () => {
  console.log(`Server listening on:${DEFAULT_PORT}`);
});

io.on('connection', socket => {
  const firstCar = new Car(initialData[0]);
  const secondCar = new Car(initialData[1]);
  const thirdCar = new Car(initialData[2]);

  setInterval(() => {
    socket.emit('data', [
      firstCar.getCarWithNewCoordinates(),
      secondCar.getCarWithNewCoordinates(),
      thirdCar.getCarWithNewCoordinates()
    ]);
}, DATA_EMIT_INTERVAL);

  socket.on('disconnect', () => {
    console.log('Client disconnected!')
  });
});


