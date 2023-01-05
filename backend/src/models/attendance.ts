import { Schema, model } from "mongoose";

const Attendance = new Schema({
	username: { type: String },
	workshop: { type: String },
	status: { type: String, default: 'pending' },
});

export default model('AttendanceModel', Attendance, 'attendances');