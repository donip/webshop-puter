import { Component, OnInit } from '@angular/core';

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


  constructor() { }

  ngOnInit() {
  }

}
