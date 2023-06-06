const express= require("express");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");
const {Usermodel}= require("../models/user_model");
const {authenticate} = require("../middleware/authentication");
const userRoute= express.Router();

userRoute.post("/register", async(req,res)=>{
    const {name,email,password,dob,bio,posts,friends,friendRequests} = req.body;
        try {
            bcrypt.hash(password,5,async(err,hash)=>{
                const user = new Usermodel({name,email,password:hash,dob,bio,posts,friends,friendRequests});
                await user.save();
                res.send({"msg":"User Signup Successfully"});
            })
        } catch (err) {
            res.status(404).send("Unable to register user");
            console.log(err);
        }
});

userRoute.post("/login", async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await Usermodel.find({email});
        if(user.length>0){
            bcrypt.compare(password, user[0].password,(err,result)=>{
                if(result){
                    const token= jwt.sign({userid:user._id},"masai",{expiresIn:"1d"});
                    res.send({"msg":"Login Successful", "token":token});
                }else{
                    res.status(404).send({"msg":"wrong Password"})
                }
            });
        }else{
            res.status(404).send({"msg":"register first"});
        }
    } catch (err) {
        res.status(404).send({"msg":"Unable to login"});
        console.log(err);
    }
});


userRoute.get("/users", async(req,res)=>{
    try {
        let val= await Usermodel.find();
        res.send(val);
    } catch (err) {
        res.status(404).send({"msg":err.message});
        console.log(err)
    }
});



userRoute.get("/users/:id/friends", async(req,res)=>{
    let {id} = req.params;
    try {
        let val= await Usermodel.findById({_id:id}).populate({path:'friends', select:['name', 'email','dob','bio']});
        let frnd= val.friends;
        res.send(frnd);
    } catch (err) {
        res.status(404).send({"msg":err.message});
        console.log(err)
    }
});

userRoute.post("/users/:id/friends",authenticate, async(req,res)=>{
    let {id} = req.params;
    let {friendid}= req.body;
    try {
        let val= await Usermodel.findById({_id:id});
        val.friendRequests.push(friendid);
        let newval= await Usermodel.findByIdAndUpdate({_id:id},val);
        res.send("friend request send")
    } catch (err) {
        res.status(404).send({"msg":err.message});
        console.log(err)
    }
});

userRoute.patch("/users/:id/friends/:friendId",authenticate, async(req,res)=>{
    let {id} = req.params;
    let {friendId}= req.params;
    let {accept}= req.body;
    try {
        await Usermodel.updateOne({ _id: id }, { $pull: { friendRequests: friendId  } });
        if(accept){
            await Usermodel.updateOne({ _id: id }, { $push: { friends: friendId } });
            res.send("friend request accepted"); 
        }else{
            res.send("friend request rejected");
        }
    } catch (err) {
        res.status(404).send({"msg":err.message});
        console.log(err)
    }
});



module.exports={
    userRoute
}