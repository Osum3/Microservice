const mongoose = require('mongoose')



const black_list_user=new mongoose.Schema({
            Token:{
                type:String,
                required:true
            },
            createdAt:{
                type:Date,
                default:Date.now,
                expires:3600

            }

},{timestamps:true});

module.exports=mongoose.model('Black_list',black_list_user);