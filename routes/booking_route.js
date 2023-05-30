const {Bookingmodel}= require("../model/booking_model");
const express= require("express");
const bookingRoute= express.Router();


bookingRoute.post("/booking", async(req,res)=>{
    const {user,flight} = req.body;
    try {
        const booking= new Bookingmodel({user,flight});
        await booking.save();
        res.send("flight booking successful");
    } catch (err) {
        res.send({"msg":"unable to book flight", "error":err.message});
        console.log(err);
    }
});

bookingRoute.get("/dashboard", async(req,res)=>{
    try {
        const booking= await Bookingmodel.find().populate({path:'user', select:['name', 'email']}).populate('flight')
        res.send(booking);
    } catch (err) {
        res.send({"msg":"unable to find bookings", "error":err.message});
        console.log(err);
    }
});

module.exports={
    bookingRoute
}