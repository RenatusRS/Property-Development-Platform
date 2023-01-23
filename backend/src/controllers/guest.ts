import { Request, Response } from 'express';
import UserModel from '../models/user';
import WorkshopModel from '../models/workshop';

export class GuestController {
	login = async (req: Request, res: Response) => {
		const { username, password, admin } = req.body;

		const user = await UserModel.findOne({ 'username': username, 'password': password, 'role': admin ? { $eq: 'Admin' } : { $ne: 'Admin' } });
		console.log(user);

		if (!user) return res.status(404).json('User not found');

		if (user.status !== 'Approved') return res.status(401).json(`User is ${user.status}`);

		res.status(200).json(user);
	}

	register = async (req: Request, res: Response) => {
		const { username } = req.body

		const user = await UserModel.findOne({ 'username': username });

		if (user) return res.status(409).json('User already exists');

		await (new UserModel(req.body)).save();

		res.status(200).json('Successful registration, wait for admin approval');
	}

	getWorkshops = async (req: Request, res: Response) => {
		const workshops = await WorkshopModel.find({ status: 'Approved', date: { $gte: new Date() }, name: { $regex: req.body.name, $options: 'i' }, location: { $regex: req.body.location, $options: 'i' } });

		res.status(200).json(workshops);
	}

	getTop5Workshops = async (req: Request, res: Response) => {
		const workshops = await WorkshopModel.find({ status: 'Approved' }).sort({ likes: -1 }).limit(5); // sort by likes

		res.status(200).json(workshops);
	}

}