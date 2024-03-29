import { Request, Response } from 'express';
import UserModel from '../models/user';
import user from '../models/user';

const fs = require('fs');

export class UserController {
	getUsers = async (req: Request, res: Response) => {
		const { username, role, status } = req.body;
		
		const filter = {};
		
		if (username) filter['username'] = username;
		if (role) filter['role'] = role;
		if (status) filter['status'] = status;
		
		const users = await UserModel.find(filter);
		
		res.status(200).json(users);
	}
	
	getObjects = async (req: Request, res: Response) => {
		const { objectAddress, username, status, agency } = req.body;
		
		const filter = {};
		
		if (username) filter['username'] = username;
		
		const users = await UserModel.find(filter);
		
		users.forEach(user => {
			user.buildings.forEach(object => {
				object['client'] = user.username;
			});
		});
		
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
	
	requestAgency = async (req: Request, res: Response) => {
		const { client, address, offer } = req.body;
		
		const user = await UserModel.findOne({ 'username': client });
		
		var exists = false;
		user.buildings.forEach(object => {
			console.log(object.address, address)
			if (object.address == address) {
				object.status = 'Requested';
				object.offers.push(offer);
				
				exists = true;
				return; 
			}
		});
		
		if (!exists) {
			res.status(404).json('Object not found');
			return; 
		}
		
		await user.save();
		
		res.status(200).json('Agency requested');
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
	
	updateImage = async (req: Request, res: Response) => {
		const { username, photo } = req.body;
		
		// Delete old image
		
		const type = photo.split(';')[0].split('/')[1];
		
		if (type == 'png') fs.unlink(`./uploads/user/${username}.jpeg`, (err) => {});
		if (type == 'jpeg') fs.unlink(`./uploads/user/${username}.png`, (err) => {});
		
		let base64Image = photo.split(';base64,').pop();
		
		fs.writeFile(`./uploads/user/${username}.${type}`, base64Image, { encoding: 'base64' }, function(err) {
			if (err) {
				console.log(err);
				return res.status(500).json('Error while saving image');
			} else {
				console.log('File created');
			}
		}); 
		
		res.status(200).json('Image updated');
	}
		
		
		
}