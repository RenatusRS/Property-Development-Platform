import mongoose from "mongoose";

const Workshop = new mongoose.Schema({
	name: { type: String },
	date: { type: Date },
	location: { type: String },
	
	short_description: { type: String },
	description: { type: String },
	capacity: { type: Number },
	owner: { type: String },
	
	status: { type: String },
});

export default mongoose.model('WorkshopModel', Workshop, 'workshops');