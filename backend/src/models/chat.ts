import { Schema, model } from "mongoose";

const Attendance = new Schema({
	sender: { type: String },
	reciever: { type: String },
	time: { type: Date },
	workshop: { type: String },
	message: { type: String },
});

export default model('AttendanceModel', Attendance, 'attendances');