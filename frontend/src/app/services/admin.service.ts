import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from 'src/consts';
import { User } from '../models/user';
import { Workshop } from '../models/workshop';
import { Service } from './service';

@Injectable({
	providedIn: 'root'
})
export class AdminService extends Service {
	protected controller = 'admin'

	constructor(http: HttpClient) {
		super(http)
	}

	removeUser(username: string): Observable<string> {
		return this.remove(Table.User, { username });
	}

	removeWorkshop(id: string): Observable<String> {
		return this.remove(Table.Workshop, { id });
	}

	getUsers(): Observable<User[]> {
		return this.find(Table.User);
	}

	getWorkshops(): Observable<Workshop[]> {
		return this.find(Table.Workshop);
	}

	updateUser(user: User): Observable<string> {
		return this.update(Table.User, user, { username: user.username });
	}

	updateWorkshop(workshop: Workshop): Observable<string> {
		return this.update(Table.Workshop, workshop, { id: workshop.id });
	}

	insertUser(user: User): Observable<User> {
		return this.insert(Table.User, user);
	}

	insertWorkshop(workshop: Workshop): Observable<Workshop> {
		return this.insert(Table.Workshop, workshop);
	}
}
