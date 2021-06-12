import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loggedUser: any;
  registerForm: FormGroup;
  submitted: boolean = false;
  readOnly: boolean = true;
  users = [];
  user: any;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loggedUser = this.userService.getUser();
    if(this.loggedUser == undefined || null || ''){
      this.router.navigate(['/login'])
    }


    this.registerForm = this.formBuilder.group({
      firstName: [this.loggedUser.firstName, Validators.required],
      lastName: [this.loggedUser.lastName, Validators.required],
      email: [this.loggedUser.email, Validators.required],
      mobileNumber: [this.loggedUser.mobileNumber, Validators.required],
      age: [this.loggedUser.age, Validators.required],
      birthDate: [this.loggedUser.birthDate, Validators.required],
      password: [this.loggedUser.password, Validators.required]
    })

    this.disbaleFileds();    
  }

  get register() {
    return this.registerForm.controls;
  }

  editUser(){
    this.readOnly = false;
    this.registerForm.controls['firstName'].enable();
    this.registerForm.controls['lastName'].enable();
    this.registerForm.controls['email'].enable();
    this.registerForm.controls['mobileNumber'].enable();
    this.registerForm.controls['age'].enable();
    this.registerForm.controls['birthDate'].enable();
    this.registerForm.controls['password'].enable();
  }

  onSubmit(){
    this.submitted = true;
    if(this.registerForm.invalid){
      return;
    }

    this.users = JSON.parse(localStorage.getItem('Users')) || [];
    this.user = this.users.findIndex(u => u.email === this.registerForm.value.email);
    this.users.splice(this.user, 1, this.registerForm.value);
    localStorage.setItem('Users', JSON.stringify(this.users))
    this.disbaleFileds();
    this.readOnly = true;
  }

  disbaleFileds(){
    this.registerForm.controls['firstName'].disable();
    this.registerForm.controls['lastName'].disable();
    this.registerForm.controls['email'].disable();
    this.registerForm.controls['mobileNumber'].disable();
    this.registerForm.controls['age'].disable();
    this.registerForm.controls['birthDate'].disable();
    this.registerForm.controls['password'].disable();
  }

  deleteAll(){
    localStorage.removeItem('Users');
    this.router.navigate(['/register']);
  }

}
