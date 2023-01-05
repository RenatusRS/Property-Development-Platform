import { Request, Response } from 'express';
import AttendanceModel from '../models/attendance';
import WorkshopModel from '../models/workshop';

export class OrganizatorController {
	attendanceRequest = async (req: Request, res: Response) => {
		const { username, workshop, status } = req.body

		await AttendanceModel.updateOne({ username: username, workshop: workshop }, { status: status });

        res.status(200).json({ message: 'Attendance updated' });
	}

    createWorkshop = async (req: Request, res: Response) => {
        await (new WorkshopModel(req.body)).save();

        res.status(200).json({ message: 'Workshop created' });
    }
}