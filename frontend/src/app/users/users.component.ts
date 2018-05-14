import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

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

}
