import { Request, Response } from 'express';
import UserModel from '../models/user';

const fs = require('fs');

export class GuestController {
	login = async (req: Request, res: Response) => {
		const { username, password, admin } = req.body;

		const user = await UserModel.findOne({ 'username': username, 'password': password, 'role': admin ? { $eq: 'Admin' } : { $ne: 'Admin' } });
		console.log(user);

		if (!user) return res.status(404).json('User not found');

		if (user.status !== 'Approved') return res.status(401).json(`User is ${user.status}`);

		res.status(200).json(user);
	}

	register = async (req: Request, res: Response) => {
		const { username, photo } = req.body

		const user = await UserModel.findOne({ 'username': username });

		if (user) return res.status(409).json('User already exists');

		if (photo) {
			let base64Image = photo.split(';base64,').pop();
			
			const type = photo.split(';')[0].split('/')[1];
			
			fs.writeFile(`./uploads/user/${username}.${type}`, base64Image, { encoding: 'base64' }, function(err) {
				if (err) {
					console.log(err);
					return res.status(500).json('Error while saving image');
				} else {
					console.log('File created');
				}
			});
		}
		 
		await (new UserModel(req.body)).save();

		res.status(200).json('Successful registration, wait for admin approval');
	}

}