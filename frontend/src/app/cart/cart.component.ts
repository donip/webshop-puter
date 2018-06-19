import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { getOrCreateNodeInjector } from '@angular/core/src/render3/instructions';
import { Http, RequestOptions } from '@angular/http';
declare var $: any;
declare var jquery: any;

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
  orderMoney = 0;
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
  userData: Object = {
    _id: '',
    username: '',
    email: '',
    phone: '',
    delivery: {
      postcode: '',
      city: '',
      address: ''
    },
    invoice: {
      postcode: '',
      city: '',
      address: ''
    },
  };
  constructor(public http: Http, public cart: CartService) {
    this.getAll();
    this.profile();
    this.cart.getQuantity();
  }

  ngOnInit() {
  }
  getOrder() {
    if (JSON.parse(localStorage.getItem('cart'))) {
      this.myCart = JSON.parse(localStorage.getItem('cart'));
      console.log(this.myCart);
      this.sumOfOrder();
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
  sumOfOrder() {
    let sum = 0;
    console.log(this.myCart);
    for (let i = 0; i < this.myCart.products.length; i++) {
      sum += this.myCart.products[i]['price'] * this.myCart.products[i]['quantity'];
    }
    this.orderMoney = sum;
  }

  emptyCart() {
    localStorage.removeItem('cart');
    this.getOrder();
  }
  createOrder() {
    // this.newOrder.products = this.newOrder.products.filter(pr => pr.product !== '');
    this.myCart['customer'] = this.myCart['userId'];
    this.http.post(`${this.baseUrl}`, this.myCart, this.options)
      .subscribe(data => {
        console.log(data['_body']);
        this.updateProfile();
        this.emptyCart();
        this.cart.getQuantity();
        $('#orderModal').modal('hide');
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
    const productData = this.productsData.filter(product => product['_id'] === id);
    console.log(productData);
    return productData[0]['productname'];
  }

  testFill() {
    for (let i = 0; i < this.myCart.products.length; i++) {
      const a = this.getProduct(this.myCart.products[i].product);
      this.myCart.products[i].productname = this.getProduct(this.myCart.products[i].product);
      console.log(this.myCart.products[i].product);
    }
  }

  deleteRow(index) {
    this.myCart['products'].splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.myCart));
    this.cart.getQuantity();
    this.sumOfOrder();
  }

  profile() {
    const checkKey = ['phone', 'delivery', 'invoice'];
    const completeKey = ['', { postcode: '', city: '', address: '' }, { postcode: '', city: '', address: '' }];
    this.http.get('http://localhost:8080/user/profile', this.options)
      .subscribe(data => {
        console.log(data);
        data = (JSON.parse(data['_body'])).user;
        for (let i = 0; i < checkKey.length; i++) {
          if (!data[checkKey[i]]) {
            data[checkKey[i]] = completeKey[i];
          }
        }
        this.userData = data;
        console.log('EZ itt:', this.userData);
      });
  }

  updateProfile() {
    this.http.put('http://localhost:8080/useradmin/' + this.userData['_id'], this.userData, this.options)
      .subscribe(data => {
        console.log('Rendelés sikeres');
      });
  }

  copyAddress() {
   const copy = JSON.stringify(this.userData['invoice']);
  this.userData['delivery'] = JSON.parse(copy);
  }
}
