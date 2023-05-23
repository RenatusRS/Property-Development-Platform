import { Request, Response } from 'express';
import UserModel from '../models/user';

export class UserController {
	changePassword = async (req: Request, res: Response) => {
		const { username, password } = req.body;
		
		await UserModel.updateOne({ 'username': username }, { 'password': password });
		
		res.status(200).json('Password changed');
	}
	
	getUsers = async (req: Request, res: Response) => {
		const { username, role, status } = req.body;
		
		const filter = {};
		
		if (username) filter['username'] = username;
		if (role) filter['role'] = role;
		if (status) filter['status'] = status;
		
		const users = await UserModel.find(filter);
		
		res.status(200).json(users);
	}
	
	updateUser = async (req: Request, res: Response) => {
		const { username } = req.body;
		
		await UserModel.updateOne({ 'username': username }, req.body);
		
		res.status(200).json('User updated');
	}
	
	getObjects = async (req: Request, res: Response) => {
		const { objectAddress, username, status, agency } = req.body;
		
		const filter = {};
		
		if (username) filter['username'] = username;
		
		const users = await UserModel.find(filter);
		
		var objects = users.map(user => user.buildings).flat();
		
		objects = objects.filter(object => {
			if (objectAddress && object.address != objectAddress) return false;
			if (status && object.status != status) return false;
			if (agency) {
				if (object.status == 'Pending') return false;
				if (object.offers[object.offers.length - 1].agency != agency) return false;
			}
			
			return true;
		});
		
		res.status(200).json(objects);
	}
	
	upsertObject = async (req: Request, res: Response) => {
		const { username, object } = req.body;
		
		await UserModel.updateOne({ 'username': username }, { $pull: { 'buildings': { 'address': object.address } } });
		await UserModel.updateOne({ 'username': username }, { $push: { 'buildings': object } });
		
		res.status(200).json('Object upserted');
	}
	
	deleteObject = async (req: Request, res: Response) => {
		const { username, objectAddress } = req.body;
		
		await UserModel.updateOne({ 'username': username }, { $pull: { 'buildings': { 'address': objectAddress } } });
		
		res.status(200).json('Object deleted');
	}
	
	upsertRating = async (req: Request, res: Response) => {
		const { username: agencyUsername, rating } = req.body;
		const { username: clientUsername } = rating;
		
		await UserModel.updateOne({ 'username': agencyUsername }, { $pull: { 'ratings': { 'username': clientUsername } } });
		await UserModel.updateOne({ 'username': agencyUsername }, { $push: { 'ratings': rating } });
		
		res.status(200).json('Rating upserted');
	}
	
	deleteRating = async (req: Request, res: Response) => {
		const { username: agencyUsername, clientUsername } = req.body;
		
		await UserModel.updateOne({ 'username': agencyUsername }, { $pull: { 'ratings': { 'username': clientUsername } } });
		
		res.status(200).json('Rating deleted');
	}
	
	requestAgency = async (req: Request, res: Response) => {
		const { username: clientUsername, agencyUsername, objectAddress, timeStart, timeEnd } = req.body;
		
		const user = await UserModel.findOne({ 'username': clientUsername });
		
		user.buildings.forEach(object => {
			if (object.address == objectAddress) {
				object.status = 'Requested';
				object.offers.push({
					'agency': agencyUsername,
					'timeStart': timeStart,
					'timeEnd': timeEnd,
				});
			}
		});
		
		await user.save();
		
		res.status(200).json('Agency requested');
	}
	
	offerResponse = async (req: Request, res: Response) => {
		const { username: clientUsername, agencyUsername, objectAddress, accepted } = req.body;
		
		const user = await UserModel.findOne({ 'username': clientUsername });
		
		user.buildings.forEach(object => {
			if (object.address == objectAddress) {
				if (accepted) object.status = 'Accepted';
				else {
					object.status = 'Pending';
					object.offers.pop();
				}
			}
		});
		
		await user.save();
		
		res.status(200).json('Offer responded');
	}
	
	getWorkers = async (req: Request, res: Response) => {
		const { username } = req.body;
		
		const user = await UserModel.findOne({ 'username': username });
		
		res.status(200).json(user.workers);
	}
	
	updateWorkers = async (req: Request, res: Response) => {
		const { username, workers } = req.body;
		
		await UserModel.updateOne({ 'username': username }, { 'workers': workers });
		
		res.status(200).json('Workers updated');
	}
	
	requestMoreWorkers = async (req: Request, res: Response) => {
		const { username, workerNumber } = req.body;
		
		await UserModel.updateOne({ 'username': username }, { 'requested_workers': workerNumber });
		
		res.status(200).json('Requested more workers');
	}
	
	jobResponse = async (req: Request, res: Response) => {
		const { username, objectAddress, payment, accepted } = req.body;
	
		const user = await UserModel.findOne({ 'username': username });
		
		user.buildings.forEach(object => {
			if (object.address == objectAddress) {
				if (accepted) {
					object.status = 'Offered';
					object.payment = payment;
				} else object.status = 'Pending';
			}
		});
		
		await user.save();
		
		res.status(200).json('Offer response sent');
	}
		
}