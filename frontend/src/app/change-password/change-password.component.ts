import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { GuestService } from '../services/guest.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

	constructor(private router: Router, private route: ActivatedRoute, private service: UserService, private guestService: GuestService, private info: MatSnackBar, private ref: ChangeDetectorRef) { }

	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
	
	showOldPassword: boolean = false;
	showNewPassword: boolean = false;
	showConfirmPassword: boolean = false;
	
	ngOnInit(): void {
	}
	
	submit() {
		const user = JSON.parse(localStorage.getItem('user'));
		
		if (this.newPassword != this.confirmPassword) {
			this.info.open("Passwords do not match.", "OK");
			return;
		}
		
		if (this.oldPassword != user.password) {
			this.info.open("Old password is incorrect.", "OK");
			return;
		}
		
		user.password = this.newPassword;
		
		this.service.updateUser(user).subscribe({
			next: (response: string) => {
				this.info.open(response, 'OK');
				localStorage.clear();
				this.guestService.user = null;
				this.router.navigate(['home']);
			},
			error: (error: any) => {
				this.info.open(error.error, 'OK');
			}
		});
		
	}
	
	toggleOldPasswordVisibility() {
		this.showOldPassword = !this.showOldPassword;
	}
	
	toggleNewPasswordVisibility() {
		this.showNewPassword = !this.showNewPassword;
	}
	
	toggleConfirmPasswordVisibility() {
		this.showConfirmPassword = !this.showConfirmPassword;
	}

}
