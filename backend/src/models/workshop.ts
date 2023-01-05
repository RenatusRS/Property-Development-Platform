import { Schema, model } from "mongoose";

const Workshop = new Schema({
	name: { type: String },
	date: { type: Date },
	location: { type: String },
	
	short_description: { type: String },
	description: { type: String },
	capacity: { type: Number },
	owner: { type: String },
	
	status: { type: String, default: 'pending' },
});

export default model('WorkshopModel', Workshop, 'workshops');