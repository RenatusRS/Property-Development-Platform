import { Schema, model } from "mongoose";

const User = new Schema({
	firstname: { type: String, default: 'Unknown' },
	lastname: { type: String, default: 'Unknown' },
	username: { type: String },
	password: { type: String },
	phone: { type: String, default: 'XXX-XXX-XXXX' },
	email: { type: String, default: 'unknown@example.com' },
	role: { type: String, default: 'User' },

	organization: { type: String, default: '' },
	address: { type: String, default: '' },
	identification: { type: String, default: '' },

	status: { type: String, default: 'Pending' },
});

export default model('UserModel', User, 'users');