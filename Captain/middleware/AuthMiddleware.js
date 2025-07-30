const jwt=require('jsonwebtoken');
const Captain_model=require('../models/Captain.model');
const dotenv=require('dotenv')
dotenv.config()

module.exports.CaptainAuth=async(req,res,next)=>{

        try{
            const token=req.cookies.token||req.headers.authorization.split(' ')[ 1 ];
            if(!token){
                return res.status(400).json({
                    message:'Unauthorized'
                })
            }
           const decoded = jwt.verify(token, process.env.SECRET);

            const user=await Captain_model.findById(decoded.id);
            if(!user){
                return res.status(401).json({
                    message:'Unauthorized'
                })
            }
            console.log("auth of captain")
            let new_obj=user.toObject();
            delete new_obj.password;
            // console.log(new_obj)
            req.captain=new_obj;
                next();
        }
        catch(error){
            res.status(500).json({
                error
            })
        }
       
        
}