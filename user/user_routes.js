const express=require('express');
const router = express.Router();
// const app=express();
const userController=require('./controller/user_constroller')
router.post('/register',userController.register)
module.exports=router;
