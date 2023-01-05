import { Request, Response } from 'express';
import UserModel from '../models/user';
import WorkshopModel from '../models/workshop';
import AttendanceModel from '../models/attendance';

export class UserController {
	login = async (req: Request, res: Response) => {
		const { username, password, role } = req.body;

		const user = await UserModel.findOne({ 'username': username, 'password': password, 'role': role === 'admin' ? {$eq : role} : {$ne : role} });

		if (!user) return res.status(404).json({ message: 'User not found' });

		if (user.status !== 'active') return res.status(401).json({ message: `User is ${user.status}` });

		res.status(200).json(user);
	}

	register = async (req: Request, res: Response) => {
		const { username } = req.body

		const user = await UserModel.findOne({ 'username': username });

		if (user) return res.status(409).json({ message: 'User already exists' });

		await (new UserModel(req.body)).save();

		res.status(200).json({ message: 'User registered' });
	}

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