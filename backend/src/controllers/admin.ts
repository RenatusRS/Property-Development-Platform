import { Request, Response } from 'express';
import UserModel from '../models/user';
import WorkshopModel from '../models/workshop';

export class AdminController {
	workshopRequest = async (req: Request, res: Response) => {
		const { workshop, status, username } = req.body

		const user = await UserModel.findOne({ username: username });

		//const userAttendedWorkshops = await AttendanceModel.find({ username: username, status: 'Approved' });

		//if (userAttendedWorkshops.length > 0) return res.status(400).json('User has active attendences');

		await WorkshopModel.updateOne({ workshop: workshop }, { status: status });

		res.status(200).json('Workshop updated');
	}
}