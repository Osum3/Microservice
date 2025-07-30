const create_ride =require('../models/ride');
const {subscribeToQueue, publishToQueue} = require('../service/RabbitMq');
module.exports.createRide= async(req,res,next)=>{
    const {pickup,destination} =req.body;
console.log("createRide called with pickup:", pickup, "and destination:", destination);
    const new_ride= new create_ride({
        user:req.user._id,pickup,destination
    })
    publishToQueue("new-ride",JSON.stringify(new_ride))
    await new_ride.save();
    res.send(new_ride);
}

module.exports.acceptRide = async (req, res, next) => {
    const { rideId } = req.query;
    const ride = await rideModel.findById(rideId);
    if (!ride) {
        return res.status(404).json({ message: 'Ride not found' });
    }

    ride.status = 'accepted';
    await ride.save();
    publishToQueue("ride-accepted", json.stringify(ride))
    res.send(ride);
}

