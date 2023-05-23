import { Request, Response } from 'express';
import UserModel from '../models/user';

export class AdminController {
	registrationResponse = async (req: Request, res: Response) => {
		const { username, status } = req.body;
		
		await UserModel.updateOne({ 'username': username }, { 'status': status });
		
		res.status(200).json('Account status changed');
	}
	
	getWorkerRequests = async (req: Request, res: Response) => {
		const users = await UserModel.find({ 'requested_workers': { $gt: 0 } });
		
		res.status(200).json(users);
	}
	
	workerRequestResponse = async (req: Request, res: Response) => {
		const { username, status } = req.body;
		
		const user = await UserModel.findOne({ 'username': username });
		
		if (status) user.allowed_workers += user.requested_workers;
		
		user.requested_workers = 0;
		
		await user.save();
		
		res.status(200).json('Worker request response sent');
	}
}