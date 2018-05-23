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
  userId: any;
  delivAd = {
    postcode: 1340,
    city: 'nincs',
    address: 'nincs'
  };
  delivBill = {
    postcode: 2420,
    city: 'nincs',
    address: 'nincs'
  };
  delivPhone = 'nincs';
  democart = {
    customer: '123c',
    products: [
      { productname: 'E-Hoover', price: 1000, quantity: 4 },
      { productname: 'Cleaner-Stix', price: 5000, quantity: 10 },
      { productname: 'Dryer-300', price: 10000, quantity: 1 },
      { productname: 'Clean-Rag', price: 10, quantity: 300 },
      { productname: 'Kikkoman', price: 6000, quantity: 7 },
    ],
  };
  constructor(public http: Http) {
    this.profile();
  }

  ngOnInit() {
  }
  profile() {
    this.http.get('http://localhost:8080/user/profile', this.options)
      .subscribe(data => {
        const recData = JSON.parse(data['_body']).user;
        console.log(recData);
        this.userId = recData._id;
        console.log(this.userId);
        this.delivAd = recData.delivery;
        console.log(this.delivAd);
        this.delivBill = recData.invoice;
        this.delivPhone = recData.phone;
        this.getOrder();
      });
  }
  getOrder() {
    if (JSON.parse(localStorage.getItem('cart')) === null) {
      this.myCart = {
        customer: 'abc',
        products: [
          { productname: 'Üres a kosár', price: 0, quantity: 0 },
        ]
      };
    // tslint:disable-next-line:triple-equals
    } else if (this.userId == JSON.parse(localStorage.getItem('cart')).customer) {
      this.myCart = JSON.parse(localStorage.getItem('cart'));
      console.log(this.myCart);
    } else {
      this.myCart = {
        customer: 'abc',
        products: [
          { productname: 'Üres a kosár', price: 0, quantity: 0 },
        ]
      };
    }
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
      });
  }
}
