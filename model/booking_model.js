const mongoose = require("mongoose");

const bookingSchema= mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	 flight : { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' }
});


const Bookingmodel= mongoose.model("Booking",bookingSchema);

module.exports={
    Bookingmodel
}