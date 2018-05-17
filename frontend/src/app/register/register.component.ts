import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: any = {
    username: 'name',
    email: 'email',
    password: 'pw',
    isAdmin: 'false'
  };
  passwordConf: '';


  options = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/user/';

  constructor(public http: Http,
              public router: Router) { }

  validation() {
    if (this.user.password !== this.passwordConf) {
      return alert('Jelszó nem egyezik.');
    } else {
      this.register();
      this.router.navigate(['/login']);
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
