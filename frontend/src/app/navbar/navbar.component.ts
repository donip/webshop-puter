import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
declare var $: any;
declare var jquery: any;

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
    { label: 'Statisztika', url: '/statistics' },
    { label: 'Kapcsolat', url: '/contact' },
    { label: 'Kategória', url: '/category' },
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
  loginError = false;

  constructor(public http: Http, public router: Router) {
    this.profile();
  }
/**
 * Profiladatok lekérdezése bejelentkezés után
 * Ha nincs bejelentkezve userData-ban user objektum léterehozása 'false' értékekkel
 * Bejelentkező modal elrejtése (sikeres bejelentkezésnél)
 * loginButtonHandler(username, isAdmin) meghívása userData átadásával
 */
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
        $('#login-modal').modal('hide');
        this.loginButtonHandler(userData['user'].username, userData['user'].isAdmin);
      });
  }
/**
 * Paraméterek:
 * Bejelentkezett felhasználó neve || vagy 'false'
 * Admin van bejelentkezve: 'true' || 'false'
 *
 * this.userName és this.userAdmin értékeit a html-ben ngIf-ek figyelik
 * így jelennek meg vagy tűnnek el bizonyos linkek és gombok a navbaron
 */
  loginButtonHandler(username = 'false', admin = 'false') {
    if (username === 'false') { // nincs bejelentkezve
      this.userName = 'none';
      this.userAdmin = 'false';
    } else if (username && admin === 'true') {  // admin van bejelentkezve
      this.userName = username;
      this.userAdmin = 'true';
    } else {          // normál felhasználó van bejelentkezve
      this.userName = username;
      this.userAdmin = 'false';
    }
  }

  login() {
    setTimeout(() => {    // bejelentkezés sikertelen üzenet megjelenítése
      this.loginError = true;
    }, 1000);
    setTimeout(() => {    // és elrejtése (ngIf a HTML-ben)
      this.loginError = false;
    }, 8000);
    this.http.post(this.baseUrl + 'login', this.user, this.options)
      .subscribe(data => {
        console.log(data['_body']);
        this.profile();   // profiladat lekérdezés navbarhoz

      });
  }

  logout() {
    this.http.get(this.baseUrl + 'logout', this.options)
      .subscribe(data => {
        console.log(data['_body']);
        this.profile();   // profiladat frissítés navbarhoz
      });
  }

  thingHider() {
    setTimeout(() => {
      this.loginChecker = false;
      this.logoutChecker = false;
    }, 4000);
  }

  /**
   * bejelentkezési hiba nullázása
   * Modal megjelenítése jquery-vel
   */
  showLoginModal() {
    this.loginError = false;
    $('#login-modal').modal('show');
  }

  ngOnInit() {
  }

  reload() {
    window.location.reload();
    this.router.navigate(['/statistics']);
  }

}
