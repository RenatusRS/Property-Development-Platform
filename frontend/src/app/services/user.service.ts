import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from './service';

@Injectable({
	providedIn: 'root'
})
export class UserService extends Service{

	constructor(http: HttpClient) {
		super(http)
	}

	login(username, password) {
		return this.post(`users/login`, {
			username: username,
			password: password
		})
	}

	register(firstname, lastname, username, password, phone, email, role) {
		return this.post(`users/register`, {
			firstname: firstname,
			lastname: lastname,
			username: username,
			password: password,
			phone: phone,
			email: email,
			role: role
		})
	}
}
