import { Component, Input } from '@angular/core';
import { User } from '../models/user';
import { GuestService } from '../services/user.service';

@Component({
  selector: 'app-login-input',
  templateUrl: './login-input.component.html',
  styleUrls: ['./login-input.component.css']
})
export class LoginInputComponent {
  @Input('admin') admin: boolean;

  constructor(private userService: GuestService) { }

  username: string;
  password: string;
  error: string;

  submit() {
    this.userService.login(this.username, this.password, this.admin).subscribe({
      next: (user: User) => {
        console.log(user);
      },
      error: (error) => {
        this.error = error.error.message;
      }
    });
  }
}
