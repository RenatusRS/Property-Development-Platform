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
	
	fOffers: Offer[] = [];
	fOffersDetail: { client: string, address: string, status: string }[] = [];
	
	dataSource: MatTableDataSource<Offer>;
	
	status: string = 'all';

	ngOnInit(): void {
		const user = this.service.user;
		
		const filter = user.role == "Admin" ? {} : user.role == "Client" ? { client: user.username } : { agency: user.username };
		
		this.service.getObjects(filter).subscribe({
			next: (objects: Building[]) => {
				console.log(objects)
				objects.forEach(object => {
					for (let i = 0; i < object.offers.length; i++) {
						this.offers.push(object.offers[i]);
						this.fOffers.push(object.offers[i]);
						
						const status = object.status == "Pending" || i != object.offers.length - 1 ? "Rejected" : object.status;
						
						this.offersDetail.push({ client: object.client, address: object.address, status: status });
						this.fOffersDetail.push({ client: object.client, address: object.address, status: status });
					}
				});
			
				this.dataSource = new MatTableDataSource(this.fOffers);
			}
		});
	}
	
	applyFilter() {
		this.fOffers = this.offers.slice();
		this.fOffersDetail = this.offersDetail.slice();
		var both : { o: Offer, d: { client: string, address: string, status: string }}[] = [];
		
		for (let i = 0; i < this.fOffers.length; i++) {
			both.push({ o: this.fOffers[i], d: this.fOffersDetail[i] });
		}
		
		if (this.status == "negotiation") {
			both = both.filter(offer => offer.d.status == "Offered" || offer.d.status == "Requested");
		} else if (this.status == "active") {
			both = both.filter(offer => offer.d.status == "Active");
		} else if (this.status == "finished") {
			both = both.filter(offer => offer.d.status == "Finished");
		}
		
		this.fOffers = both.map(offer => offer.o);
		this.fOffersDetail = both.map(offer => offer.d);
		
		this.dataSource = new MatTableDataSource(this.fOffers);
	}
	
	profile(username: string) {
		window.open(`user/${username}`, "_blank");
	}
	
	job(i: string = "") {
		window.open(`job/${i}`, "_blank");
	}
}
