import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from 'src/consts';
import { User } from '../models/user';
import { Workshop } from '../models/workshop';
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

	getWorkshop(id: string): Observable<Workshop> {
		return this.find(Table.Workshop, { id });
	}

	like(id: string): Observable<string> {
		return this.post(`like`, { workshop: id, username: this.user.username });
	}

	unlike(id: string, username: string = this.user.username): Observable<string> {
		return this.post('unlike', { workshop: id, username: username });
	}

	getLikesForUser(username: string): Observable<Workshop[]> {
		return this.post('getUserLikes', { username });
	}

	getCommentsForUser(username: string): Observable<Workshop[]> {
		return this.post('getUserComments', { username });
	}

	getChatForUser(username: string): Observable<Workshop[]> {
		return this.post('getUserChat', { username });
	}

	getAttendanceForUser(username: string): Observable<Workshop[]> {
		return this.post('getUserAttendances', { username });
	}

	comment(id: string, comment: string): Observable<string> {
		return this.post(`comment`, { workshop: id, comment, username: this.user.username });
	}

	deleteComment(workshop: string, username: string = this.user.username) {
		return this.post('deleteComment', { workshop, username });
	}

	sendMessage(workshop_id: string, message: string, isOrganizator: boolean): Observable<string> {
		return this.post('sendChatMessage', { workshop: workshop_id, message, username: this.user.username, isOrganizator: isOrganizator });
	}

	suggestWorkshop(workshop: Workshop): Observable<string> {
		return this.insert(Table.Workshop, workshop);
	}
}
