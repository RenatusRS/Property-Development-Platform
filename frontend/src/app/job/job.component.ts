import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Building, DatePair, Room, Scheme, User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

	constructor(private http: HttpClient, private service: UserService, private route: ActivatedRoute, private router: Router, private info: MatSnackBar) { }

	building: Building = new Building("", "Apartment");
	complete: boolean = false;
	user: User;

	async ngOnInit(): Promise<void> {
		const object = this.route.snapshot.paramMap.get('id');
		this.user = JSON.parse(localStorage.getItem("user"));
		
		if (!object) return;
		
		await this.service.getUser(this.service.user.username).subscribe({
			next: (user: User[]) => {
				this.user = user[0];
				
				if (this.user == null) {
					this.info.open("User not found", "OK");
					this.router.navigate(['home']);
				}
				
				const filter = {
					objectAddress: object
				}
		
				this.service.getObjects(filter).subscribe({
					next: (building: Building[]) => {
						this.building = building[0];
						
						console.log(this.building)
						
						if (this.building.status == 'Active' && this.user.role == 'Client') {
							this.complete = this.building.scheme.rooms.every(room => room.finished);
						}
					},
					error: (error) => {
						this.info.open(error.error, "OK");
						this.router.navigate(['home']);
					},
				});
			},
			error: (error) => {
				this.info.open(error.error, "OK");
				this.router.navigate(['home']);
			},
		});
	}

	agencyAccept() {
		this.building.status = "Offered";
		this.update();
	}
	
	agencyReject() {
		this.building.status = "Pending";
		this.update();
	}
	
	clientAccept() {
		this.building.status = "Active";
		this.update();
	}
	
	clientReject() {
		this.building.status = "Pending";
		this.building.offers.pop();
		this.update();
	}
	
	clientPay() {
		this.building.status = "Finished";
		this.update();
	}
	
	update() {
		console.log(this.building.scheme)
		this.service.upsertObject(this.building.client, this.building).subscribe({
			next: (message) => {
				this.info.open(message, "OK");
			}, error: (error) => {
				this.info.open(error.error, "OK");
			}
		});
	}
	
	canAssign() {
		let available_workers = this.user.workers.length;
		console.log("Available workers", available_workers);
		
		for (let i = 0; i < this.user.assigned_dates.length; i++) {
			const date = this.user.assigned_dates[i];
			
			if (date.start <= this.building.offers[this.building.offers.length - 1].time_start && date.end >= this.building.offers[this.building.offers.length - 1].time_end) {
				available_workers--;
			}
		}
		
		console.log("Can assign", available_workers, this.building.scheme.rooms.length);
		return available_workers >= this.building.scheme.rooms.length;
	}
	
	assign() {
		for (let room of this.building.scheme.rooms) {
			this.user.assigned_dates.push(new DatePair(
				this.building.offers[this.building.offers.length - 1].time_start,
				this.building.offers[this.building.offers.length - 1].time_end
			));
		}
		
		this.building.workers = true;
		
		this.update();
	}

}
