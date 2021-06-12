import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  user: any;

  getUser(){
    return this.user;
  }

  setUser(user: any){
    this.user = user;
  }
}
