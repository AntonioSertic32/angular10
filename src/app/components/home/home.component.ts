import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { OmdbService } from '../../omdb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private omdbService: OmdbService
  ) {}

  public UserInfo: any = [];
  public Movies: any = [];
  public id = 1;
  searchMovie: string;

  ngOnInit(): void {
    this.UserInfo = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
    console.log(this.UserInfo);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  omdbMovies() {
    console.log(this.searchMovie);
    this.omdbService.getMovies(this.searchMovie);
    setTimeout(() => {
      this.Movies = JSON.parse(localStorage.getItem('MOVIES'));
      this.Movies = this.Movies.Search;
      console.log(this.Movies);
    }, 1000);
  }
}
