import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  public UserInfo: any = [];

  // Dohvacanje informacija o logiranom korisniku iz localStorage-a
  ngOnInit(): void {
    this.UserInfo = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
  }

  // Odjava
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
