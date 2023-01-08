import { Request, Response } from 'express';
import AttendanceModel from '../models/attendance';
import WorkshopModel from '../models/workshop';

export class OrganizatorController {
    attendanceRequest = async (req: Request, res: Response) => {
        const { username, workshop, status } = req.body

        await AttendanceModel.updateOne({ username: username, workshop: workshop }, { status: status });

        res.status(200).json({ message: 'Attendance updated' });
    }

    getAttendanceRequests = async (req: Request, res: Response) => {
        const attendances = await AttendanceModel.find({ status: req.query.status });
        
        res.status(200).json(attendances);
    }

    createWorkshop = async (req: Request, res: Response) => {
        await (new WorkshopModel(req.body)).save();

        res.status(200).json({ message: 'Workshop created' });
    }

    updateWorkshop = async (req: Request, res: Response) => {
        const { _id, name, date, location, short_description, description, capacity } = req.body

        await WorkshopModel.updateOne({ _id: _id }, { name: name, date: date, location: location, short_description: short_description, description: description, capacity: capacity });

        res.status(200).json({ message: 'Workshop updated' });
    }

    deleteWorkshop = async (req: Request, res: Response) => {
        const { _id } = req.body

        await WorkshopModel.deleteOne({ _id: _id });

        res.status(200).json({ message: 'Workshop deleted' });
    }

    //getWorkshopJSON = async (req: Request, res: Response) => {
    //    const { _id } = req.body
    //
    //    const workshop = await WorkshopModel.findOne({ _id: _id });
    //    
    //    res.status(200).json(workshop);
    //}


}