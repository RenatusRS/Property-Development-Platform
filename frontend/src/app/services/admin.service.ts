import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from 'src/consts';
import { User } from '../models/user';
import { Service } from './service';

@Injectable({
	providedIn: 'root'
})
export class AdminService extends Service {
	protected controller = 'admin'

	constructor(http: HttpClient) {
		super(http)
	}
}
