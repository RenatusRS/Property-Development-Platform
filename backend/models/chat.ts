import mongoose from "mongoose";

const Attendance = new mongoose.Schema({
	sender: { type: String },
	reciever: { type: String },
	time: { type: Date },
	workshop: { type: String },
	message: { type: String },
});

export default mongoose.model('AttendanceModel', Attendance, 'attendances');