import mongoose from "mongoose";

const Review = new mongoose.Schema({
	username: { type: String },
	workshop: { type: String },
	liked: { type: Boolean },
	comment: { type: String },
});

export default mongoose.model('ReviewModel', Review, 'reviews');