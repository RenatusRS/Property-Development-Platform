import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { GuestService } from '../../../services/guest.service';

@Component({
	selector: 'app-login-input',
	templateUrl: './login-input.component.html',
	styleUrls: ['./login-input.component.css']
})
export class LoginInputComponent {
	@Input('admin') admin: boolean;

	constructor(private service: GuestService, private router: Router, private info: MatSnackBar) { }

	username: string;
	password: string;

	submit() {
		if (!this.username || this.username == "") {
			this.info.open("Username is required!", "OK");
			return;
		}

		if (!this.password || this.password == "") {
			this.info.open("Password is required!", "OK");
			return;
		}

		this.service.login(this.username, this.password, this.admin).subscribe({
			next: (user: User) => {
				this.service.user = user;

				this.info.open(`Welcome, ${user.username}!`, "OK");

				this.router.navigate(['home']);
			},
			error: (error) => {
				this.info.open(error.error, "OK");
			}
		});
	}
}
