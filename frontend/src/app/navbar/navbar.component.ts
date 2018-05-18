import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuList: Array<{ label: string, url: string }> = [
    { label: 'Login', url: '/login' },
    { label: 'Regisztráció', url: '/register' },
    { label: 'Felhasználók', url: '/users' },
    { label: 'Termékek', url: '/products' },
    { label: 'Rendelések', url: '/orders' },
    { label: 'Statisztika', url: '/statistics' }
  ];
  user: any = {
    username: 'a@b.c',
    password: '12345678',
  };
  loginChecker = false;
  loginCheckerForButton = false;
  logoutChecker = false;
  options = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/user/';
  userInfo: any;
  userName = '';
  userAdmin = 'false';

  constructor(public http: Http) {
    this.profile();
  }

  profile() {
    this.http.get(this.baseUrl + 'profile', this.options)
      .subscribe(data => {
        let userData = JSON.parse(data['_body']);
        console.log(data);
        // this.userName = data['user'].username;
        // this.userAdmin = data['user'].isAdmin;
        if (!userData['user']) {
          userData = {
            user: {
              username: 'false',
              isAdmin: 'false'
            }
          };
        }
        this.loginButtonHandler(userData['user'].username, userData['user'].isAdmin);
      });
  }

  loginButtonHandler(username = 'false', admin = 'false') {
    if (username === 'false') {
      this.userName = 'none';
      this.userAdmin = 'false';
      console.log('nope');
    } else if (username && admin === 'true') {
      this.userName = username;
      this.userAdmin = 'true';
      console.log('yes');
    } else {
      this.userName = username;
      this.userAdmin = 'false';
      console.log('quite');
    }
  }

  login() {
    this.http.post(this.baseUrl + 'login', this.user, this.options)
      .subscribe(data => {
        console.log(data['_body']);
        this.profile();

      });
  }

  logout() {
    this.http.get(this.baseUrl + 'logout', this.options)
      .subscribe(data => {
        console.log(data['_body']);
        this.profile();
      });
  }

  thingHider() {
    setTimeout(() => {
      this.loginChecker = false;
      this.logoutChecker = false;
    }, 4000);
  }

  ngOnInit() {
  }

}
