# UFO tracer

## Content:

- [Description](#description)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Testing](#testing)

## Description

Purpose of the application is to provide easy way to track UFO vehicles, which are currently in Earth's airspace.
By looking at the map you can easily determine a vehicle's position and direction of movement.
Thanks to data section, you can quickly read the other vehicle's data (its galactic registration number, origin planet,
if they are friends or enemies and exact coordinates).

Also, when hovering over particular vehicle`s section you can easily see on the map, which vehicle you are analyzing 
(proper icon on the map is getting red color and map is automatically centering at this vehicle).

## Prerequisites

Install [Node.js®](https://nodejs.org/en/download/) and [yarn](https://yarnpkg.com) (or [npm](https://www.npmjs.com)) if they are not already installed on your machine.

## Installation

This app contains `server` and `client` sections, to install dependencies of both:

in `./server` run:
```
yarn install
```

in `./client` run:
```
yarn install
```

**NOTE:** 
If you are using `npm` as package manager, you should use corresponding commands.

Client part of application uses environment variables, `.env` file should be added 
in `./client` directory. File should be provided with
```
REACT_APP_API_URL=<<api url here>>
```

**NOTE:**
Application comes with a server by default. In order to connect with this server, set following `REACT_APP_API_URL` value:
```
http://localhost:8080
```

## Development

First start server, in first window of terminal run:

in `./server`

```
yarn start
```

in second window of terminal run:

in `./client`

```
yarn start
```

This will open a development server on http://localhost:3000/

## Testing

[Jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com) are used for unit testing.

To run all unit tests:

```
yarn test
```
