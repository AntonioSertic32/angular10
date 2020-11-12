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
  searchMovie: string;

  // Dohvacanje informacija o logiranom korisniku iz localStorage-a
  ngOnInit(): void {
    this.UserInfo = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
  }

  // Odjava
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  // Dohvacanje filmova sa api-a
  omdbMovies() {
    this.omdbService.getMovies(this.searchMovie);
    setTimeout(() => {
      this.Movies = JSON.parse(localStorage.getItem('MOVIES'));
      this.Movies = this.Movies.Search;
    }, 1000);
  }

  // Dodavanje odabranog filma
  addMovie() {
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
      this.Movie.Production,
      this.UserInfo.userID
    );
  }

  /*  -------------------------- Otvaranje modala  */

  closeResult: string;
  open(content, i) {
    this.Movie = [];

    this.omdbService.getMovie(this.Movies[i].Title, this.Movies[i].Year);
    setTimeout(() => {
      this.Movie = JSON.parse(localStorage.getItem('MOVIE'));
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
