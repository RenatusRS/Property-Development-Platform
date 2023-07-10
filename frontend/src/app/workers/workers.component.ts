import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GuestService } from '../services/guest.service';
import { MatTableDataSource } from '@angular/material/table';
import { User, Worker } from '../models/user';
import { Sort } from '@angular/material/sort';
import { UserService } from '../services/user.service';

@Component({
	selector: 'app-workers',
	templateUrl: './workers.component.html',
	styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {

	constructor(private router: Router, private service: UserService, private info: MatSnackBar, private route: ActivatedRoute) { }
	
	user: User = new User("Loading...", "Loading...", "Loading...", "Loading...", false, "Loading...", "Loading...", "Loading...", "Loading...", "Loading...", "Loading...");

	speciality: string;

	password: string;
	confirmPassword: string;

	phone: string;
	email: string;

	firstName: string;
	lastName: string;
	
	displayedColumns: string[] = ['firstname', 'lastname', 'phone', 'email', 'specialization', 'actions'];
	
	addWorker() {
		if (this.workers.length > this.user.allowed_workers) {
			this.info.open("You have to request more worker positions before adding a new worker", "OK");
			return;
		}
		
		this.workers.push({
			specialization: this.speciality,
			phone: this.phone,
			email: this.email,
			firstname: this.firstName,
			lastname: this.lastName
		});
		
		this.dataSource = new MatTableDataSource(this.workers);
	};
	
	removeWorker(i: number) {
		this.workers.splice(i, 1);
		
		this.dataSource = new MatTableDataSource(this.workers);
	}
	
	saveWorkers() {
			this.service.updateWorkers(this.user.username, this.workers).subscribe({
			next: (response: any) => {
				this.info.open(response, "OK");
			}
		});
	}

	workers: Worker[];

	dataSource: MatTableDataSource<Worker>;

	ngOnInit(): void {
		const user = this.route.snapshot.paramMap.get('id');

		this.service.getUser(user).subscribe({
			next: (user: User[]) => {
				this.user = user[0];
				
				if (this.user == null) {
					this.info.open("User not found", "OK");
					this.router.navigate(['home']);
				}
			},
			error: (error) => {
				this.info.open(error.error, "OK");
				this.router.navigate(['home']);
			},
		});
		
		this.service.getWorkers(user).subscribe({
			next: (workers: Worker[]) => {		
				this.workers = workers;

				this.dataSource = new MatTableDataSource(this.workers);
			}
		});
	}
}
