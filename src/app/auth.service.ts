import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

import { delay } from 'rxjs/internal/operators';

import { Router } from '@angular/router';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'https://localhost:44358/api';
  public message: string = 'Uninitialized';
  public response;

  constructor(private httpClient: HttpClient, private router: Router) {}

  public async signIn(userData: User) {
    return new Promise((resolve) => {
      this.response = this.httpClient
        .get<any>(
          this.apiURL +
            '/Users/GetUsers/' +
            userData.password +
            '/' +
            userData.email +
            ''
        )
        .subscribe(
          (data) => {
            localStorage.setItem('ACCESS_TOKEN', JSON.stringify(data));
            this.router.navigateByUrl('/home');
          },
          (err) => {
            resolve(err.error.title);
          }
        );
    });
  }

  public isLoggedIn() {
    if (localStorage.getItem('ACCESS_TOKEN') !== null) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
  }

  public async signUp(userData: User) {
    return new Promise((resolve) => {
      this.response = this.httpClient
        .post<any>(this.apiURL + '/Users/PostUsers', {
          firstName: userData.firstName,
          lastName: userData.lastName,
          password: userData.password,
          username: userData.username,
          email: userData.email,
        })
        .subscribe(
          (data) => {
            this.router.navigateByUrl('/login');
          },
          (err) => {
            resolve(err.error.title);
          }
        );
    });
  }
}
