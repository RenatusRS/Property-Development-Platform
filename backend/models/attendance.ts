import mongoose from "mongoose";

const Attendance = new mongoose.Schema({
	username: { type: String },
	workshop: { type: String },
	status: { type: String },
});

export default mongoose.model('AttendanceModel', Attendance, 'attendances');