import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { OrganizatorService } from 'src/app/services/organizator.service';
import { Table } from 'src/consts';
import { GuestService } from 'src/app/services/guest.service';
import { Workshop } from 'src/app/models/workshop';

@Component({
	selector: 'app-manage-attendances',
	templateUrl: './manage-attendances.component.html',
	styleUrls: ['./manage-attendances.component.css']
})
export class ManageAttendancesComponent implements OnInit {

	constructor(private service: OrganizatorService) { }

	workshops: Workshop[];

	displayedColumns: string[] = ['id', 'workshop', 'username'];

	ngOnInit(): void {
		this.service.getMyAttendenceRequests(this.service.user.username).subscribe({
			next: (combined: { attendances: Attendance[], workshops: Workshop[] }) => {
				this.attendances = combined.attendances;
				this.workshops = combined.workshops;
			},
		});
	}

	update(i: number) {
		this.service.updateAttendence(this.attendances[i]).subscribe({
			next: (response: any) => {
			},
		});
	}
}

class AttendanceDataSource extends DataSource<Attendance> {
	private _dataStream = new ReplaySubject<Attendance[]>();

	constructor(initialData: Attendance[]) {
		super();
		this.setData(initialData);
	}

	connect(): Observable<Attendance[]> {
		return this._dataStream;
	}

	disconnect() { }

	setData(data: Attendance[]) {
		this._dataStream.next(data);
	}
}