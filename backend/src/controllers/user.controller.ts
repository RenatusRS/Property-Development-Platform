import { Request, Response } from 'express';
import UserModel from '../models/user';

export class UserController {
	login = async (req: Request, res: Response) => {
		try {
			const user = await UserModel.findOne(req.body);

			if (user.status === 'active') res.json(user);
			else res.status(401).json({ message: `User is ${user.status}` });
		} catch (error) {
			res.status(401).json({ message: 'Invalid credentials' });
		}
	}

	register = async (req: Request, res: Response) => {
		const { username } = req.body;

		const user = await UserModel.findOne({ 'username': username });

		if (user) res.status(409).json({ message: 'User already exists' });
		else {
			const newUser = new UserModel(req.body);

			await newUser.save();

			res.status(200).json({ message: 'User registered' });
		}
	}
}