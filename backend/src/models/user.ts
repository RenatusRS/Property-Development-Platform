import { Schema, model } from "mongoose";

const Room = new Schema({
	xLU: { type: Number },
	yLU: { type: Number },
	
	xRD: { type: Number },
	yRD: { type: Number },
	
	status: { type: String, default: 'Unfinished' },
	workers: { type: [String] }, // inconsistent warning
});

const Door = new Schema({
	x: { type: Number },
	y: { type: Number },
});

const Scheme = new Schema({
	rooms: { type: [Room] },
	doors: { type: [Door] },
});

const Offer = new Schema({
	agency: { type: String },
	time_start: { type: Date },
	time_end: { type: Date },
});
	
const Building = new Schema({
	address: { type: String }, // unique
	type: { type: String },
	
	scheme: { type: Scheme },
	
	offers: { type: [Offer] },
	status: { type: String, default: 'Pending' },
	payment: { type: Number }
});

const Rating = new Schema({
	username: { type: String }, // unique
	
	stars: { type: Number },
	comment: { type: String },
});

const Worker = new Schema({
	firstname: { type: String },
	lastname: { type: String },
	
	email: { type: String }, // unique
	phone: { type: String },
	
	specialization: { type: String },
});

const User = new Schema({
	username: { type: String }, // unique
	
	password: { type: String },
	
	role: { type: String },
	
	email: { type: String },
	phone: { type: String},
	
	status: { type: String, default: 'Pending' },
	
	// Client
	
	firstname: { type: String },
	lastname: { type: String },
	
	buildings: { type: [Building] },

	// Agency
	
	name: { type: String},
	address: { type: String },
	identification: { type: String },
	description: { type: String },
	
	ratings : { type: [Rating] },
	workers: { type: [Worker] },
	allowed_workers: { type: Number },
	requested_workers: { type: Number },
});

export default model('UserModel', User, 'users');