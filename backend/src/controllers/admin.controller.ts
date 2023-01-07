import { Request, Response } from 'express';
import UserModel from '../models/user';
import WorkshopModel from '../models/workshop';
import AttendanceModel from '../models/attendance';

export class AdminController {
	registrationRequest = async (req: Request, res: Response) => {
		const { username, status } = req.body

		await UserModel.updateOne({ username: username }, { status: status });

		res.status(200).json({ message: 'User updated' });
	}
	
	getRegistrationRequests = async (req: Request, res: Response) => {
		const users = await UserModel.find({ status: 'pending' });
		
		res.status(200).json(users);
	}

	workshopRequest = async (req: Request, res: Response) => {
		const { workshop, status, username } = req.body
		
		const user = await UserModel.findOne({ username: username });
		
		const userAttendedWorkshops = await AttendanceModel.find({ username: username, status: 'accepted' });
		
		if (userAttendedWorkshops.length > 0) return res.status(400).json({ message: 'User has active attendences' });
		
		await WorkshopModel.updateOne({workshop: workshop}, {status: status});

		res.status(200).json({ message: 'Workshop updated' });
	}
	
	getWorkshopRequests = async (req: Request, res: Response) => {
		const workshops = await WorkshopModel.find({ status: 'pending' });
		
		res.status(200).json(workshops);
	}
}