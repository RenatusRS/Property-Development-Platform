import { Request, Response } from 'express';
import { getTable } from '../consts';

export class DataController {
	find = async (req: Request, res: Response) => {
		const { table, id } = req.body;

		const data = await getTable(table).find(id);

		res.status(200).json(data);
	}

	update = async (req: Request, res: Response) => {
		const { table, id, data } = req.body;

		await getTable(table).updateMany(id, data, { upsert: true });

		res.status(200).json('Updated');
	}

	remove = async (req: Request, res: Response) => {
		const { table, id } = req.body;

		await getTable(table).deleteMany(id);

		res.status(200).json('Deleted');
	}

}