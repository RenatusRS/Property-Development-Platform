import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Table } from 'src/consts';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export abstract class Service {
	userObservable = new Subject<User>();

	constructor(private http: HttpClient) { }

	private uri = 'http://localhost:4000'

	protected abstract controller: string;

	protected get(uri: string, data: object, controller: string = this.controller): Observable<any> {
		return this.http.get(`${this.uri}/${controller}/${uri}`, data)
	}

	protected post(uri: string, data: object, controller: string = this.controller): Observable<any> {
		return this.http.post(`${this.uri}/${controller}/${uri}`, data)
	}

	protected remove(table: Table, id: object): Observable<any> {
		return this.post(`remove`, { table, id }, 'data')
	}

	protected insert(table: Table, data: object): Observable<any> {
		return this.post(`insert`, { table, data }, 'data')
	}

	protected update(table: Table, data: any, id: object = {}): Observable<any> {
		return this.post(`update`, { table, id, data }, 'data')
	}

	protected find(table: Table, id: object = {}): Observable<any> {
		return this.post(`find`, { table, id }, 'data')
	}

	set user(user: User) {
		localStorage.setItem('user', JSON.stringify(user));
		this.userObservable.next(user);
	}

	get user(): User {
		return JSON.parse(localStorage.getItem('user'));
	}

}
