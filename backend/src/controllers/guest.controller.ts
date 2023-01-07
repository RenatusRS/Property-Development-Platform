import { Request, Response } from 'express';
import UserModel from '../models/user';
import WorkshopModel from '../models/workshop';
import ReviewModel from '../models/like';

export class GuestController {
    login = async (req: Request, res: Response) => {
		const { username, password, admin } = req.body;

		const user = await UserModel.findOne({ 'username': username, 'password': password, 'role': admin ? {$eq : 'admin'} : {$ne : 'admin'} });
        console.log(user);
        
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
    
    getWorkshops = async (req: Request, res: Response) => {
        const workshops = await WorkshopModel.find({status: 'active', date: {$gte: new Date()}, name: {$regex: req.body.name, $options: 'i'}, location: {$regex: req.body.location, $options: 'i'}});

        res.status(200).json(workshops);
    }

    getTop5Workshops = async (req: Request, res: Response) => {
        const workshops = await WorkshopModel.find({status: 'active'}).sort({likes: -1}).limit(5); // sort by likes

        res.status(200).json(workshops);
    }

}