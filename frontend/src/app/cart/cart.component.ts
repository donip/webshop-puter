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
  myCart = {
    customer: '',
    products: []
  };
  productsData = [{
    products: ''
  }];
  userId: any;
  delivery: {
    postcode: '0',
    city: 'nincs',
    address: 'nincs'
  };
  invoice: {
    postcode: '0',
    city: 'nincs',
    address: 'nincs'
  };
  productsInCart = [];
  phone: 'nincs';

  constructor(public http: Http) {
    this.getAll();
    this.profile();
  }

  ngOnInit() {
  }
  getOrder() {
    if (JSON.parse(localStorage.getItem('cart'))) {
      this.myCart = JSON.parse(localStorage.getItem('cart'));
      console.log(this.myCart);
      this.testFill();
    } else {
      this.myCart = {
        customer: '',
        products: [
          { productname: 'Üres a kosár', price: 0, quantity: 0 },
        ],
      };
    }
  }
  emptyCart() {
    localStorage.removeItem('cart');
    this.getOrder();
  }
  createOrder() {
    // this.newOrder.products = this.newOrder.products.filter(pr => pr.product !== '');
    console.log('EZT KÜLDJÜK', this.myCart);
    this.myCart['customer'] = this.myCart['userId'];
    this.http.post(`${this.baseUrl}`, this.myCart, this.options)
      .subscribe(data => {
        console.log(data['_body']);
        this.emptyCart();
      }, error => {
        window.alert('Rendelés sikertelen');
      });
  }
  getAll() {
    this.http.get('http://localhost:8080/product', this.options).subscribe(
      data => {
        this.productsData = JSON.parse(data['_body']);
        this.getOrder();
        console.log(this.productsData);
      });
  }

  getProduct(id) {
    // tslint:disable-next-line:triple-equals
    const productData = this.productsData.filter(product => product['_id'] == id);
    console.log(productData);
    return productData[0]['productname'];
  }

  testFill() {
    for (let i = 0; i < this.myCart.products.length; i++) {
      const a = this.getProduct(this.myCart.products[i].product);
      this.myCart.products[i].productname = this.getProduct(this.myCart.products[i].product);
      console.log( this.myCart.products[i].product);
    }
  }

  profile() {
    this.http.get('http://localhost:8080/user/profile', this.options)
      .subscribe(data => {


      });
  }


}
