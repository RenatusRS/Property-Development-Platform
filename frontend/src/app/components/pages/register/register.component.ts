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
	
	photo: File = null;

	ngOnInit(): void {
	}
	
	onFileSelected(event) {
		this.photo = event.target.files[0];
	}

	submit() {
		const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{7,12}$/;
		const phoneRegex = /^\d{10}$/;
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		
		if (this.password != this.confirmPassword) {
			this.info.open("Passwords do not match.", "OK");
			return;
		}
		
		if (!passwordRegex.test(this.password)) {
			this.info.open("Password must be at least 7 characters long, at most 12 characters long, contain at least one capital letter, one number, one special symbol, and begin with a letter.", "OK");
			return;
		}
		
		if (!phoneRegex.test(this.phone)) {
			this.info.open("Phone number must be 10 digits long.", "OK");
			return;
		}
		
		if (!emailRegex.test(this.email)) {
			this.info.open("Email must be valid.", "OK");
			return;
		}
		
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
		
		
		let acceptedTypes = ["image/png", "image/jpeg"];
		if (this.photo && !acceptedTypes.includes(this.photo.type)) {
			this.info.open("Accepted image types are png, jpeg.", "OK");
			return;
		}
		
		if (this.photo) {
			
			let reader = new FileReader();
			reader.onload = (e) => {
				let image = new Image();
				image.src = e.target.result as string;
				image.onload = () => {
					let width = image.width;
					let height = image.height;
					
					if (width < 100 || height < 100 || width > 300 || height > 300 || width != height) {
						this.info.open("Image must be square and between 100x100 and 300x300 pixels.", "OK");
						return;
					}
					
					const userWithPhoto = {
						...user,
						photo: reader.result.toString()
					}
					
					this.service.register(userWithPhoto).subscribe({
						next: (message: string) => {
							this.info.open(message, "OK");
							this.router.navigate(['home']);
						},
						error: (error) => {
							this.info.open(error.error.message, "OK");
						}
					});
				}
			}
			
			reader.readAsDataURL(this.photo);
		} else {
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
	}

	togglePasswordVisibility() {
		this.showPassword = !this.showPassword;
	}

	toggleConfirmPasswordVisibility() {
		this.showConfirmPassword = !this.showConfirmPassword;
	}

}
