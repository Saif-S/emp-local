import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  users = [];
  user: any;
  loginSuccess: boolean = false;
  invalidCred: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get login() {
    return this.loginForm.controls
  }

  onSubmit() {
    this.submitted = true
    if (this.loginForm.invalid) {
      return;
    }
    this.users = JSON.parse(localStorage.getItem('Users')) || [];
    this.user = this.users.find(u => u.email === this.loginForm.value.email);
    if (this.user) {
      if (this.loginForm.value.password === this.user.password) {
        this.loginSuccess = true;
        this.userService.setUser(this.user)
        this.router.navigate(['/dashboard'])
      } else {
        this.invalidCred = true;
      }
    } else {
      this.invalidCred = true;
    }
  }

}
