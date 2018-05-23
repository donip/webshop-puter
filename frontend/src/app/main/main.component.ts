import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  adat = {
    title: '',
    rank: ''
  };
  datas: any;
  datasForReal: any;
  dataHelper = [];
  lastTenProducts: any;
  selectedCategory: any;
  options = new RequestOptions({ withCredentials: true });
  constructor(public http: Http, public cart: CartService) {
    this.getAllC();
    this.getAllProducts();
    this.getAllProductsForReal();
  }

  ngOnInit() {
  }

  errorHandling(res) {
    res = JSON.parse(res['_body']);
    if (res.error) {
      console.error('API error:' + res.error);
    } else {
      this.datas = res;
      this.datas.sort( (a, b) => {
        if (a.rank > b.rank) {
          return 1;
        } else if (a.rank < b.rank) {
          return -1;
        } else {
          return 0;
        }
      });
      this.datasForReal = res;
    }
  }
  errorHandlingForReal(res) {
    res = JSON.parse(res['_body']);
    if (res.error) {
      console.error('API error:' + res.error);
    } else {
      this.datasForReal = res;
      return this.datasForReal;
    }
  }
  productErrorHandling(res) {
    res = JSON.parse(res['_body']);
    if (res.error) {
      console.error('API error:' + res.error);
    } else {
      this.lastTenProducts = res;
      this.filterProducts();
    }
  }
  getAllC() {
    this.http.get('http://localhost:8080/category', this.options).subscribe(
      data => {
        this.errorHandling(data);
      });
  }
  getAllProductsForReal() {
    this.http.get('http://localhost:8080/product', this.options).subscribe(
      data => {
        this.errorHandlingForReal(data);
        console.log(data);
      });
  }
  getByCat(category) {
    this.getAllProductsForReal();
    this.dataHelper = [];
    this.selectedCategory = category;
    console.log(this.selectedCategory, this.datasForReal);
    for (let i = 0; i < this.datasForReal.length; i++) {
      if (this.datasForReal[i].category['_id'] === this.selectedCategory['_id']) {
        this.dataHelper.push(this.datasForReal[i]);
      }
    }
    console.log(this.dataHelper);
  }
  /**
   * Lekéri a termékeket
   */
  getAllProducts() {
    this.http.get('http://localhost:8080/product', this.options).subscribe(
      data => {
        this.productErrorHandling(data);
        console.log(data);
      });
  }
  /**
   * szűri a productokat az első 10 (legfeljebb!) legfrissebb productra a módosítás szerint
   */
  filterProducts() {
    this.lastTenProducts.sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);
      if (dateA < dateB) {
        return 1;
      }
      if (dateA > dateB) {
        return -1;
      }
      // a-nak egyenlőnek kell lennie b-vel
      return 0;
    });
  if (this.lastTenProducts.length >= 10) {
    this.lastTenProducts.length = 10;
  }
  console.log(this.lastTenProducts);
  }

  creator() {
    this.http.post('http://localhost:8080/category', this.adat, this.options).subscribe(
      data => {
        console.log(data);
        this.getAllC();
      }
    );
  }

  updater(category) {
    this.selectedCategory = category;
    this.http.put('http://loalhost:8080/category/' + this.selectedCategory['_id'], this.selectedCategory, this.options).subscribe(
      data => {
        console.log(data);
        this.getAllC();
      }
    );
  }

  deleter(category) {
    this.selectedCategory = category;
    this.http.delete('http://localhost:8080/category/' + this.selectedCategory['_id'], this.options).subscribe(
      data => {
        console.log(data);
        this.getAllC();
      }
    );
  }

  toTheCart(product) {
    this.cart.addToCart(product);
  }
}
