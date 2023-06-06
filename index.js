const express= require("express");
const app = express();
require('dotenv').config();
const cors = require("cors");
app.use(express.json());
const {connection} = require("./config/db");
const {userRoute} = require("./routes/user_route");
const {postRoute}= require("./routes/post_route");
const {authenticate}= require("./middleware/authentication")

app.use(cors());


app.get("/",(req,res)=>{
    res.send("home page")
});

app.use("/api", userRoute);
app.use(authenticate);
app.use("/api", postRoute);

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connected to DB");
    } catch (err) {
        console.log("unable to connect to DB");
        console.log(err)
    }
    console.log("server running on port 8000");
});