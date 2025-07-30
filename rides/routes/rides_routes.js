const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/Authmiddleware')
const riderController = require('../controllers/ride_controllers')
const rabbit = require('../service/RabbitMq')

rabbit.connectRabbitMQ()
console.log("rides_routes.js")
router.post('/create-ride', authMiddleware.UserAuth, riderController.createRide)
router.put('/accept-ride', authMiddleware.captainAuth, riderController.acceptRide)
// , authMiddleware.captainAuth,
module.exports = router;