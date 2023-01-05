import { Schema, model } from "mongoose";

const Reservation = new Schema({
	username: { type: String },
	workshop: { type: String },
});

export default model('ReservationModel', Reservation, 'reservations');