const express=require('express')
const jwt=require('jsonwebtoken');
const axios=require('axios');

const dotenv=require('dotenv')
dotenv.config();

module.exports.UserAuth=async (req,res,next)=>{
    try{
        console.log("ahj;klsdfhj");
        const token=req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
        if(!token){
            res.status(500).json({message:'Unahorized'})
        }
        const decode=jwt.verify(token,process.env.SECRET);
        console.log(process.env.BASE_URL)
        const response = await axios.get('http://localhost:3000/user/profile', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

        console.log(process.env.BASE_URL);
        const user=response.data;

        if(!user){
            return res.status(402).JSON({message:"Unaorized"});
        }
        req.user=user;
        next();
    }
     catch (error) {
        res.status(400).send({ message: [error.message,"non"] });
    }
}
module.exports.captainAuth=async (req,res,next)=>{
    try{
console.log('ddddddddddddddddddddddddddddddddddddddd--------d--------')
        const token=req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
        if(!token){
            res.status(500).JSON({message:'Unauthorized'})
        }
        const decode=jwt.verify(token,process.env.SECRET);
        
        const response=await axios.get(`${process.env.BASE_URL}/captain/profile`,{
            headers:{
                authorization : `Bearer  ${token}`
            }
        })
        const captain=response.data;

        if(!captain){
            return res.status(401).JSON({message:"Unauthorized"});
        }
        req.next=captain;
        next();
    }
     catch (error) {
        res.status(500).json({ message: [error.message,"non"]});
    }
}