import { Component, OnInit } from '@angular/core';
import { Attendance } from 'src/app/models/attendance';
import { User } from 'src/app/models/user';
import { Workshop } from 'src/app/models/workshop';
import { AdminService } from 'src/app/services/admin.service';
import { OrganizatorService } from 'src/app/services/organizator.service';

@Component({
	selector: 'app-requests',
	templateUrl: './requests.component.html',
	styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

	constructor(private adminService: AdminService, private organizatorService: OrganizatorService) { }

	attendance: Attendance[];

	workshops: Workshop[];
	registrations: User[];

	user: User;

	resultsLength = 0;

	displayedColumns: string[] = ['firstname', 'lastname', 'username', 'status'];

	ngOnInit(): void {
		this.user = JSON.parse(localStorage.getItem("user"));

		this.organizatorService.getAttendanceRequests('pending').subscribe({
			next: (attendance: Attendance[]) => {
				this.attendance = attendance;
				console.log(this.attendance);
			},
		});

		if (this.user.role == "admin") {
			this.adminService.getWorkshopRequests('pending').subscribe({
				next: (workshops: Workshop[]) => {
					this.workshops = workshops;
					console.log(this.workshops);
				},
			});

			this.adminService.getRegistrationRequests('pending').subscribe({
				next: (registrations: User[]) => {
					this.registrations = registrations;
					console.log(this.registrations);
				},
			});
		}
	}



}
