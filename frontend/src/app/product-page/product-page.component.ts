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
  comments: []
};
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
}
