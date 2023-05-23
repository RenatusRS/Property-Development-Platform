import UserModel from './models/user';
import { Model } from 'mongoose';

const TABLES = {
	"user": UserModel,
}

export function getTable(table: string): Model<any> {
	return TABLES[table];
} 