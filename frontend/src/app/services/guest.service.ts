import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Table } from 'src/consts';
import { User } from '../models/user';
import { Service } from './service';

@Injectable({
	providedIn: 'root'
})
export class GuestService extends Service {
	protected controller = 'guest'

	constructor(http: HttpClient) {
		super(http)
	}

	login(username: string, password: string, admin: boolean) {
		return this.post(`login`, {
			username: username,
			password: password,
			admin: admin
		})
	}

	register(user: User) {
		return this.post(`register`, user);
	}
}
