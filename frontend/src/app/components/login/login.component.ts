import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(private userService: UserService, private router: Router) { }

  username: string;
  password: string;
  message: string;

  login() {
    this.userService.login(this.username, this.password).subscribe((user: User) => {
      console.log(user)
    })
  }

  register() {
    this.userService.register('firstname', 'lastname', this.username, this.password, 'phone', 'email', 'role').subscribe((user: User) => {
      console.log(user)
    })

  }
}
