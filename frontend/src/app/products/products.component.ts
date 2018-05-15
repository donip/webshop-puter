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
  brands = ['AEG', 'Bosch', 'Indesit', 'Samsung', 'Siemens', 'Whirlpool'];
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
 * @param {string} brand - random brand from predefined list
 * @param {string} category - random category from predefined list
 * @param {string} productname - initial letters of brand and category + random number
 * @todo Comment this out after testing, as this feature is only for developers.
 */
createFakeProduct() {
  const brand = this.brands[Math.floor(Math.random() * this.brands.length)];
  const category = this.categories[Math.floor(Math.random() * this.categories .length)];
  const productname = brand.split('')[0] + category.split('')[0] + Math.ceil(Math.random() * 10) * 100;
  const randomProductPrice = (faker.commerce.price().toString());
  const producturl = '';
  const imgurl = '';
  console.log(productname);
  //this.creator();
}
}
