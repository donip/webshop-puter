import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  msg: any = {
    email: '',
    coreMsg: '',
  };

  baseUrl = 'http://localhost:8080/contact/';

  constructor(public http: Http, public router: Router, public cart: CartService) {
    this.cart.getQuantity();
  }

  sendMsg() {
    this.http.post(this.baseUrl + 'sendClientMsg', this.msg)
      .subscribe(data => {
        console.log(data['_body']);
        alert('Köszönjük a bejelentést, hamarosan válaszolunk észrevételére.');
      });
  }

  ngOnInit() {
  }

}
