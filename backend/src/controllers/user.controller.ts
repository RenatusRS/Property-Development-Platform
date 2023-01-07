import { Request, Response } from 'express';
import UserModel from '../models/user';
import WorkshopModel from '../models/workshop';
import AttendanceModel from '../models/attendance';
import ChatModel from '../models/chat';
import LikeModel from '../models/like';
import CommentModel from '../models/comment';

export class UserController {
	changePassword = async (req: Request, res: Response) => {
		const { username, password } = req.body

		await UserModel.updateOne({ username: username }, { password: password });

		res.status(200).json({ message: 'Password changed' });
	}

	changeData = async (req: Request, res: Response) => {
		const { username, firstname, lastname, phone, email, address, organization, id } = req.body

		await UserModel.updateOne({ username: username }, { firstname: firstname, lastname: lastname, phone: phone, email: email, address: address, organization: organization, id: id });

		res.status(200).json({ message: 'Data changed' });
	}

	getMyWorkshops = async (req: Request, res: Response) => {
		const { username } = req.body

		const workshops_ids = await AttendanceModel.find({ username: username, status: 'active' });

		const workshops = await WorkshopModel.find({ _id: { $in: workshops_ids.map((workshop) => workshop.workshop) } });

		res.status(200).json(workshops);
	}
	
	sendMessage = async (req: Request, res: Response) => {
		const { sender, reciever, workshop, message } = req.body

		await (new ChatModel({ sender: sender, reciever: reciever, workshop: workshop, message: message })).save();
		
		res.status(200).json({ message: 'Message sent' });
	}
	
	getMessages = async (req: Request, res: Response) => {
		const { sender, reciever, workshop } = req.body

		const messages = await ChatModel.find({ sender: sender, reciever: reciever, workshop: workshop });

		res.status(200).json(messages);
	}
	
	createWorkshop = async (req: Request, res: Response) => {
		await (new WorkshopModel(req.body)).save();
			
		res.status(200).json({ message: 'Workshop created' });
	}
	
	like = async (req: Request, res: Response) => {
		const { username, workshop } = req.body

		await (new LikeModel({ username: username, workshop: workshop })).save();
		
		res.status(200).json({ message: 'Like created' });
	}
	
	unlike = async (req: Request, res: Response) => {
		const { username, workshop } = req.body

		await LikeModel.deleteOne({ username, workshop });
		
		res.status(200).json({ message: 'Like deleted' });
	}
	
	comment = async (req: Request, res: Response) => {
		const { username, workshop, comment } = req.body

		await (new CommentModel({ username: username, workshop: workshop, comment: comment })).save();
		
		res.status(200).json({ message: 'Comment created' });
	}
	
	deleteComment = async (req: Request, res: Response) => {
		const { username, workshop } = req.body

		await CommentModel.deleteOne({ username: username, workshop: workshop });
		
		res.status(200).json({ message: 'Comment deleted' });
	}
	
	signUpWorkshop = async (req: Request, res: Response) => {
		const { username, workshop } = req.body
		
		const work = await WorkshopModel.findOne({ _id: workshop });
		
		const attendance = work.capacity === 0 ? { username: username, workshop: workshop, status: 'waiting'} : { username: username, workshop: workshop, status: 'active'};

		await (new AttendanceModel(attendance)).save();
		
		res.status(200).json({ message: 'Signed up for workshop' });
	}
	
	signOffWorkshop = async (req: Request, res: Response) => {
		const { username, workshop } = req.body

		const work = await WorkshopModel.findOne({ _id: workshop });
		
		if (work.time < new Date()) return res.status(400).json({ message: 'Workshop already started' });
		
		await AttendanceModel.deleteOne({ username: username, workshop: workshop });
		
		res.status(200).json({ message: 'Signed off from workshop' });
	}
	
	getWorkshop = async (req: Request, res: Response) => {
		const { workshop } = req.body

		const workshop_data = await WorkshopModel.findOne({ _id: workshop });
		const comments = await CommentModel.find({ workshop: workshop });
		const likes = await LikeModel.find({ workshop: workshop });
		
		res.status(200).json({ workshop_data, comments, likes });
	}
	
	
}