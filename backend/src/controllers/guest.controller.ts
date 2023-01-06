import { Request, Response } from 'express';
import UserModel from '../models/user';
import WorkshopModel from '../models/workshop';
import ReviewModel from '../models/like';

export class GuestController {
    getWorkshops = async (req: Request, res: Response) => {
        const workshops = await WorkshopModel.find({status: 'active', date: {$gte: new Date()}, name: {$regex: req.body.name, $options: 'i'}, location: {$regex: req.body.location, $options: 'i'}});

        res.status(200).json(workshops);
    }

    getTop5WorkshopsByReviewLikes = async (req: Request, res: Response) => {
        const workshops = await WorkshopModel.find({status: 'active'}).sort({likes: -1}).limit(5); // sort by likes

        res.status(200).json(workshops);
    }

}