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
  delivAd: {
    postcode: '0',
    city: 'nincs',
    address: 'nincs'
  };
  delivBill: {
    postcode: '0',
    city: 'nincs',
    address: 'nincs'
  };
  delivPhone: 'nincs';
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
    this.getOrder();
    this.profile();
  }

  ngOnInit() {
  }
  getOrder() {
    if (this.userId === JSON.parse(localStorage.getItem('cart')).customer) {
      this.myCart = JSON.parse(localStorage.getItem('cart'));
      console.log(this.myCart);
    } else {
      this.myCart = {
        customer: '',
        products: [
          { productname: 'Üres a kosár', price: 0, quantity: 0 },
        ],
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
  profile() {
    this.http.get('http://localhost:8080/user/profile', this.options)
      .subscribe(data => {
        const recData = JSON.parse(data['_body']);
        this.userId = recData._id;
        this.delivAd = recData.delivery;
        this.delivBill = recData.invoice;
        this.delivPhone = recData.phone;
      });
  }
}
