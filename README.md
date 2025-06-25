## Live Demo

A live instance of the server is hosted at [https://appointment-booking-server-8alu.onrender.com/](https://appointment-booking-server-8alu.onrender.com/).

> **Note:** The server is hosted on Render, which puts the service to sleep after 15 minutes of inactivity. The first request after a period of inactivity may take up to a minute to respond while the server wakes up.

# Appointment Booking Server

This is the backend server for the Appointment Booking application. It provides RESTful APIs for managing appointments, users, and schedules.

## Features

- User registration and authentication
- Create, update, and cancel appointments
- View available time slots
- Admin management for schedules

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB

### Installation

```bash
git clone https://github.com/yourusername/appointment-booking.git
cd appointment-booking/server
npm install
```

### Configuration

Create a `.env` file in the root directory and set the following variables:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Running the Server

```bash
npm start
```

The server will run on `http://localhost:5000`.

## API Documentation

See [API Docs](./docs/api.md) for detailed endpoints and usage.

## License

MIT
