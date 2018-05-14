import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: any = {
    username: 'YOUR REGISTERED USERNAME',
    email: 'YOUR EMAIL',
    password: 'YOUR REGISTERED USER PASSWORD',
    isAdmin: 'false'
  };

  options = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/user/';

  constructor(public http: Http) { }

  register() {
    this.http.post(this.baseUrl + 'register', this.user, this.options)
        .subscribe(data => {
            console.log(data['_body']);
        });
  }

  ngOnInit() {
  }

}
