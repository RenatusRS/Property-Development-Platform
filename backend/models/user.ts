import mongoose from "mongoose";

const User = new mongoose.Schema({
	firstname: { type: String },
	lastname: { type: String },
	username: { type: String },
	password: { type: String },
	phone: { type: String },
	email: { type: String },
	role: { type: String },
	
	status: { type: String },
});

export default mongoose.model('UserModel', User, 'users');