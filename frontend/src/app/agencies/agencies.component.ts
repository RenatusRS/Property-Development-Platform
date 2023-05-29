import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-agencies',
  templateUrl: './agencies.component.html',
  styleUrls: ['./agencies.component.css']
})
export class AgenciesComponent implements OnInit {

	constructor(private router: Router, private route: ActivatedRoute, private service: UserService, private info: MatSnackBar, private ref: ChangeDetectorRef) { }

	ngOnInit(): void {
		
	}

}
