import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as faker from 'faker';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  title = 'Final Countdown';
  categories = ['Hűtő', 'Kávéfőző', 'Légkondi', 'Mosogatógép', 'Mosógép', 'Porszívó'];
  adat: object = {
    id: '',
    productname: '',
    producturl: '',
    imgurl: '',
    brand: '',
    prize: '',
    category: ''
  };
  datas: any;
  options = new RequestOptions({ withCredentials: true });
  constructor(public http: Http) {
    this.getAll();
  }

  ngOnInit() {
  }

  errorHandling(res) {
    res = JSON.parse(res['_body']);
    if (res.error) {
      console.error('API error:' + res.error);
    } else {
      this.datas = res;
    }
  }

  getAll() {
    this.http.get('http://localhost:8080/product', this.options).subscribe(
      data => {
        this.errorHandling(data);
      });
  }

  getOne(id) {
    this.http.get('http://localhost:8080/product/url/' + id, this.options).subscribe(
      data => {
        this.errorHandling(data);
      });
  }

  navigate(productname) {
    this.http.get('http://localhost:8080/product/url/' + productname, this.options).subscribe(
      data => {
        this.errorHandling(data);
      });
  }

  creator() {
    this.http.post('http://localhost:8080/product', this.adat, this.options).subscribe(
      data => {
        this.errorHandling(data);
      });
  }

  updater(id) {
    this.http.put('http://localhost:8080/product/' + id, this.adat, this.options).subscribe(
      data => {
        this.errorHandling(data);
      });
  }

  rowDeleter(id) {
    this.http.delete('http://localhost:8080/product/' + id, this.options).subscribe(
      data => {
        this.errorHandling(data);
      });
  }
/**
 * Fake product generator
 * @param {string} username - random name
 * @param {string} email - user.name@gmail.com
 * @param {string} password - 8xa = 'aaaaaaaa'
 * @param {string} isAdmin - 'false'
 * @todo {string} Comment this out after testing, as this feature is only for developers.
 */
createFakeProduct() {
  const productname = '';
  const producturl = '';
  const imgurl = '';
  const brand = '';
  const randomProductPrice = (faker.commerce.price().toString());
  const category = '';
  console.log(productname);
  /*
  this.newUser.username = faker.name.findName();
  this.newUser.email = (this.newUser.username).split(' ').join('.') + '@gmail.com';
  this.newUser.password = 'aaaaaaaa';
  this.newUser.isAdmin = 'false';
  */
  //this.creator();
}
}
