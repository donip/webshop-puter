import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import * as faker from 'faker';

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

  constructor(public http: Http) {
    this.getUsers();
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
            console.log(data['_body']);
        });
  }
/**
 * Fake user generator
 * @param {string} username - random name
 * @param {string} email - user.name@gmail.com
 * @param {string} password - 8xa = 'aaaaaaaa'
 * @param {string} isAdmin - 'false'
 * @todo Comment this out after testing, as this feature is only for developers.
 */
  createFakeUser() {
    const randomEmail = faker.internet.email();
    this.newUser.username = faker.name.findName();
    this.newUser.email = (this.newUser.username).split(' ').join('.') + '@gmail.com';
    this.newUser.password = 'aaaaaaaa';
    this.newUser.isAdmin = 'false';
    this.addUser();
  }
}
