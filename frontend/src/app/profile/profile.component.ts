import { Component } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

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
  userMessage: String = '';
  baseUrl: String = 'http://localhost:8080/';
  options = new RequestOptions({ withCredentials: true });

  constructor(public http: Http) {
    this.profile();
  }

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

  updateProfile() {
    this.http.put(this.baseUrl + 'useradmin/' + this.profileData['_id'], this.profileData, this.options)
      .subscribe(data => {
        if (data.ok === true) {
          this.displayMessage('success')
        } else { this.displayMessage('error'); }
      });
  }

  displayMessage(type) {
    this.userMessage = type;
    setTimeout(() => {
      this.userMessage = '';
    }, 6000);
  }
}
