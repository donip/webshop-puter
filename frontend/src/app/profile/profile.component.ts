import { Component } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  profileData: Object = {
    username: '',

  };

  baseUrl: String = 'http://localhost:8080/user/';
  options = new RequestOptions({ withCredentials: true });

  constructor(public http: Http) {
    this.profile();
  }

  profile() {
    this.http.get(this.baseUrl + 'profile', this.options)
      .subscribe(data => {
        this.profileData = (JSON.parse(data['_body'])).user;
      });

  }
}
