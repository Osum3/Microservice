const express=require('express');
const router = express.Router();
const AuthMiddleware=require('./middleware/AuthMiddleware')
// const app=express();
const userController=require('./controller/user_constroller')
            console.log("Auth Middleware Reached");

router.post('/Register',userController.register)
router.post('/Login',userController.login)
router.get('/Logout',userController.logout)
router.get('/Profile',AuthMiddleware.userAuth,userController.profile);
router.get('/accepted-ride', AuthMiddleware.userAuth,userController.acceptedRide)


module.exports=router;
