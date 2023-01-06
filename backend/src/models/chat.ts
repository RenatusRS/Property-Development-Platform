import { Schema, model } from "mongoose";

const Chat = new Schema({
	sender: { type: String },
	reciever: { type: String },
	time: { type: Date, default: new Date() },
	workshop: { type: String },
	message: { type: String },
});

export default model('ChatModel', Chat, 'chats');