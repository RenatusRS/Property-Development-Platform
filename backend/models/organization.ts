import mongoose from "mongoose";

const Organization = new mongoose.Schema({
	username: { type: String },
	org: { type: String },
	address: { type: String },
	id: { type: String },
});

export default mongoose.model('OrganizationModel', Organization, 'organizations');