# web-memory-game-hpm

A web-based implementation of the classic Memory Game, designed for educational purposes. This project leverages modern web technologies to create an engaging and interactive learning experience.

The purpose of this project is to develop an educational game available on web platforms. The game is implemented using HTML, CSS, and Vanilla JavaScript.

## Features

The game consists of three main parts:

1. **Home Page**: Includes a "Start" form for entering the player's name and selecting an avatar.
2. **Settings Page**: Allows configuring various game settings such as difficulty level, grid size, and time limit.
3. **Game Page**: Displays a grid of cards where the player must find matching pairs of hidden images.

## Requirements

- Node.js v20.16.0
- NPM (Node Package Manager)
- Docker

You can download Node.js with NPM from [here](https://nodejs.org/en/download/prebuilt-installer).
You can download Docker from [here](https://docs.docker.com/desktop/install/windows-install/).

## Installation

Follow these steps to install and run the application:

1. Clone this repository:

   ```sh
   git clone https://github.com/bcedra/web-memory-game-hpm.git
   ```

2. Navigate to the project directory:

   ```sh
   cd web-memory-game-hpm
   ```

3. Install the dependencies:

   ```sh
   npm install
   ```

4. Run docker container

   ```sh
      docker-compose up -d
   ```

## Starting the Application

To start the application, run the following command:

1. Front-End

```sh
npm start
```

2. Back-End

```sh
npm run start:backend
```

## Database

1. Acces:

Use this [url](http://localhost:28080/?server=mysql&username=user&db=web-memory-game-hpm).
