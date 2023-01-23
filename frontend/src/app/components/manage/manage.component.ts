import { Component } from '@angular/core';
import { User } from 'src/app/models/user';


@Component({
	selector: 'app-manage',
	templateUrl: './manage.component.html',
	styleUrls: ['./manage.component.css']
})
export class ManageComponent {
	constructor() { }

	user: User = JSON.parse(localStorage.getItem('user'));
}