import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  title = 'Final Countdown';
  adat = {
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
    if (this.checker = 'y') {
    this.http.put('http://localhost:8080/product/' + this.selectedProduct['_id'], this.selectedProduct, this.options).subscribe(
      data => {
        console.log(data);
        this.getAll();
      });
    }
  }


  rowDeleter(product) {
    this.selectedProduct = product;
    this.http.delete('http://localhost:8080/product/' + this.selectedProduct['_id'], this.options).subscribe(
      data => {
        console.log(data);
        this.getAll();
      });
  }
}
