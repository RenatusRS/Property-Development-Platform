import { Schema, model } from "mongoose";

const Review = new Schema({
	username: { type: String },
	workshop: { type: String },
	liked: { type: Boolean },
	comment: { type: String },
});

export default model('ReviewModel', Review, 'reviews');