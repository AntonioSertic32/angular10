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

  ngOnInit(): void {
    this.refreshFilmList();
  }

  refreshFilmList() {
    this.movieService.getUserMovies(1002).then((value) => {
      this.FilmList = value;
    });
  }
}
