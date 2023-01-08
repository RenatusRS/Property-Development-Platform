import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from './service';

@Injectable({
	providedIn: 'root'
})
export class AdminService extends Service {
	protected controller = 'admin'

	constructor(http: HttpClient) {
		super(http)
	}

	getRegistrationRequests(status: string) {
		return this.get(`getRegistrationRequests?status=${status}`)
	}

	getWorkshopRequests(status: string) {
		return this.get(`getWorkshopRequests?status=${status}`)
	}

}
