const http =require('http');
const app = require('./app');

const server=http.createServer(app);



server.listen(3008,()=>{
    console.log("its workingggg")
})// user service
