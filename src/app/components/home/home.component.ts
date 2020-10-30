import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { OmdbService } from '../../omdb.service';
import { MovieService } from '../../movie.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private omdbService: OmdbService,
    private modalService: NgbModal,
    private movieService: MovieService
  ) {}

  public UserInfo: any = [];
  public Movies: any = [];
  public Movie: any = [];
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

  addMovie() {
    /*
    this.movieService.addMovie(
      this.Movie.Title,
      this.Movie.Released,
      this.Movie.Runtime,
      this.Movie.Genre,
      this.Movie.Director,
      this.Movie.Writer,
      this.Movie.Actors,
      this.Movie.Plot,
      this.Movie.Language,
      this.Movie.Awards,
      this.Movie.Poster,
      this.Movie.Metascore,
      this.Movie.imdbRating,
      this.Movie.Production
    );
    setTimeout(() => {
      this.movieService.getMovieId(this.Movie.Title);
      this.movieService.addRecord(this.UserInfo.userID, 8);
    }, 1500);
*/
    this.movieService.getMovieId(this.Movie.Title);
    this.movieService.addRecord(this.UserInfo.userID, 8);
  }

  /*  --------------------------  */

  closeResult: string;

  open(content, i) {
    this.Movie = [];
    console.log(this.Movies[i].Title, this.Movies[i].Year);

    this.omdbService.getMovie(this.Movies[i].Title, this.Movies[i].Year);
    setTimeout(() => {
      this.Movie = JSON.parse(localStorage.getItem('MOVIE'));
      console.log(this.Movie);
    }, 1000);

    this.modalService.open(content, { windowClass: 'my-class' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
