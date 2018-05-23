import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Globals } from './globals';

@Injectable()
export class CartService {

  // HASZNÁLAT:
  // import { CartService }...;
  // constructor (private cartservice: CartService) {}
  // indítása: cartservice.addToCart(product: Object)

  baseUrl = 'http://localhost:8080/user/';
  options = new RequestOptions({ withCredentials: true });
  productQuantity: Number = 0;
  userId: any;
  cart: Object;
  products: any;

  constructor(public http: Http, public global: Globals) {
    this.getUserId();
  }
  /**
   * Get logged-in user ID
   */
  private getUserId() {
    this.http.get(this.baseUrl + 'profile', this.options)
      .subscribe(data => {
        const userData = JSON.parse(data['_body']);
        if (userData.user._id) {
          this.userId = userData.user._id;
        } else {
          this.userId = 'none';
        }
        console.log(this.userId);
      });
  }
  /**
   * Loads cart from LocalStorage
   */
  private getCartFromStorage() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
  }
  public getQuantity() {
    if (JSON.parse(localStorage.getItem('cart')) === null) {
      this.global.badge = 0;
    } else {
    const cart = JSON.parse(localStorage.getItem('cart')).products;
    let sum = 0;
    for (let i = 0; i < cart.length; i++ ) {
      sum += cart[i]['quantity'];
    }
    this.global.badge = sum;
    }
  }
  /**
   * Saves cart to LocalStorage
   */
  private saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    console.log(this.cart);
  }

  /**
   * Add product to cart starting procedure
   * Checks if cart exists in LocalStorage
   * If NOT: creates cart and initiate add process  addNewProductToCart(product)
   * If YES: starts finding process  findProduct(product)
   * @param product {Object} - Selected product
   */
  public addToCart(product: Object) {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    if (!this.cart) {
      this.initiateCart();
      this.addNewProductToCart(product);
    } else { this.checkCustomerId(product); }
  }

  private checkCustomerId(product) {
    if (this.userId != this.cart['userId']) {
      this.initiateCart();
      this.addNewProductToCart(product);
    } else {
      this.findProduct(product);
    }
   }
  /**
   * Searches for selected product in cart
   * If there is a match: adds +1 to its quantity
   * If NOT: starts addNewProductToCart(product) function
   * @param product {Object} - selected product
   */

private initiateCart() {
  this.cart = {
    userId: this.userId,
    products: []
  };
}

  private findProduct(product) {
    let found = 0;
    this.cart['products'].map(pr => {
      if (pr.product == product._id) {
        pr.quantity += 1;
        found += 1;
      }
    });
    if (found === 0) {
      this.addNewProductToCart(product);
    } else { this.saveCartToStorage(); }
  }
  /**
   * Adds new product to cart
   * @param product {Object} - selected product
   */
  private addNewProductToCart(product) {
    this.cart['products'].push({
      product: product._id,
      price: product.price,
      quantity: 1
    });
    this.saveCartToStorage();
  }
}
