import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from './service';

@Injectable({
	providedIn: 'root'
})
export class OrganizatorService extends Service {
	protected controller = 'organizator'

	constructor(http: HttpClient) {
		super(http)
	}

	getAttendanceRequests(status: string) {
		return this.get(`getAttendanceRequests?status=${status}`)
	}

}
