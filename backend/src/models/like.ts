import { Schema, model } from "mongoose";

const Like = new Schema({
	username: { type: String },
	workshop: { type: String },
});

export default model('LikeModel', Like, 'likes');