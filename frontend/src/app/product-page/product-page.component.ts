import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
error = false;
productData = {
  productname: '',
  brand: '',
  price: '',
  imgurl: '',
  comments: [],
  category: ''
};
cats = [];
chosenOne: any;
url: any;
options = new RequestOptions({ withCredentials: true });
  constructor(private route: ActivatedRoute, public http: Http, public cart: CartService) {
    this.route.params.subscribe(params =>  {
      this.url = params;
    });
   }
   navigate() {
    this.http.get('http://localhost:8080/product/url/' + this.url.url, this.options).subscribe(
      data => {
        const body = JSON.parse(data['_body']);
        this.productData = body;
        this.getCat();
        if (body === null || body.error ) {
           this.error = true;
        }
      });
  }
  ngOnInit() {
    this.navigate();
  }
  toTheCart(product) {
    this.cart.addToCart(product);
  }
  getCat() {
    this.http.get('http://localhost:8080/category', this.options).subscribe(
      data => {
        this.cats = JSON.parse(data['_body']);
        for (let i = 0; i < this.cats.length; i++) {
          if (this.productData.category === this.cats[i]['_id']) {
            this.chosenOne = this.cats[i].title;
          }
        }
      }
    );
  }
}
