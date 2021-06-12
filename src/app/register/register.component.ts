import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean = false;
  user = []

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      mobileNumber: ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10)]
      ],
      age: ['', Validators.required],
      birthDate: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get register() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.user = JSON.parse(localStorage.getItem('Users')) || [];
    this.user.push(this.registerForm.value)
    localStorage.setItem('Users', JSON.stringify(this.user))
    this.router.navigate(['/login'])
  }
}
