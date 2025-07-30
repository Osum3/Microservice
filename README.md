# 🚖 Microservices-Based Ride & Captain Services

A Node.js microservices project featuring **separate modules for Captain and Ride services**, communicating asynchronously via RabbitMQ, and secured with JWT authentication.

---

## 🔧 Core Features

- **Captain Service**
  - Register, Login, Logout
  - Availability check endpoint

- **Ride Service**
  - Create ride request
  - Accept ride (Captain only)

- **Event-Driven Communication**
  - RabbitMQ is used for message passing between Ride and Captain services

- **Security**
  - JWT-based authentication (`UserAuth` and `CaptainAuth` middleware)
  - Token blacklist on logout

- **Error Handling & Middleware Fixes**
  - Clean token extraction and error responses
  - Safe `.env` usage for configs

---

## ⚙️ Tech Stack

- **Backend**: Node.js, Express.js  
- **Queue**: RabbitMQ (`amqplib`)  
- **Database**: MongoDB (Mongoose)  
- **Auth**: JWT tokens (in HTTP-only cookies)  
- **Event Management**: Node.js `EventEmitter`

*/-------------------------------------------------------------------------------------------/*

