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

  // PostMovies()
  // PostRecords()

  constructor(private httpClient: HttpClient, private router: Router) {}

  public async addMovie(
    _title,
    _released,
    _runtime,
    _genre,
    _director,
    _writer,
    _actors,
    _plot,
    _language,
    _awards,
    _poster,
    _metascore,
    _imdbRating,
    _production,
    userId
  ) {
    this.response = await this.httpClient
      .post<any>(this.apiURL + '/Movies/PostMovies', {
        title: _title,
        released: _released,
        runtime: _runtime,
        genre: _genre,
        director: _director,
        writer: _writer,
        actors: _actors,
        plot: _plot,
        language: _language,
        awards: _awards,
        poster: _poster,
        metascore: _metascore,
        imdbRating: _imdbRating,
        production: _production,
      })
      .pipe(delay(500))
      .subscribe(
        (data) => {
          console.log('Uspješno dodano!');
          this.getMovies();
          this.getMovieId(_title, userId, 8);
        },
        (err) => {
          console.log('Greška! ' + err);
        }
      );
  }

  public getMovieId(title, userid, rate) {
    console.log('aloo');
    var allMovies = JSON.parse(localStorage.getItem('ALL_MOVIES'));
    allMovies.forEach(function (movie) {
      if (movie.title == title) {
        console.log('Uspjesno dohvacen id dodanog filma');
        //localStorage.setItem('MOVIEID', JSON.stringify(movie.movieID));

        this.addRecord(movie.movieID, userid, rate);
      }
    });
  }

  public async addRecord(movieid, userid, rate) {
    //var id = JSON.parse(localStorage.getItem('MOVIEID'));
    console.log(userid, rate, movieid);
    this.response = await this.httpClient
      .post<any>(this.apiURL + '/Records/PostRecords', {
        rate: rate,
        userid: userid,
        movieid: movieid,
      })
      .pipe(delay(500))
      .subscribe(
        (data) => {
          console.log('Uspješno dodan record!');
        },
        (err) => {
          console.log(err);
        }
      );
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
}
