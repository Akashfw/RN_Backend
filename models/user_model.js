const mongoose = require("mongoose");

const userSchema= mongoose.Schema({
  name: String,
  email: String,
  password: String,
  dob: Date,
  bio: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post', strictPopulate:false }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', strictPopulate:false }],
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', strictPopulate:false }]
});

const Usermodel = mongoose.model("User",userSchema);

module.exports={
    Usermodel
}