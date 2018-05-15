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
  adat = {
    productname: '',
    brand: '',
    price: '',
    category: ''
  };
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
        console.log(data['_body']);
      });
  }

  updater(product) {
    this.selectedProduct = product;
    console.log(this.selectedProduct);
    this.http.put('http://localhost:8080/product/' + this.selectedProduct['_id'], this.selectedProduct, this.options).subscribe(
      data => {
        console.log(data['_body']);
      });
  }

  rowDeleter(id) {
    this.http.delete('http://localhost:8080/product/' + id, this.options).subscribe(
      data => {
        this.errorHandling(data);
      });
  }
}
