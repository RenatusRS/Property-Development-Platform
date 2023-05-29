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
	
	clientAccept() {
		this.building.status = "Active";
		this.update();
	}
	
	clientPay() {
		this.building.status = "Finished";
		this.update();
	}
	
	update() {
		this.service.upsertObject(this.service.user.username, this.building).subscribe({
			next: (message) => {
				this.info.open(message, "OK");
			}, error: (error) => {
				this.info.open(error.error, "OK");
			}
		});
	}

}
