import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from './service';

@Injectable({
	providedIn: 'root'
})
export class UserService extends Service {
	protected controller = 'user'

	constructor(http: HttpClient) {
		super(http)
	}
}
