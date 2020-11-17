import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../movie.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css'],
})
export class MyListComponent implements OnInit {
  constructor(private movieService: MovieService) {}

  public FilmList: any = [];
  public UserInfo: any = [];

  ngOnInit(): void {
    this.UserInfo = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
    this.refreshFilmList(this.UserInfo.userID);
  }

  refreshFilmList(userId) {
    this.movieService.getUserMovies(userId).then((value) => {
      this.FilmList = value;
    });
  }
}
