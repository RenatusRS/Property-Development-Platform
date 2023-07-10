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
	
	canReview: boolean = false;
	positive: boolean = true;
	comment: string = "";
	
	image: any = "";

	ngOnInit(): void {
		const user = this.route.snapshot.paramMap.get('id');

		this.service.getUser(user).subscribe({
			next: (user: User[]) => {
				this.user = user[0];
				this.image = "http://localhost:4000/uploads/user/" + this.user.username + ".jpeg";
				
				if (this.user == null) {
					this.info.open("User not found", "OK");
					this.router.navigate(['home']);
				}
				
				this.canReview = this.logged && this.logged.role == "Client" && this.logged.username != this.user.username;
				
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
	
	imageError() {
		if (this.image == "http://localhost:4000/uploads/user/" + this.user.username + ".jpeg") {
			this.image = "http://localhost:4000/uploads/user/" + this.user.username + ".png";
		} else if (this.image == "http://localhost:4000/uploads/user/" + this.user.username + ".png") {
			this.image = "http://localhost:4000/uploads/default.png";
		}
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
	
	workers() {
		this.router.navigate(['workers', this.user.username]);
	}
	
	onFileSelected(event) {
		let photo = event.target.files[0];
		
		if (!photo) {
			return;
		}
		
		let acceptedTypes = ["image/png", "image/jpeg"];
		if (!acceptedTypes.includes(photo.type)) {
			this.info.open("Accepted image types are png, jpeg.", "OK");
			return;
		}
			
		let reader = new FileReader();
		reader.onload = (e) => {
			let image = new Image();
			image.src = e.target.result as string;
			image.onload = rs => {
				let width = image.width;
				let height = image.height;
				
				if (width < 100 || height < 100 || width > 300 || height > 300 || width != height) {
					this.info.open("Image must be square and between 100x100 and 300x300 pixels.", "OK");
					return;
				}
				
				this.service.updateImage(reader.result.toString(), this.user.username).subscribe({
					next: (response: string) => {
						this.info.open(response, 'OK');
						this.image = "http://localhost:4000/uploads/user/" + this.user.username + "." + photo.type.split("/")[1] + "?" + new Date().getTime();
						this.ref.detectChanges();
					},
					error: (error: any) => {
						this.info.open(error.error, 'OK');
					}
				});
			}
		}
		
		reader.readAsDataURL(photo);
		

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
