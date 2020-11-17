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
    return new Promise((resolve) => {
      this.response = this.httpClient
        .get<any>(this.apiURL + 's=' + title)
        .subscribe(
          (data) => {
            resolve([data.Search, data.totalResults]);
          },
          (err) => {
            console.log(err);
          }
        );
    });
  }

  public async getMovie(title, year) {
    return new Promise((resolve) => {
      this.response = this.httpClient
        .get<any>(this.apiURL + 't=' + title + '&y=' + year)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            console.log(err);
          }
        );
    });
  }

  public async pagination(title, page) {
    return new Promise((resolve) => {
      this.response = this.httpClient
        .get<any>(this.apiURL + 's=' + title + '&page=' + page)
        .subscribe(
          (data) => {
            resolve([data.Search, data.totalResults]);
          },
          (err) => {
            console.log(err);
          }
        );
    });
  }
}
