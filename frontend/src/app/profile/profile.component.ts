import { Component } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  profileData: Object = {
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
  setPassword: Object = {
    oldPassword: '',
    newPassword: '',
    newPassword2: ''
  };
  userMessage: Object = {
    status: 'none',
    text: '',
  };
  baseUrl: String = 'http://localhost:8080/';
  options = new RequestOptions({ withCredentials: true });

  orders: any;
  selectedOrder = {
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
    this.profile();
    this.getMyOrders();
  }
  /**
   * Felhasználói profil lekérése
   * A hiányzó mezők kiegészítése ngModel számára
   */
  profile() {
    const checkKey = ['phone', 'delivery', 'invoice'];
    const completeKey = ['', { postcode: '', city: '', address: '' }, { postcode: '', city: '', address: '' }];
    this.http.get(this.baseUrl + 'user/profile', this.options)
      .subscribe(data => {
        console.log(data);
        data = (JSON.parse(data['_body'])).user;
        for (let i = 0; i < checkKey.length; i++) {
          if (!data[checkKey[i]]) {
            data[checkKey[i]] = completeKey[i];
          }
        }
        this.profileData = data;
        console.log(data);
      });
  }
  /**
   * Profil módosítása input adatokkal
   * Szerver válasza szerint üzenet megjelenítésének indítása
   */
  updateProfile() {
    this.http.put(this.baseUrl + 'useradmin/' + this.profileData['_id'], this.profileData, this.options)
      .subscribe(data => {
        if (data.ok === true) {
          this.displayMessage('success', 'Profiladatok módosítása sikeres');
        } else { this.displayMessage('error', 'Módosítás sikertelen'); }
      }, error => {
        this.displayMessage('error', 'Módosítás sikertelen');
      });
  }

  updatePassword() {
    if (this.setPassword['newPassword'] === this.setPassword['newPassword2'] && this.setPassword['newPassword'].length > 7) {
      this.http.post(this.baseUrl + 'user/change/' + this.profileData['_id'], this.setPassword, this.options)
        .subscribe(data => {
          if (data.ok === true) {
            this.displayMessage('success', 'Sikeres jelszómódosítás');
            this.emptyPasswordForm();
          } else {
            const errorMessage = JSON.parse(data['_body']);
            this.displayMessage('error', errorMessage.err);
          }
        }, error => {
          const errorMessage = JSON.parse(error['_body']);
          this.displayMessage('error', errorMessage.err);
        });
    } else { this.passwordValidationError(); }
  }

  passwordValidationError() {
    if (this.setPassword['newPassword'] === this.setPassword['oldPassword']) {
      this.displayMessage('error', 'A megadott régi és új jelszó megegyezik');
    } else if (this.setPassword['newPassword'].length < 8) {
      this.displayMessage('error', 'Jelszó túl rövid (Minimum 8 karakter szükséges)');
    } else { this.displayMessage('error', 'Jelszó nem egyezik'); }
  }

  emptyPasswordForm() {
    this.setPassword = {
      oldPassword: '',
      newPassword: '',
      newPassword2: ''
    };
  }
  /**
   * 6 másodpercre megváltoztatja userMesseage értékét true-ra
   * HTML-ben ngIf figyeli a változót
   * @param type String - success || error - üzenet típusa
   */
  displayMessage(type: String, message: String) {
    this.userMessage['text'] = message;
    this.userMessage['status'] = type;
    setTimeout(() => {
      this.userMessage['status'] = 'none';
    }, 8000);
  }

  /**
   * @todo backendről már csak a customerId alapján szűrt adat jöjjön át
   */
  getMyOrders() {
    this.http.get('http://localhost:8080/order/client', this.options)
      .subscribe(data => {
        const d = JSON.parse(data['_body']);
        console.log(d);
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
          this.listMyActiveOrders();
          this.listMyDoneOrders();

        }
      });
  }

  listMyDoneOrders() {
    this.doneOrders = this.orders.filter(order => order.status === 'done' && order.customer._id === this.profileData['_id']);
  }

  listMyActiveOrders() {
    this.activeOrders = this.orders.filter(order => order.status === 'active' && order.customer._id === this.profileData['_id']);
  }

}
