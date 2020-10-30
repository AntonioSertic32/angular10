import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/internal/operators';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OmdbService {
  private apiURL = 'http://www.omdbapi.com/?apikey=a6623360&';
  public message: string = 'Uninitialized';
  public response;

  constructor(private httpClient: HttpClient, private router: Router) {}

  public async getMovies(title) {
    this.response = await this.httpClient
      .get<any>(this.apiURL + 's=' + title)
      .pipe(delay(500))
      .subscribe(
        (data) => {
          localStorage.setItem('MOVIES', JSON.stringify(data));
        },
        (err) => {
          console.log(err);
        }
      );
  }

  public async getMovie(title, year) {
    this.response = await this.httpClient
      .get<any>(this.apiURL + 't=' + title + '&y=' + year)
      .pipe(delay(500))
      .subscribe(
        (data) => {
          localStorage.setItem('MOVIE', JSON.stringify(data));
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
