import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, concatMap } from 'rxjs/internal/operators';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiURL = 'https://localhost:44358/api';
  public message: string = 'Uninitialized';
  public response;

  constructor(private httpClient: HttpClient, private router: Router) {}

  public async addMovie(Movie) {
    return new Promise((resolve) => {
      this.response = this.httpClient
        .post<any>(this.apiURL + '/Movies/PostMovies', {
          title: Movie.Title,
          released: Movie.Released,
          runtime: Movie.Runtime,
          genre: Movie.Genre,
          director: Movie.Director,
          writer: Movie.Writer,
          actors: Movie.Actors,
          plot: Movie.Plot,
          language: Movie.Language,
          awards: Movie.Awards,
          poster: Movie.Poster,
          metascore: Movie.Metascore,
          imdbRating: Movie.imdbRating,
          production: Movie.Production,
        })
        .subscribe(
          (data) => {
            resolve(data.movieID);
          },
          (err) => {
            console.log(err);
          }
        );
    });
  }

  public async addRecord(movieid, userid, rate) {
    return new Promise((resolve) => {
      this.response = this.httpClient
        .post<any>(this.apiURL + '/Records/PostRecords', {
          rate: rate,
          userid: userid,
          movieid: movieid,
        })
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

  public async getMovies() {
    this.response = await this.httpClient
      .get<any>(this.apiURL + '/Movies/GetMovies')
      .pipe(delay(500))
      .subscribe(
        (data) => {
          localStorage.setItem('ALL_MOVIES', JSON.stringify(data));
          console.log('Dohvaceni svi filmovi!');
        },
        (err) => {
          console.log(err);
        }
      );
  }

  public async getUserMovies(userID) {
    return new Promise((resolve) => {
      this.response = this.httpClient
        .get<any>(this.apiURL + '/Records/GetRecordsByUserId/' + userID)
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
}
