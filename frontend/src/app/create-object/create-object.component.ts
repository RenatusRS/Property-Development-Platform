import { Component, OnInit } from '@angular/core';
import { Building, Room, Scheme } from '../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-create-object',
	templateUrl: './create-object.component.html',
	styleUrls: ['./create-object.component.css']
})
export class CreateObjectComponent implements OnInit {

	constructor(private http: HttpClient, private service: UserService, private route: ActivatedRoute, private router: Router, private info: MatSnackBar) { }

	building: Building = new Building("", "Apartment");

	ngOnInit(): void {
		const object = this.route.snapshot.paramMap.get('id');
		
		if (!object) return;
		
		const filter = {
			objectAddress: object
		}

		this.service.getObjects(filter).subscribe({
			next: (building: Building[]) => {
				this.building = building[0];
				
				this.building.scheme.rooms.forEach((room, index) => {
					this.building.scheme.rooms[index] = new Room(room.xLU, room.yLU, room.xRD, room.yRD);
				});
			},
			error: (error) => {
				this.info.open(error.error, "OK");
				this.router.navigate(['home']);
			},
		});
	}

	submit() {
		this.service.upsertObject(this.service.user.username, this.building).subscribe({
			next: (message) => {
				this.info.open(message, "OK");
			}, error: (error) => {
				this.info.open(error.error, "OK");
			}
		});
	}
	
	onFileSelected(event) {
		const file: File = event.target.files[0];
		if (!file) return;
		
		const reader = new FileReader();
		
		reader.onload = (e) => {
			const result = e.target.result;
			
			const data = JSON.parse(result.toString());
			
			this.building.address = data['address'];
			this.building.type = data['type'];
			this.building.scheme = data['scheme'];
		}
		
		reader.readAsText(file);
	}
	
	export() {
		const data = JSON.stringify(this.building);
		
		const blob = new Blob([data], { type: 'text/plain' });
		
		const url = window.URL.createObjectURL(blob);
		
		const link = document.createElement('a');
		
		link.href = url;
		link.download = this.building.address + '.json';
		link.click();
		
		window.URL.revokeObjectURL(url);
		link.remove();
	}
	
	clear() {
		this.building.scheme = new Scheme();
	}
	
	delete() {
		this.service.removeObject(this.service.user.username, this.building.address).subscribe({
			next: (message) => {
				this.info.open(message, "OK");
				this.router.navigate(['objects']);
			}, error: (error) => {
				this.info.open(error.error, "OK");
			}
		});
	}
}
