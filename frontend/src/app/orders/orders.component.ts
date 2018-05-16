import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  options = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/order/';
  orders: any;
  selectedOrder: any;
  newOrder = {
    customer: '',
    products: [{
      product: '',
      quantity: '',
    }],
  };
  userData: any;
  products: any;

  constructor(public http: Http) {
    this.getOrders();
    this.getUsers();
    this.getProducts();

   }

   addRow() {
    this.newOrder.products.push({
      product: '',
      quantity: ''
    });
   }

   getUsers() {
    this.http.get('http://localhost:8080/useradmin/', this.options)
      .subscribe(data => {
        this.userData = JSON.parse(data['_body']);
        console.log(this.userData);
  });
  }

  getOrders() {
    this.http.get(this.baseUrl, this.options)
      .subscribe(data => {
        this.orders = JSON.parse(data['_body']);
        console.log(this.orders);
  });
  }

  getProducts() {
    this.http.get('http://localhost:8080/product', this.options)
    .subscribe(data => {
        this.products = JSON.parse(data['_body']);
      });
  }

  editOrder(order) {
    this.selectedOrder = order;
    this.http.put(`${this.baseUrl}${this.selectedOrder['_id']}`, this.selectedOrder, this.options)
      .subscribe(data => {
        console.log(data);
      });
  }

  removeOrder(order) {
    this.selectedOrder = order;
      this.http.delete(`${this.baseUrl}${this.selectedOrder['_id']}`, this.options)
      .subscribe(data => {
        console.log(data);
      });
  }

  createOrder() {
    this.http.post(`${this.baseUrl}`, this.newOrder, this.options)
        .subscribe(data => {
            console.log(data['_body']);
        });
  }


}
