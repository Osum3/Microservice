const mongoose=require('mongoose')
const dotenv=require('dotenv')

// const db=dotenv;
// const URL=db.URL;
// console.log(URL);

function connect(){
    mongoose.connect(process.env.MONGO_URL).then((val)=>{
        console.log('DB connected')

    }).catch((error)=>{

        console.log(error)
    })
    
}

module.exports= connect;