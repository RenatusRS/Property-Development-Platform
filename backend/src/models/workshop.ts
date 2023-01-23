import { Schema, model } from "mongoose";

const Chat = new Schema({
	username: { type: String },
	isOrganizator: { type: Boolean },

	time: { type: Date, default: Date.now },

	message: { type: String },
});

const Comment = new Schema({
	username: { type: String },

	text: { type: String },
});

const Attendance = new Schema({
	username: { type: String },

	status: { type: String, default: 'Pending' },
});

const Workshop = new Schema({
	id: { type: String },

	name: { type: String },
	date: { type: String, default: '2000-01-01 23:59' },
	location: { type: String, default: 'Unknown' },
	short_description: { type: String, default: 'No description provided' },
	description: { type: String, default: 'No description provided.' },
	capacity: { type: Number },

	owner: { type: String, default: 'admin' },

	status: { type: String, default: 'Pending' },

	comments: { type: [Comment] },
	likes: { type: [String] },
	attendances: { type: [Attendance] },
	chats: { type: [Chat] },
});

export default model('WorkshopModel', Workshop, 'workshops');