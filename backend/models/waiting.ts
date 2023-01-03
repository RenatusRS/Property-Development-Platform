import mongoose from "mongoose";

const Reservation = new mongoose.Schema({
	username: { type: String },
	workshop: { type: String },
});

export default mongoose.model('ReservationModel', Reservation, 'reservations');