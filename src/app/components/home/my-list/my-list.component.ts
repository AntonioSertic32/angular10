import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../movie.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css'],
})
export class MyListComponent implements OnInit {
  constructor(
    private movieService: MovieService,
    private modalService: NgbModal
  ) {}

  public FilmList: any = [];
  public UserInfo: any = [];
  public Movie: any = [];
  public MyRate;

  ngOnInit(): void {
    this.UserInfo = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
    this.refreshFilmList(this.UserInfo.userID);
  }

  refreshFilmList(userId) {
    this.movieService.getUserMovies(userId).then((value) => {
      this.FilmList = value;
    });
  }

  urediRecord(movie) {
    movie.rate = this.MyRate;
    this.movieService.updateRecord(movie);
    location.reload();
  }
  obrisiRecord(recordID) {
    this.movieService.deleteRecord(recordID);
    location.reload();
  }

  /*  -------------------------- Otvaranje modala  */

  closeResult: string;
  open(content, i) {
    this.Movie = this.FilmList[i];
    this.MyRate = this.Movie.rate;

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
