import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'app-manage-users',
	templateUrl: './manage-users.component.html',
	styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
	@Input('requestFilter') requestFilter: boolean;
	@Input('displayedColumns') displayedColumns: string[];
	@Input('search') search: boolean;
	
	constructor(private service: UserService, private snackBar: MatSnackBar) { }

	users: any[];
	fUsers: any[];

	dataSource: MatTableDataSource<User>;
	
	request: string = '---';
	searchName: string = '';
	searchAddress: string = '';

	ngOnInit(): void {
		this.service.getUsers().subscribe({
			next: (users: any[]) => {
				if (this.search) {
					users = users.filter(user => user.role == "Agency");
				}
				
				for (let i = 0; i < users.length; i++) {
					users[i].photo = "http://localhost:4000/uploads/user/" + users[i].username + ".jpeg";
				}
				
				this.users = users;
				this.fUsers = users;

				this.dataSource = new MatTableDataSource(this.users);
			}
		});
	}
	
	imageError(i: number) {
		if (this.fUsers[i].photo == "http://localhost:4000/uploads/user/" + this.fUsers[i].username + ".jpeg") {
			this.fUsers[i].photo = "http://localhost:4000/uploads/user/" + this.fUsers[i].username + ".png";
		} else if (this.fUsers[i].photo == "http://localhost:4000/uploads/user/" + this.fUsers[i].username + ".png") {
			this.fUsers[i].photo = "http://localhost:4000/uploads/default.png";
		}
	}
	
	sortData(sort: Sort) {
		const data = this.fUsers.slice();
		
		if (!sort.active || sort.direction === '') {
			this.fUsers = data;
			return;
		}
		
		this.fUsers = data.sort((a, b) => {
			const isAsc = sort.direction === 'asc';
			switch (sort.active) {
				case 'username': return compare(a.username, b.username, isAsc);
				case 'password': return compare(a.password, b.password, isAsc);
				case 'phone': return compare(a.phone, b.phone, isAsc);
				case 'email': return compare(a.email, b.email, isAsc);
				case 'role': return compare(a.role, b.role, isAsc);
				case 'status': return compare(a.status, b.status, isAsc);
				case 'requested_workers': return compare(a.requested_workers, b.requested_workers, isAsc);
				case 'allowed_workers': return compare(a.allowed_workers, b.allowed_workers, isAsc);
				case 'name': return compare(a.name, b.name, isAsc);
				case 'address': return compare(a.address, b.address, isAsc);
				case 'identification': return compare(a.identification, b.identification, isAsc);
				case 'description': return compare(a.description, b.description, isAsc);
				default: return 0;
			}
		});
		
		function compare(a: number | string, b: number | string, isAsc: boolean) {
			return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
		}
	}
	
	applyFilter() {
		this.fUsers = this.users.slice();
		
		console.log(this.request);
		console.log(this.searchName);
		console.log(this.searchAddress);
		
		console.log(this.fUsers)
		
		if (this.request == "registration") {
			this.fUsers = this.fUsers.filter(user => user.status == "Pending");
		} else if (this.request == "worker") {
			this.fUsers = this.fUsers.filter(user => user.requested_workers > user.allowed_workers);
		}
		
		if (this.searchName != '') {
			this.fUsers = this.fUsers.filter(user => user.name.toLowerCase().includes(this.searchName.toLowerCase()));
		}
		
		if (this.searchAddress != '') {
			this.fUsers = this.fUsers.filter(user => user.address.toLowerCase().includes(this.searchAddress.toLowerCase()));
		}
		
		this.dataSource = new MatTableDataSource(this.fUsers);
	}
	
	profile(i: number) {
		if (this.fUsers[i].username == null) return;
		
		window.open(`user/${this.fUsers[i].username}`, "_blank");
	}
}
