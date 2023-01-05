import { Request, Response } from 'express';
import UserModel from '../models/user';
import WorkshopModel from '../models/workshop';

export class GuestController {
    getWorkshops = async (req: Request, res: Response) => {
        const workshops = await WorkshopModel.find({status: 'active', date: {$gte: new Date()}, name: {$regex: req.body.name, $options: 'i'}, location: {$regex: req.body.location, $options: 'i'}});

        res.status(200).json(workshops);
    }

    getTop5Workshops = async (req: Request, res: Response) => {
        const workshops = await WorkshopModel.find().sort().limit(5); // TODO

        res.status(200).json(workshops);
    }

}