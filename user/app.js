const express=require('express');
const app=express();
const userRoutes=require('./user_routes')
const dotenv=require('dotenv');
dotenv.config();
const cookieParser=require('cookie-parser');

const connect=require('./DB/db')
connect();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));



app.use('/',userRoutes)

module.exports = app;