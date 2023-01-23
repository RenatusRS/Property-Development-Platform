import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Workshop } from 'src/app/models/workshop';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	constructor(private router: Router, private route: ActivatedRoute, private service: UserService, private info: MatSnackBar, private ref: ChangeDetectorRef) { }

	user: User = new User("Loading...", "Loading...", "Loading...", "Loading...", "Loading...", "Loading...", "Loading...", "Loading...", "Loading...", "Loading...");

	likes: Workshop[] = [];
	comments: Workshop[] = [];
	workshops: Workshop[] = [];
	chat: Workshop[] = [];

	ngOnInit(): void {
		const user = this.route.snapshot.paramMap.get('id');

		this.service.getUser(user).subscribe({
			next: (user: User[]) => {
				this.user = user[0];
				console.log(this.user);
			},
			error: (error) => {
				this.info.open(error.error, "OK");
				this.router.navigate(['home']);
			},
		});

		this.service.getCommentsForUser(user).subscribe({
			next: (comments: Workshop[]) => {
				this.comments = comments;
			}
		});

		this.service.getLikesForUser(user).subscribe({
			next: (likes: Workshop[]) => {
				this.likes = likes;
			}
		});

		if (user == this.service.user.username || this.service.user.role == "Admin") {
			this.service.getChatForUser(user).subscribe({
				next: (chat: Workshop[]) => {
					this.chat = chat;
				}
			});
		}
	}

}
