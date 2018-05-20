import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  user: any = {
    username: '',
    email: '',
    password: '',
    isAdmin: 'false'
  };
  passwordConf: '';


  options = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/contact/';

  constructor(public http: Http,
              public router: Router) { }

  validation() {
    if (this.user.password !== this.passwordConf) {
      return alert('Jelszó nem egyezik.');
    } else {
      this.register();
    }
  }

  register() {
    this.http.post(this.baseUrl + 'register', this.user, this.options)
      .subscribe(data => {
        console.log(data['_body']);
      });
  }

  ngOnInit() {
  }

}
