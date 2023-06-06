const express= require("express");
const {Postmodel}= require("../models/post_model");
const postRoute= express.Router();



postRoute.post("/posts",async(req,res)=>{
    let payload = req.body;
    try {
         let val= new  Postmodel(payload);
         await val.save();
         res.send({"msg":"item posted successfully"});
    } catch (err) {
        res.send({"msg":"unable to post items"});
    }
});

postRoute.get("/posts", async(req,res)=>{
    try {
        let val= await Postmodel.find().populate({path:'user', select:['name']}).populate({path:'comments.user', select:['name', 'email']});
        res.send(val);
    } catch (err) {
        res.status(404).send({"msg":err.message});
        console.log(err)
    }
});

postRoute.patch("/posts/:id", async(req,res)=>{
    let {id}= req.params;
    let { text, image } = req.body;
    try {
        let val= await Postmodel.findOneAndUpdate({_id:id},{text, image})
        res.send("post is updated");
    } catch (err) {
        res.status(404).send({"msg":err.message});
        console.log(err)
    }
});


postRoute.delete("/posts/:id", async(req,res)=>{
    let {id}= req.params;
    try {
        let val= await Postmodel.findOneAndDelete({_id:id})
        res.send("post is Deleted");
    } catch (err) {
        res.status(404).send({"msg":err.message});
        console.log(err)
    }
});

postRoute.post("/posts/:id/like", async(req,res)=>{
    let {id}= req.params;
    let {userid} = req.body;
    try {
    
        
            await Postmodel.updateOne({ _id: id }, { $push: { likes : userid } });
            res.send(`user with id ${userid} has liked your post`);

        
    } catch (err) {
        res.status(404).send({"msg":err.message});
        console.log(err)
    }
});



postRoute.post("/posts/:id/comment", async(req,res)=>{
    let {id}= req.params;
    let payload = req.body;
    try {
        
       await Postmodel.findByIdAndUpdate({ _id: id }, { $push: { comments : payload } });
       res.send(`user with id ${payload.user} has commented your post`);
        
    } catch (err) {
        res.status(404).send({"msg":err.message});
        console.log(err)
    }
});

postRoute.get("/posts/:id", async(req,res)=>{
    let {id}= req.params;
    try {
        
       let val= await Postmodel.findById({ _id: id }).populate({path:'user', select:['name','email']}).populate({path:'comments.user', select:['name', 'email']}).populate({path:'likes', select:['name']});
       res.send(val);
        
    } catch (err) {
        res.status(404).send({"msg":err.message});
        console.log(err)
    }
});
module.exports={
    postRoute
}