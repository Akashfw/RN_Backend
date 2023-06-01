const express= require("express");
const restaurantRoute= express.Router();
const {Restaurantmodel}= require("../models/Restaurant_model");

restaurantRoute.post("/restaurants", async(req,res)=>{
    const {_id, name,address,menu} = req.body;
    try {
        const rest= new Restaurantmodel({_id,name,address,menu});
        await rest.save();
        res.send("added rest details")
    } catch (err) {
        res.send("unable to add res details");
        console.log(err);
    }
});

restaurantRoute.get("/restaurants", async(req,res)=>{
    try {
        const rest =await Restaurantmodel.find();
        res.send(rest);
    } catch (err) {
        res.send("unable to find details");
        console.log(err);
    }
});

restaurantRoute.get("/restaurants/:id", async(req,res)=>{
    const {id} = req.params;
    try {
        const rest =await Restaurantmodel.findById({_id:id});
        res.send(rest);
    } catch (err) {
        res.send("unable to find details");
        console.log(err);
    }
});

restaurantRoute.get("/restaurants/:id/menu", async(req,res)=>{
    const {id} = req.params;
    try {
        const rest =await Restaurantmodel.findById({_id:id});
        res.send(rest.menu);
    } catch (err) {
        res.send("unable to find details");
        console.log(err);
    }
});

restaurantRoute.put("/restaurants/:id/menu", async(req,res)=>{
    const {id} = req.params;
    const payload= req.body;
    try {
        const rest =await Restaurantmodel.findById({_id:id});
        rest.menu.push(payload);
         await Restaurantmodel.findByIdAndUpdate({_id:id},rest);
        res.send({"msg":"menu updated"});
    } catch (err) {
        res.send("unable to find details");
        console.log(err);
    }
});


restaurantRoute.delete("/restaurants/:id/menu/:ID", async(req,res)=>{
    const {id,ID} = req.params;
    try {
        await Restaurantmodel.updateOne({_id:id},{"$pull":{"menu":{_id:ID}}},{safe:true, multi:true},function(err,obj){})
        res.send({"msg":"menu updated"});
    } catch (err) {
        res.send("unable to find details");
        console.log(err);
    }
});






module.exports={
    restaurantRoute
}
