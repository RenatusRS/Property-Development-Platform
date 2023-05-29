import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Building, Offer } from '../models/user';

@Component({
	selector: 'app-hire',
	templateUrl: './hire.component.html',
	styleUrls: ['./hire.component.css']
})
export class HireComponent implements OnInit {

	constructor(private router: Router, private route: ActivatedRoute, private service: UserService, private info: MatSnackBar, private ref: ChangeDetectorRef) { }

	start = new FormControl(new Date());
	end = new FormControl(new Date());
	min = new Date();
	
	objects: Building[] = [];
	object: string = "";

	ngOnInit(): void {
		console.log(this.service.user.username)
		
		const filter = {
			username: this.service.user.username,
			status: "Pending"
		}
		
		this.service.getObjects(filter).subscribe({
			next: (buildings: Building[]) => {
				this.objects = buildings;
			},
			error: (error) => {
				this.info.open(error.error, "OK");
			}
		});
	}
	
	submit() {
		if (this.object == "") {
			this.info.open("Please select an object", "OK");
			return;
		}
		
		if (this.start.value > this.end.value) {
			this.info.open("The start date must be before the end date", "OK");
			return;
		}
		
		const agency = this.route.snapshot.paramMap.get('id');
		
		const offer: Offer = new Offer(agency, this.start.value, this.end.value);
		
		this.service.requestAgency(this.service.user.username, this.object, offer).subscribe({
			next: (response) => {
				this.info.open(response, "OK");
				this.router.navigate(["/user"]);
			},
			error: (error) => {
				this.info.open(error.error, "OK");
			}
		});	
	}

}
