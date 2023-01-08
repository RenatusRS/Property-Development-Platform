import { Schema, model } from "mongoose";

const User = new Schema({
	firstname: { type: String },
	lastname: { type: String },
	username: { type: String },
	password: { type: String },
	phone: { type: String },
	email: { type: String },
	role: { type: String },

	organization: { type: String },
	address: { type: String },
	identification: { type: String },
	
	status: { type: String, default: 'pending' },
});

export default model('UserModel', User, 'users');