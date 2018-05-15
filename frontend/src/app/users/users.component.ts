import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { timeout } from 'q';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  options = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/useradmin/';
  users: any;
  selectedUser: any;
  newUser = {
    username: '',
    email: '',
    password: '',
    isAdmin: ''
  };
  addSuccess = 'empty';

  constructor(public http: Http) {
    this.getUsers();
    this.hideMessage();
   }

  ngOnInit() {
  }
  getUsers() {
    this.http.get(this.baseUrl, this.options)
      .subscribe(data => {
        this.users = JSON.parse(data['_body']);
        console.log(this.users);
  });
  }

  editUser(user) {
    this.selectedUser = user;
    this.http.put(`http://localhost:8080/useradmin/${this.selectedUser['_id']}`, this.selectedUser, this.options)
      .subscribe(data => {
        console.log(data);
      });
  }

  removeUser(user) {
    this.selectedUser = user;
      this.http.delete(`http://localhost:8080/useradmin/${this.selectedUser['_id']}`, this.options)
      .subscribe(data => {
        console.log(data);
      });
  }

  addUser() {
    this.http.post('http://localhost:8080/user/register', this.newUser, this.options)
        .subscribe(data => {
          const body = JSON.parse(data['_body']);
          if (body.success) {
            this.addSuccess = 'Sikeres hozzáadás';
        } else {
          this.addSuccess = 'Hozzáadás sikertelen';
        }
        console.log(data['_body']);
        this.hideMessage();
    });
  }

  hideMessage() {
    setTimeout(() => {
      this.addSuccess = 'empty';
 }, 5000);
  }
}
