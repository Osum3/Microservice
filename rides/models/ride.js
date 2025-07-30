const {  mongoose } = require("mongoose")

const create_ride=new mongoose.Schema({
    user:{
        type:String,
        require:true

    },
    pickup:{
        type:String,
        require:true
    },
    destination:{
            type:String,
        require:true
    },
    status:{
        type:String,
        enum:['requested','accepted','started','completed'],
        default :'requested'
    }
},{timestamps:true})

module.exports= mongoose.model('ride',create_ride);
