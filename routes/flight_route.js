const {Flightmodel}= require("../model/flight_model");
const express= require("express");
const flightRoute= express.Router();



flightRoute.post("/flights", async(req,res)=>{
    const {airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price}=req.body;
    try {
        const flight= new Flightmodel({airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price});
          await flight.save();
          res.send("flight added successfilly")
    } catch (err) {
        res.send("unable to add flight");
        console.log(err);
    }
});

flightRoute.get("/flights", async(req,res)=>{

    try {
        const flight= await Flightmodel.find();
        res.send(flight);
    } catch (err) {
        res.send({"msg":"unable to find flight","Err":err.message});
          console.log(err);
    }
});


flightRoute.get("/flights/:id", async(req,res)=>{
const {id}= req.params;
    try {
        const flight= await Flightmodel.findById({_id:id});
        res.send(flight);
    } catch (err) {
        res.send({"msg":"unable to find flight","Err":err.message});
          console.log(err);
    }
});

flightRoute.patch("/flights/:id", async(req,res)=>{
    const {id}= req.params;
    const payload= req.body;
        try {
             await Flightmodel.findByIdAndUpdate({_id:id},payload);
            res.send("flight updated successfully");
        } catch (err) {
            res.send({"msg":"unable to update flight","Err":err.message});
              console.log(err);
        }
    });

    flightRoute.delete("/flights/:id", async(req,res)=>{
        const {id}= req.params;
            try {
                 await Flightmodel.findByIdAndDelete({_id:id});
                res.send(`flight with id ${id} has been deleted`);
            } catch (err) {
                res.send({"msg":"unable to delete flight","Err":err.message});
                  console.log(err);
            }
        });  


   module.exports={
       flightRoute
   }     