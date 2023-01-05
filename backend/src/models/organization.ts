import { Schema, model } from "mongoose";

const Organization = new Schema({
	username: { type: String },
	org: { type: String },
	address: { type: String },
	id: { type: String },
});

export default model('OrganizationModel', Organization, 'organizations');