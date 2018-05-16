import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as faker from 'faker';
import { validateConfig } from '@angular/router/src/config';

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
    brand: '',
    price: '',
    category: ''
  };
  checker: any;
  datas: any;
  selectedProduct: any;
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

  navigate(product) {
    this.selectedProduct = product;
    this.http.get('http://localhost:8080/product/url/' + this.selectedProduct['producturl'], this.options).subscribe(
      data => {
        console.log(data);
      });
  }

  creator() {
    console.log(this.adat);
    console.log(this.datas);
    this.http.post('http://localhost:8080/product', this.adat, this.options).subscribe(
      data => {
        console.log(data['_body']);
        this.getAll();
      });
  }

  updater(product) {
    this.selectedProduct = product;
    console.log(this.selectedProduct);
    this.checker = prompt('Biztosan frissíted a terméket? y/n');
    console.log(this.checker);
    if (this.checker === 'y') {
      this.http.put('http://localhost:8080/product/' + this.selectedProduct['_id'], this.selectedProduct, this.options).subscribe(
        data => {
          console.log(data);
          this.getAll();
        });
    } else {
      this.getAll();
    }
  }


  rowDeleter(product) {
    this.selectedProduct = product;
    this.checker = prompt('Biztosan törlöd a terméket? y/n');
    if (this.checker === 'y') {
      this.http.delete('http://localhost:8080/product/' + this.selectedProduct['_id'], this.options).subscribe(
        data => {
          console.log(data);
          this.getAll();
        });
    } else {
      this.getAll();
    }
  }
  /**
 * Fake product generator
 * @param {string} brand - random brand from predefined list
 * @param {string} category - random category from predefined list
 * @param {string} productname - initial letters of brand and category + random number
 * @param {string} price - random number toString!
 * @todo Comment this out after testing, as this feature is only for developers.
 */
  createFakeProduct() {
    this.adat['brand'] = this.brands[Math.floor(Math.random() * this.brands.length)];
    this.adat['category'] = this.categories[Math.floor(Math.random() * this.categories .length)];
    this.adat['productname'] = this.adat['brand'].split('')[0] + this.adat['category'].split('')[0] + Math.ceil(Math.random() * 10) * 100;
    this.adat['price'] = (faker.commerce.price().toString());
    this.creator();
}
}
