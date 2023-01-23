import { Request, Response } from 'express';
import UserModel from '../models/user';
import WorkshopModel from '../models/workshop';

export class UserController {
	getUserLikes = async (req: Request, res: Response) => {
		const { username } = req.body;

		const likes = await WorkshopModel.find({ likes: username });

		res.status(200).json(likes);
	}

	getUserComments = async (req: Request, res: Response) => {
		const { username } = req.body;

		const comments = await WorkshopModel.find({ comments: { $elemMatch: { username: username } } });

		res.status(200).json(comments);
	}

	getUserAttendances = async (req: Request, res: Response) => {
		const { username } = req.body;

		const attendances = await WorkshopModel.find({ attendances: { $elemMatch: { username: username, status: 'Approved' } } });

		res.status(200).json(attendances);
	}

	sendChatMessage = async (req: Request, res: Response) => {
		const { username, workshop, organizer: isOrganizator, message } = req.body;

		await WorkshopModel.updateOne({ id: workshop }, { $push: { chat: { username: username, message: message, isOrganizator: isOrganizator } } });

		res.status(200).json('Message sent');
	}

	createWorkshop = async (req: Request, res: Response) => {
		await (new WorkshopModel(req.body)).save();

		res.status(200).json('Workshop created');
	}

	like = async (req: Request, res: Response) => {
		const { username, workshop } = req.body

		const currentWorkshop = await WorkshopModel.findOne({ id: workshop });

		const previousWorkshops = await WorkshopModel.find({ attendances: { $elemMatch: { username: username, status: 'Approved' } }, name: currentWorkshop.name });

		if (previousWorkshops.length === 0) return res.status(400).json('User has not been to any workshops with this name');

		await WorkshopModel.updateOne({ id: workshop }, { $addToSet: { likes: username } });

		res.status(200).json('Like created');
	}

	unlike = async (req: Request, res: Response) => {
		const { username, workshop } = req.body

		await WorkshopModel.updateOne({ id: workshop }, { $pull: { likes: username } });

		res.status(200).json('Like deleted');
	}

	comment = async (req: Request, res: Response) => {
		const { username, workshop, comment } = req.body

		const currentWorkshop = await WorkshopModel.findOne({ id: workshop });

		const previousWorkshops = await WorkshopModel.find({ attendances: { $elemMatch: { username: username, status: 'Approved' } }, name: currentWorkshop.name });

		if (previousWorkshops.length === 0) return res.status(400).json('User has not been to any workshops with this name');

		if (await WorkshopModel.findOne({ id: workshop, "comments.username": username }) === null)
			await WorkshopModel.updateOne({ id: workshop }, { $addToSet: { comments: { username: username, text: comment } } });
		else
			await WorkshopModel.updateOne({ id: workshop, "comments.username": username }, { $set: { "comments.$.text": comment } });

		res.status(200).json('Comment created');
	}

	deleteComment = async (req: Request, res: Response) => {
		const { username, workshop } = req.body

		await WorkshopModel.updateOne({ id: workshop }, { $pull: { comments: { username: username } } });

		res.status(200).json('Comment deleted');
	}

	signUpWorkshop = async (req: Request, res: Response) => {
		const { username, workshop } = req.body

		const work = await WorkshopModel.findOne({ id: workshop },);

		var approved = 0;

		work.attendances.forEach((attendance: { status: string; }) => {
			if (attendance.status === 'Approved' || attendance.status === 'Pending') approved++;
		});

		const attendance = approved >= work.capacity ? { username: username, status: 'Waiting' } : { username: username, status: 'Pending' };

		await WorkshopModel.updateOne({ id: workshop }, { $addToSet: { username: username, attendances: attendance } });

		if (await WorkshopModel.findOne({ id: workshop, "attendances.username": username }) === null)
			await WorkshopModel.updateOne({ id: workshop }, { $addToSet: { attendances: { username: username, status: attendance } } });
		else
			await WorkshopModel.updateOne({ id: workshop, "attendances.username": username }, { $set: { "attendances.$.status": attendance } });

		res.status(200).json(attendance.status === 'Pending' ? 'Signed up for workshop, waitig for approval' : 'No more capacity, you are on the waiting list');
	}

	signOffWorkshop = async (req: Request, res: Response) => {
		const { username, workshop } = req.body

		const work = await WorkshopModel.findOne({ id: workshop });

		if (work.time < new Date()) return res.status(400).json('Workshop already started');

		await WorkshopModel.updateOne({ id: workshop }, { $pull: { attendances: { username: username } } });

		res.status(200).json('Signed off from workshop');
	}
}