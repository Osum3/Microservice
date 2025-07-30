const mongoose = require('mongoose')


const Captain_Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
        
    },
    password:{
        type:String,
        required:true
        
    },
    isAvailable:{
        type:Boolean,
        default:false
    }
})

module.exports =mongoose.model('Captain',Captain_Schema);