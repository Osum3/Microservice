const userModel= require('../models/user.model')
const bcrypt= require('bcrypt')
const jwt =require('jsonwebtoken')
const BlacklistToken = require('../models/blacklist_token')
const { subscribeToQueue } = require('../../Captain/service/RabbitMq')

module.exports.register = async(req,res)=>{
    try{
        console.log("reached Here");
            const { name ,email,password} =req.body;
           
            const user=await userModel.findOne({email});
            if(user){
                return res.status(400).json({message: 'User Already exist'})

            }
            const hash=await bcrypt.hash(password,10);
            const newUser=new userModel ({name,email,password:hash});

            await newUser.save();

            const token=jwt.sign(
                {
                    id:newUser.id
                },
                process.env.SECRET,
                {
                    expiresIn: '1h'
                }
            )

            res.cookie('token',token);
            res.send({
                message:'user Registered Succes'
            })
    }
    catch(error){
            res.status(500).json({message:error.message});
    }
}


module.exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;

        const user=await userModel.findOne({email});

        if(!user){
            return res.status(400).json({message:"invalid Email"})
        }
        console.log(user)
        const pass=await bcrypt.compare(password, user.password);
        if(!pass){
            return res.status(400).json({message:"invalid Password "})

        }
            const token=jwt.sign({id:user._id},process.env.SECRET,{
                expiresIn:'1hr'
            });
            const userObj = user.toObject();
        delete userObj.password; // ✅ password removed here
            res.cookie('token',token);
            res.send({token,user:userObj})
        
    }
    catch(err){
            return res.status(500).json({err});
    }
}

module.exports.logout=async(req,res)=>{
    try{
        const token=req.cookies.token;
        await BlacklistToken.create({Token:token});
        res.clearCookie('token');
        res.send({message:'UserLoggedout Successfully'});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}


module.exports.profile=async(req,res)=>{
    try{
        res.send(req.user);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}
const EventEmitter = require('events');
const rideEventEmitter = new EventEmitter();
    module.exports.acceptedRide = async (res) => {
       rideEventEmitter.once('ride-accepted',(data)=>{
        res.send(data);
       })
       setTimeout(() => {
        return res.status(204).send(); 
    }, 30000);
    };
    subscribeToQueue('ride-accepted',async(msg)=>{
        const data=JSON.parse(msg);
        rideEventEmitter.emit('ride-accepted',data);
    })
