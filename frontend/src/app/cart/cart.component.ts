import { Component, OnInit } from '@angular/core';
import { getOrCreateNodeInjector } from '@angular/core/src/render3/instructions';
import { Http, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  options = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/order/';
  myCart: any;
  productsData: any;
  democart = {
    customer: '123c',
    products: [
      { product: 'flyingpigs', price: 1000, quantity: 4 },
      { product: 'porg01', price: 5000, quantity: 10 },
      { product: 'pancreas', price: 10000, quantity: 1 },
      { product: 'etiopianorphan', price: 10, quantity: 300 },
      { product: 'kikkoman', price: 6000, quantity: 7 },
    ],
  };
  constructor(public http: Http) {
    this.getOrder();
    this.getAll();
  }

  ngOnInit() {
  }
  getOrder() {
    this.myCart = JSON.parse(localStorage.getItem('cart'));
    console.log(this.myCart);
  }
  setCart() {
    localStorage.setItem('cart', JSON.stringify(this.democart));
  }
  createOrder() {
    // this.newOrder.products = this.newOrder.products.filter(pr => pr.product !== '');
    this.http.post(`${this.baseUrl}`, this.myCart, this.options)
      .subscribe(data => {
        console.log(data['_body']);
      });
  }
  getAll() {
    this.http.get('http://localhost:8080/product', this.options).subscribe(
      data => {
        this.productsData = JSON.parse(data['_body']);
        console.log(this.productsData);
      });
  }
}
