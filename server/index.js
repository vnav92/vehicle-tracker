const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const { Ufo } = require("./classes/ufo");
const { initialData } = require("./consts/initial-data");

const DEFAULT_PORT = 8080;
const DATA_EMIT_INTERVAL = 2000;

http.listen(DEFAULT_PORT, () => {
  console.log(`Server listening on:${DEFAULT_PORT}`);
});

io.on("connection", socket => {
  const firstVehicle = new Ufo(initialData[0]);
  const secondVehicle = new Ufo(initialData[1]);
  const thirdVehicle = new Ufo(initialData[2]);

  setInterval(() => {
    socket.emit("data", [
      firstVehicle.getCarWithNewCoordinates(),
      secondVehicle.getCarWithNewCoordinates(),
      thirdVehicle.getCarWithNewCoordinates()
    ]);
  }, DATA_EMIT_INTERVAL);

  socket.on("disconnect", () => {
    console.log("Client disconnected!");
  });
});
