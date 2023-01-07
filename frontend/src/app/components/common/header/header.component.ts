import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from '../../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  user: User;
  
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['home']);
  }
  
  login() {
    this.router.navigate(['login']);
  }
}
