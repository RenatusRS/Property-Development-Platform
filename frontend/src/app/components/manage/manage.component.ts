import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { GuestService } from 'src/app/services/guest.service';


@Component({
	selector: 'app-manage',
	templateUrl: './manage.component.html',
	styleUrls: ['./manage.component.css']
})
export class ManageComponent {
	constructor(private service: GuestService, private router: Router, private info: MatSnackBar) { }

	user: User = JSON.parse(localStorage.getItem('user'));
	
	addUser() {
		this.router.navigate(['register']);
	}
}