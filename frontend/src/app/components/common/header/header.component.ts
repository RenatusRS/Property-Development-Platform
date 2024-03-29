import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { GuestService } from 'src/app/services/guest.service';
import { User } from '../../../models/user';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	constructor(private service: GuestService, private router: Router) {
		this.user = service.user;
		if (this.user) this.image = "http://localhost:4000/uploads/user/" + this.user.username + ".jpeg";

		service.userObservable.subscribe({
			next: (user: User) => {
				this.user = JSON.parse(localStorage.getItem('user'));
			}
		});
	}

	user: User;
	
	image: any = "";
	
	imageError() {
		if (this.image == "http://localhost:4000/uploads/user/" + this.user.username + ".jpeg") {
			this.image = "http://localhost:4000/uploads/user/" + this.user.username + ".png";
		} else if (this.image == "http://localhost:4000/uploads/user/" + this.user.username + ".png") {
			this.image = "http://localhost:4000/uploads/default.png";
		}
	}

	logout() {
		this.service.user = null;

		this.router.navigate(['home']);
	}

	login() {
		this.router.navigate(['login']);
	}

	register() {
		this.router.navigate(['register']);
	}

	manage() {
		this.router.navigate(['manage']);
	}

	profile() {
		this.router.navigate([`user/${this.user.username}`]);
	}

	home() {
		this.router.navigate(['home']);
	}
	
	objects() {
		this.router.navigate(['objects']);
	}
	
	jobs() {
		this.router.navigate(['jobs']);
	}
	
	workers() {
		this.router.navigate([`workers/${this.user.username}`]);
	}
}
