const jwt=require('jsonwebtoken');
const userModel=require('../models/user.model');
const dotenv=require('dotenv')
dotenv.config()

module.exports.userAuth=async(req,res,next)=>{

        try{
            const token=req.cookies.token||req.headers.authorization.split(' ')[ 1 ];
            if(!token){
                return res.status(400).json({
                    message:'Unauthorized'
                })
            }
           const decoded = jwt.verify(token, process.env.SECRET);

            const user=await userModel.findById(decoded.id);
            if(!user){
                return res.status(401).json({
                    message:'Unauthorized'
                })
            }
            let new_obj=user.toObject();
            delete new_obj.password;
            console.log(new_obj)
            req.user=new_obj;
                next();
        }
        catch(error){
            res.status(500).json({
                error
            })
        }
       
        
}