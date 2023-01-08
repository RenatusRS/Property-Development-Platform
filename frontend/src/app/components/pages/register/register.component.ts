import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { GuestService } from 'src/app/services/guest.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	constructor(private service: GuestService, private router: Router) { }

	firstName: string;
	lastName: string;

	username: string;

	password: string;
	confirmPassword: string;

	phone: string;
	email: string;

	organizator: boolean;
	organization: string;
	address: string;
	identification: { type: string, number: string }[];

	error: string;

	showPassword: boolean = false;
	showConfirmPassword: boolean = false;

	ngOnInit(): void {
	}

	submit() {
		this.service.register(this.firstName, this.lastName, this.username, this.password, this.phone, this.email, this.organizator, this.organization, this.address, this.identification).subscribe({
			next: (message: string) => {
				this.router.navigate(['home']);
			},
			error: (error) => {
				this.error = error.error.message;
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
