import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { OmdbService } from '../../omdb.service';

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
    private modalService: NgbModal
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

  /*  --------------------------  */

  title = 'appBootstrap';

  closeResult: string;

  open(content, i) {
    this.Movie = this.Movies[i];
    console.log(this.Movie);

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
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
