const express=require('express')
const ride_routes=require('./routes/rides_routes')
const app=express();

const dotenv=require('dotenv');
dotenv.config();
const cookieParser=require('cookie-parser');
const connect =require('./DB/db')
connect();
const rabbit = require('./service/RabbitMq')

rabbit.connectRabbitMQ()
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

console.log("Rides service is running on port 3008");


app.use('/', ride_routes)

module.exports = app;
