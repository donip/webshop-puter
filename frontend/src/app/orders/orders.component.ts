import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Router } from '@angular/router';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  options = new RequestOptions({ withCredentials: true });
  baseUrl = 'http://localhost:8080/order/';
  orders: any;
  selectedOrder = {
    customer: '',
    products: [{
      product: '',
      quantity: '',
    }],
    status: '',
  };
  newOrder = {
    customer: '',
    products: [{
      product: '',
      quantity: '',
    }],
    status: '',
  };
  userData: any;
  products: any;
  doneOrders: any;
  activeOrders: any;

  constructor(public http: Http, public router: Router) {
    this.getOrders();
    this.getUsers();
    this.getProducts();

  }

  addRow() {
    this.newOrder.products.push({
      product: '',
      quantity: ''
    });
    console.log(this.newOrder);
  }

  addModalRow() {
    this.selectedOrder.products.push({
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
        const d = JSON.parse(data['_body']);
        if (d.err) {
          this.router.navigate(['/login']);
        } else {
          for (let i = 0; i < d.length; i++) {
            for (let j = 0; j < d[i].products.length; j++) {
              if (d[i].products[j]['product'] === null) {
                d[i].products[j]['product'] = { productname: 'Termék törölve' };
              }
            }
          }
          this.orders = d;
          this.listActiveOrders();
          this.listDoneOrders();
        }
      });
  }

  getProducts() {
    this.http.get('http://localhost:8080/product', this.options)
      .subscribe(data => {
        this.products = JSON.parse(data['_body']);
      });
  }

  editOrder() {
    this.http.put(`${this.baseUrl}${this.selectedOrder['_id']}`, this.selectedOrder, this.options)
      .subscribe(data => {
        const d = JSON.parse(data['_body']);
        if (d.err) {
          this.router.navigate(['/login']);
        }
      });
  }

  removeOrder(order) {
    if (confirm('Biztos törli a rendelést?')) {
      this.selectedOrder = order;
      this.http.delete(`${this.baseUrl}${this.selectedOrder['_id']}`, this.options)
        .subscribe(data => {
          console.log(data);
          this.getOrders();
        });
    }
  }

  createOrder() {
    this.newOrder.products = this.newOrder.products.filter(pr => pr.product !== '');
    this.http.post(`${this.baseUrl}`, this.newOrder, this.options)
      .subscribe(data => {
        console.log(data['_body']);
        this.getOrders();
      });
  }

  loadModalData(order) {
    this.selectedOrder = order;
    console.log(this.selectedOrder);
  }

  listDoneOrders() {
    this.doneOrders = this.orders.filter(order => order.status === 'done');
  }

  listActiveOrders() {
    this.activeOrders = this.orders.filter(order => order.status === 'active');
  }


}
