import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Building, Room, Scheme, User } from '../models/user';
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

	ngOnInit(): void {
		const object = this.route.snapshot.paramMap.get('id');
		this.user = this.service.user;
		
		if (!object) return;
		
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

}
