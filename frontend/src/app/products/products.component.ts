import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  title = 'Final Countdown';
  // adat: any = [];
  adat: object = {
    productname: '',
    producturl: '',
    imgurl: '',
    brand: '',
    price: '',
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
    console.log(this.adat);
    console.log(this.datas);
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
}
