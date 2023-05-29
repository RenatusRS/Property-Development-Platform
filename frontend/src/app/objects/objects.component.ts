import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Building, User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.css']
})
export class ObjectsComponent implements OnInit {
	constructor(private service: UserService, private snackBar: MatSnackBar) { }
	
	displayedColumns: string[] = ['address', 'type', 'rooms', 'area'];

	objects: Building[] = [];
	areas: number[] = [];
	dataSource: MatTableDataSource<Building>;

	ngOnInit(): void {
		const filter = {
			username: this.service.user.username
		}
		
		console.log(filter)
		
		this.service.getObjects(filter).subscribe({
			next: (objects: Building[]) => {
				console.log(objects)
				objects.forEach((object, index) => {
					this.areas[index] = 0;
					
					object.scheme.rooms.forEach(room => {
						this.areas[index] += (room.xRD - room.xLU) * (room.yRD - room.yLU);
					});
				});
				
				this.objects = objects;
				this.dataSource = new MatTableDataSource(objects);
			}
		});
	}
	
	object(i: string = "") {
		window.open(`create/${i}`, "_blank");
	}
}
