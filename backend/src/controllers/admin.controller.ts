import { Request, Response } from 'express';
import UserModel from '../models/user';
import WorkshopModel from '../models/workshop';

export class AdminController {
	registrationRequest = async (req: Request, res: Response) => {
		const { username, status } = req.body

		await UserModel.updateOne({ username: username }, { status: status });

		res.status(200).json({ message: 'User updated' });
	}

	workshopRequest = async (req: Request, res: Response) => {
		const { workshop, status } = req.body

		await WorkshopModel.updateOne({workshop: workshop}, {status: status});

		res.status(200).json({ message: 'Workshop updated' });
	}
}