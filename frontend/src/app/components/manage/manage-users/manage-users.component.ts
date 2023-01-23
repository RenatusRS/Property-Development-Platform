import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { Table } from 'src/consts';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';

@Component({
	selector: 'app-manage-users',
	templateUrl: './manage-users.component.html',
	styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

	constructor(private service: AdminService, private snackBar: MatSnackBar) { }

	users: User[];

	dataSource: UserDataSource;

	displayedColumns: string[] = ['username', 'password', 'firstname', 'lastname', 'phone', 'email', 'role', 'organization', 'address', 'identification', 'status', 'actions'];

	ngOnInit(): void {
		this.service.getUsers().subscribe({
			next: (users: User[]) => {
				this.users = users;

				this.dataSource = new UserDataSource(this.users);
			}
		});
	}

	update(i: number) {
		if (this.users[i].username == null) return;

		this.service.updateUser(this.users[i]).subscribe({
			next: (response: string) => {
				this.snackBar.open(response, 'OK');
			},
			error: (error: any) => {
				this.snackBar.open(error.error, 'OK');
			}
		});
	}

	remove(i: number) {
		this.service.removeUser(this.users[i].username).subscribe({
			next: (response: any) => {
				this.snackBar.open(response, 'OK');
				this.ngOnInit()
			},
			error: (error: any) => {
				this.snackBar.open(error.error, 'OK');
			}
		});
	}
}

class UserDataSource extends DataSource<User> {
	private _dataStream = new ReplaySubject<User[]>();

	constructor(initialData: User[]) {
		super();
		this.setData(initialData);
	}

	connect(): Observable<User[]> {
		return this._dataStream;
	}

	disconnect() { }

	setData(data: User[]) {
		this._dataStream.next(data);
	}
}