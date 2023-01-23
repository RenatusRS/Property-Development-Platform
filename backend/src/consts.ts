import UserModel from './models/user';
import WorkshopModel from './models/workshop';
import { Model } from 'mongoose';

const TABLES = {
	"user": UserModel,
	"workshop": WorkshopModel,
}

export function getTable(table: string): Model<any> {
	return TABLES[table];
} 