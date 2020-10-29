import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { User } from '../../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  public UserInfo: any = [];

  ngOnInit(): void {
    this.UserInfo = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
    console.log(this.UserInfo);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
