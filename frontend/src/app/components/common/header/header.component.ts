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

		service.userObservable.subscribe({
			next: (user: User) => {
				this.user = JSON.parse(localStorage.getItem('user'));
			}
		});
	}

	user: User;

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
}
