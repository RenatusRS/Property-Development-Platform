import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { GuestService } from 'src/app/services/guest.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	constructor(private service: GuestService, private router: Router, private info: MatSnackBar) { }

	username: string;

	password: string;
	confirmPassword: string;

	phone: string;
	email: string;
	
	firstName: string;
	lastName: string;

	isAgency: boolean;
	
	agency: string;
	address: string;
	identification: string;
	
	description: string;

	showPassword: boolean = false;
	showConfirmPassword: boolean = false;

	ngOnInit(): void {
	}

	submit() {
		const user: User = new User(
			this.username,
			this.password,
			this.phone,
			this.email,
			this.isAgency,
			this.firstName,
			this.lastName,
			this.agency,
			this.address,
			this.identification,
			this.description
		);

		this.service.register(user).subscribe({
			next: (message: string) => {
				this.info.open(message, "OK");
				this.router.navigate(['home']);
			},
			error: (error) => {
				this.info.open(error.error.message, "OK");
			}
		});
	}

	togglePasswordVisibility() {
		this.showPassword = !this.showPassword;
	}

	toggleConfirmPasswordVisibility() {
		this.showConfirmPassword = !this.showConfirmPassword;
	}

}
