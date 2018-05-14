import { Component } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    user: any = {
        username: 'YOUR RESGISTERED USERNAME',
        password: 'YOUR RESGISTERED USER PASSWORD'
    };

    options = new RequestOptions({ withCredentials: true });
    baseUrl = 'http://localhost:8080/user/';

    constructor(public http: Http) {

    }

    profile() {
        this.http.get(this.baseUrl + 'profile', this.options)
            .subscribe(data => {
                console.log(data['_body']);
            });
    }

    login() {
        this.http.post(this.baseUrl + 'login', this.user, this.options)
            .subscribe(data => {
                console.log(data['_body']);
            });
    }

    logout() {
        this.http.get(this.baseUrl + 'logout', this.options)
            .subscribe(data => {
                console.log(data['_body']);
            });
    }
}
