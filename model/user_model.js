const mongoose = require("mongoose");

const userSchema= mongoose.Schema({
    name:String,
    email:String,
    password:String
});

const Usermodel= mongoose.model('User',userSchema);

module.exports={
    Usermodel
}