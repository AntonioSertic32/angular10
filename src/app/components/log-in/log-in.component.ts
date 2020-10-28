import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  authForm: FormGroup;
  submitted = false;
  invalid = false;

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      password: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  get f() {
    return this.authForm.controls;
  }

  signIn() {
    this.submitted = true;
    if (this.authForm.invalid) {
      return;
    }

    this.authService.signIn(this.authForm.value);

    setTimeout(() => {
      if (localStorage.getItem('ERROR') == '404') {
        this.invalid = true;
      }
    }, 800);
  }
}
