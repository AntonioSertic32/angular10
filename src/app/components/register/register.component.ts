import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  regForm: FormGroup;
  submitted = false;
  exist = false;

  ngOnInit(): void {
    this.regForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
    });
  }

  get f() {
    return this.regForm.controls;
  }

  signUp() {
    this.submitted = true;
    if (this.regForm.invalid) {
      return;
    }

    this.authService.signUp(this.regForm.value).then((value) => {
      this.exist = true;
    });
  }
}
