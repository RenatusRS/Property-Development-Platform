import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from 'src/consts';
import { Workshop } from '../models/workshop';
import { Service } from './service';

@Injectable({
	providedIn: 'root'
})
export class OrganizatorService extends Service {
	protected controller = 'organizator'

	constructor(http: HttpClient) {
		super(http)
	}

	getMyAttendenceRequests(owner: string): Observable<Workshop[]> {
		return this.get(`getMyAttendanceRequests`, { owner });
	}

	updateAttendence(accept: boolean): Observable<string> {
		return this.post(`updateAttendance`, { accept });
	}

}
