const express=require('express')
const expressProxy=require('express-http-proxy')
const app=express();



app.use('/user',expressProxy('http://localhost:3001'))
app.use('/Captain',expressProxy('http://localhost:3003'))
app.use('/ride',expressProxy('http://localhost:3008'))


app.listen(3000,()=>{
    console.log('port 3000')
});

