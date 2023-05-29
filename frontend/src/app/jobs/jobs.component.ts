import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Building, Offer } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
	constructor(private service: UserService, private snackBar: MatSnackBar) { }
	
	displayedColumns: string[] = ['client', 'agency', 'address', 'status', 'start', 'end'];

	offers: Offer[] = [];
	offersDetail: { client: string, address: string, status: string }[] = [];
	dataSource: MatTableDataSource<Offer>;

	ngOnInit(): void {
		const user = this.service.user;
		
		const filter = user.role == "Admin" ? {} : user.role == "Client" ? { client: user.username } : { agency: user.username };
		
		this.service.getObjects(filter).subscribe({
			next: (objects: Building[]) => {
				console.log(objects)
				objects.forEach(object => {
					object.offers.forEach(offer => {
						this.offers.push(offer);
						
						const status = object.status == "Pending" ? "Rejected" : object.status;
						
						this.offersDetail.push({ client: object.client, address: object.address, status: status });
					});
				});
			
				this.dataSource = new MatTableDataSource(this.offers);
			}
		});
	}
	
	profile(username: string) {
		window.open(`user/${username}`, "_blank");
	}
	
	job(i: string = "") {
		window.open(`job/${i}`, "_blank");
	}
}
