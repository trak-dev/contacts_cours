import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }

  addUser (user: User) {
      
    const all = localStorage.getItem("Users");
    if (typeof all !== 'undefined' && all !== null && all.length > 0) {
      const allUsers: User[] = JSON.parse(all);
      allUsers.push(user);
      localStorage.setItem("Users", JSON.stringify(allUsers));
    } else {
      localStorage.setItem("Users", JSON.stringify([user]));
    }
  }
  editUser (user: User) {
    const all = localStorage.getItem("Users");
    if (typeof all !== 'undefined' && all !== null) {
    let allUsers: User[] = JSON.parse(all);
    for (let i =0 ; i < allUsers.length ; i++) {
      if (allUsers[i].id === user.id) {
        allUsers[i].name = user.name;
        localStorage.setItem("Users", JSON.stringify(allUsers));
      }
    }
    }
  }

}
