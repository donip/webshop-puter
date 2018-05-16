import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {
    username: 'a@b.c',
    password: '12345678',
  };

  options = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/user/';


  constructor(public http: Http) { }

  profile() {
    this.http.get(this.baseUrl + 'profile', this.options)
        .subscribe(data => {
            console.log(data['_body']);
        });
  }

  login() {
    this.http.post(this.baseUrl + 'login', this.user, this.options)
        .subscribe(data => {
            console.log(data['_body']);
        });
  }

  logout() {
    this.http.get(this.baseUrl + 'logout', this.options)
        .subscribe(data => {
            console.log(data['_body']);
        });
  }

  ngOnInit() {
  }

}
