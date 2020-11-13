import { Component, OnInit } from '@angular/core';

import { OmdbService } from '../../../omdb.service';
import { MovieService } from '../../../movie.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css'],
})
export class DiscoverComponent implements OnInit {
  constructor(
    private omdbService: OmdbService,
    private modalService: NgbModal,
    private movieService: MovieService
  ) {}

  public UserInfo: any = [];
  public Movies: any = [];
  public Movie: any = [];
  searchMovie: string;
  myrate: string;
  pages: any = [0];

  ngOnInit(): void {
    this.UserInfo = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
  }

  // Dohvacanje filmova sa api-a
  async omdbMovies() {
    this.omdbService.getMovies(this.searchMovie).then((value) => {
      this.Movies = value[0];
      this.pages = Math.ceil(parseInt(value[1]) / 10);
    });
  }

  // Dodavanje odabranog filma
  addMovie() {
    this.movieService.addMovie(this.Movie).then((value) => {
      this.movieService.addRecord(value, this.UserInfo.userID, this.myrate);
    });
  }

  /*  -------------------------- Otvaranje modala  */

  closeResult: string;
  open(content, i) {
    this.Movie = [];

    this.omdbService
      .getMovie(this.Movies[i].Title, this.Movies[i].Year)
      .then((value) => {
        this.Movie = value;
      });

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
