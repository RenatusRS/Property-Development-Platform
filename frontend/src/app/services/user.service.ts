import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from 'src/consts';
import { Building, Offer, User, Worker } from '../models/user';
import { Service } from './service';

@Injectable({
	providedIn: 'root'
})
export class UserService extends Service {
	protected controller = 'user'

	constructor(http: HttpClient) {
		super(http)
	}

	getUser(username: string): Observable<User[]> {
		return this.find(Table.User, { username });
	}
	
	updateUser(user: User): Observable<string> {
		return this.update(Table.User, user, { username: user.username });
	}
	
	updateImage(photo: string, username: string): Observable<string> {
		return this.post("update-image", { photo, username });	
	}
	
	removeUser(username: string): Observable<string> {
		return this.remove(Table.User, { username });
	}
	
	getUsers(): Observable<User[]> {
		return this.find(Table.User);
	}

	insertUser(user: User): Observable<User> {
		return this.insert(Table.User, user);
	}
	
	getObjects(filter): Observable<Building[]> {
		return this.post("get-objects", filter);
	}
	
	upsertObject(username: string, object: Building): Observable<string> {
		return this.post("upsert-object", { username, object });
	}
	
	removeObject(username: string, objectAddress: string): Observable<string> {
		return this.post("delete-object", { username, objectAddress });
	}
	
	requestAgency(client: string, address: string, offer: Offer): Observable<string> {
		return this.post("request-agency", { client, address, offer });
	}
	
	getWorkers(username: string): Observable<Worker[]> {
		return this.post("get-workers", { username });
	}
	
	updateWorkers(username: string, workers: Worker[]): Observable<string> {
		return this.post("update-workers", { username, workers });
	}
}
