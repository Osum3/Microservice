const express=require('express');
const app=express();
const Captain_routes=require('./Captain_routes')
const dotenv=require('dotenv');
dotenv.config();
const cookieParser=require('cookie-parser');
const rabbit = require('./service/RabbitMq')
rabbit.connectRabbitMQ()
const connect=require('./DB/db')
connect();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));



app.use('/',Captain_routes)

module.exports = app;