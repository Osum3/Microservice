const express=require('express');
const router = express.Router();
const AuthMiddleware=require('./middleware/AuthMiddleware')

const captainController = require('./controller/Captain_constroller');


router.post('/Register', captainController.register);
router.post('/Login', captainController.login);
router.get('/Logout', captainController.logout);
router.get('/Profile', AuthMiddleware.CaptainAuth, captainController.profile);
router.patch('/Toggle_availability',AuthMiddleware.CaptainAuth,captainController.Available)
router.get('/waitfornewride',AuthMiddleware.CaptainAuth,captainController.wairfornewride)
module.exports=router;