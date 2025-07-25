const userModel= require('../models/user.model')
const bcrypt= require('bcrypt')
const jwt =require('jsonwebtoken')
const black_list_user=require('../models/blacklist_token')

module.exports.register = async(req,res)=>{
    try{
            const { name ,email,password} =req.body;
            const user=await userModel.findOne({email});

            if(user){
                return res.status(400).json({message: 'User Already exist'})

            }
            const hash=await bcrypt.hash(password,10);
            const newUser=new userModel ({name,email,hash});

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
            res.status(500).json({message:err.message});
    }
}


module.exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;

        const user=await userModel.findOne({email});

        if(!user){
            return res.status(400).json({message:"invalid Email"})
        }
        const pass=await bcrypt.compare(password, user.password);
        if(!pass){
            return res.status(400).json({message:"invalid Password "})

        }
            const token=jwt.sign({id:user._id},process.env.SECRET,{
                expiresIn:'1hr'
            });
            res.cookie('token',token);
            res.send({message :'User logged in successfully'})
        
    }
    catch(err){
            return res.status(500).json({err});
    }
}

module.exports.blacklist=async((req,res)=>{
    try{
        const user=mongoose.black_list_user
    }
    catch(){

    }
})


