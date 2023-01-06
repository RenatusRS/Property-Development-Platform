import { Schema, model } from "mongoose";

const Comment = new Schema({
	username: { type: String },
	workshop: { type: String },
	text: { type: String },
});

export default model('CommentModel', Comment, 'comments');