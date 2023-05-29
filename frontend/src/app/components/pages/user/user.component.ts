import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	constructor(private router: Router, private route: ActivatedRoute, private service: UserService, private info: MatSnackBar, private ref: ChangeDetectorRef) { }

	user: User = new User("Loading...", "Loading...", "Loading...", "Loading...", false, "Loading...", "Loading...", "Loading...", "Loading...", "Loading...", "Loading...");

	logged: User = JSON.parse(localStorage.getItem("user"));
	
	canReview: boolean = true;
	positive: boolean = true;
	comment: string = "";

	ngOnInit(): void {
		const user = this.route.snapshot.paramMap.get('id');

		this.service.getUser(user).subscribe({
			next: (user: User[]) => {
				this.user = user[0];
				
				if (this.user == null) {
					this.info.open("User not found", "OK");
					this.router.navigate(['home']);
				}
				
				// find logged user review
				this.user.ratings.forEach(review => {
					if (review.username == this.logged.username) {
						this.comment = review.comment;
						this.positive = review.positive;
					}
				});
			},
			error: (error) => {
				this.info.open(error.error, "OK");
				this.router.navigate(['home']);
			},
		});
	}
	
	updateUser() {
		this.service.updateUser(this.user).subscribe({
			next: (response: string) => {
				this.info.open(response, 'OK');
			},
			error: (error: any) => {
				this.info.open(error.error, 'OK');
			}
		});
	}
	
	deleteUser() {
		this.service.removeUser(this.user.username).subscribe({
			next: (message: string) => {
				this.info.open(message, "OK");
				this.router.navigate(['home']);
			},
			error: (error) => {
				this.info.open(error.error, "OK");
			},
		});
	}
	
	changePassword() {
		this.router.navigate(['password']);
	}
	
	upsertReview() {
		// remove old review
		this.user.ratings = this.user.ratings.filter(review => review.username != this.logged.username);
		
		// add new review
		this.user.ratings.push({
			username: this.logged.username,
			comment: this.comment,
			positive: this.positive
		});
		
		this.updateUser();
	}
	
	removeReview() {
		this.user.ratings = this.user.ratings.filter(review => review.username != this.logged.username);
		
		this.updateUser();
	}
	
	hire() {
		this.router.navigate(['hire', this.user.username]);
	}

}
