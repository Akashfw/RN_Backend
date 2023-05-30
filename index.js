const express= require("express");
const app = express();
require('dotenv').config();
app.use(express.json());
const {connection} = require("./config/db");
const {userRoute} = require("./routes/user_route");
const {flightRoute} = require("./routes/flight_route");
const {bookingRoute}= require("./routes/booking_route")
const {authenticate}= require("./middleware/authentication")

app.get("/",(req,res)=>{
    res.send("home page")
});

app.use("/api",userRoute);
app.use(authenticate);

app.use("/api",flightRoute);
app.use("/api",bookingRoute);

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
