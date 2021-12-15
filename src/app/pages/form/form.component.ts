import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  name: string = "";
  pseudo: string = "";
  email: string = "";

  userList: User[] = [];
  activeUser: User = {name: "", pseudo: "", email: "", id:""};


  constructor(private _userService: UserServiceService) { }

  ngOnInit(): void {
    console.log(this.activeUser)
    this.getAll();
  }

  createUser () {
    if(this.email !== "" && this.pseudo !== "" && this.name !== "") {
      if (this.checkEmail(this.email)) {
        const id = `${this.email}${this.pseudo}${this.name}`;
        this._userService.addUser({name: this.name, pseudo: this.pseudo, email:this.email, id:id})
      } else {
        alert("mauvaise adresse mail !")
      }
    }
    this.getAll();
    this.email = "";
    this.pseudo = "";
    this.name = "";

  }

  show (user: User) {
    this.activeUser = user;
  }

  editUser (event: any) {
    if (event.code === "Enter") {
      this._userService.editUser(this.activeUser);
      this.activeUser = {name: "", pseudo: "", email: "", id:""};
    }
  }

  checkEmail(email: string) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    }

  getAll () {
    const all = localStorage.getItem("Users");
    if (typeof all !== 'undefined' && all !== null) {
      this.userList = JSON.parse(all);
    }
  }

}
