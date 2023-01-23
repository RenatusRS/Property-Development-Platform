import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { Workshop } from 'src/app/models/workshop';
import { Table } from 'src/consts';
import { AdminService } from 'src/app/services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-manage-workshops',
	templateUrl: './manage-workshops.component.html',
	styleUrls: ['./manage-workshops.component.css']
})
export class ManageWorkshopsComponent implements OnInit {

	constructor(private service: AdminService, private snackBar: MatSnackBar) { }

	workshops: Workshop[];

	dataSource: WorkshopDataSource;

	displayedColumns: string[] = ['id', 'name', 'owner', 'date', 'location', 'short_description', 'description', 'capacity', 'status', 'actions'];

	ngOnInit(): void {
		this.service.getWorkshops().subscribe({
			next: (workshops: Workshop[]) => {
				this.workshops = workshops;

				this.dataSource = new WorkshopDataSource(this.workshops);
			},
		});
	}

	update(i: number) {
		this.service.updateWorkshop(this.workshops[i]).subscribe({
			next: (_response: string) => {
				this.ngOnInit();
			},
		});
	}

	remove(i: number) {
		this.service.removeWorkshop(this.workshops[i].id).subscribe({
			next: (response: string) => {
				this.workshops.splice(i, 1);

				this.dataSource.setData(this.workshops);
			},
			error: (error: any) => {
				this.snackBar.open(error.error, 'Close', {
					duration: 2000,
				});
			}
		});
	}
}

class WorkshopDataSource extends DataSource<Workshop> {
	private _dataStream = new ReplaySubject<Workshop[]>();

	constructor(initialData: Workshop[]) {
		super();
		this.setData(initialData);
	}

	connect(): Observable<Workshop[]> {
		return this._dataStream;
	}

	disconnect() { }

	setData(data: Workshop[]) {
		this._dataStream.next(data);
	}
}