const express= require("express");
const orderRoute= express.Router();
const {Ordermodel}= require("../models/order_model");


orderRoute.post("/orders", async(req,res)=>{
    const {user,restaurant,items,totalPrice,deliveryAddress} = req.body;
    try {
        const rest= new Ordermodel({user,restaurant,items,totalPrice,deliveryAddress});
        await rest.save();
        res.send("added Order details")
    } catch (err) {
        res.send("unable to add Order details");
        console.log(err);
    }
});


orderRoute.get("/orders/:id", async(req,res)=>{
    const {id} = req.params;
    try {
        const rest =await Ordermodel.findById({_id:id}).populate({path:'user', select:['name', 'email']}).populate({path:'restaurant', select:['name', 'address']});
        res.send(rest);
    } catch (err) {
        res.send("unable to find details");
        console.log(err);
    }
});

orderRoute.patch("/orders/:id", async(req,res)=>{
    const {id} = req.params;
    const payload= req.body;
    try {
        const rest =await Ordermodel.findByIdAndUpdate({_id:id},payload);
        res.send(rest);
    } catch (err) {
        res.send("unable to find details");
        console.log(err);
    }
});




module.exports= {
    orderRoute
}