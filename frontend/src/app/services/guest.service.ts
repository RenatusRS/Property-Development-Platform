import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

	register(firstname, lastname, username, password, phone, email, role, organization, address, identification) {
		return this.post(`register`, {
			firstname: firstname,
			lastname: lastname,
			username: username,
			password: password,
			phone: phone,
			email: email,
			role: role,
			organization: organization,
			address: address,
			identification: identification
		})
	}
}
