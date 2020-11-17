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
  pages = 1;
  currentPage = 1;
  isDisabledLeft = true;
  isDisabledRight = false;
  totalResults = 0;

  ngOnInit(): void {
    this.UserInfo = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
  }

  // Dohvacanje filmova sa api-a
  async omdbMovies() {
    this.currentPage = 1;

    this.omdbService.getMovies(this.searchMovie).then((value) => {
      this.Movies = value[0];
      this.pages = Math.ceil(parseInt(value[1]) / 10);
      this.totalResults = value[1];
    });
  }

  // Dodavanje odabranog filma
  addMovie() {
    this.movieService.addMovie(this.Movie).then((value) => {
      this.movieService.addRecord(value, this.UserInfo.userID, this.myrate);
    });
  }

  // Pagination

  prevPage() {
    this.currentPage--;
    this.omdbService
      .pagination(this.searchMovie, this.currentPage)
      .then((value) => {
        this.Movies = value[0];
        this.pages = Math.ceil(parseInt(value[1]) / 10);
        this.totalResults = value[1];
      });

    if (this.currentPage == 1) {
      this.isDisabledLeft = true;
    }
    if (this.currentPage != this.pages) {
      this.isDisabledRight = false;
    }
  }

  nextPage() {
    this.currentPage++;
    this.omdbService
      .pagination(this.searchMovie, this.currentPage)
      .then((value) => {
        this.Movies = value[0];
        this.pages = Math.ceil(parseInt(value[1]) / 10);
        this.totalResults = value[1];
      });

    if (this.currentPage > 1) {
      this.isDisabledLeft = false;
    }
    if (this.currentPage == this.pages) {
      this.isDisabledRight = true;
    }
  }

  dohvatiRedniBroj(i) {
    if (this.currentPage == 1) {
      return i + 1;
    } else {
      return this.currentPage * 10 + i - 9;
    }
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
