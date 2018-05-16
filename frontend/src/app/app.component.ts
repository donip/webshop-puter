import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

const URL = 'http://localhost:8080/product';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    user: any = {
        username: 'YOUR RESGISTERED USERNAME',
        password: 'YOUR RESGISTERED USER PASSWORD'
    };

    public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
    options = new RequestOptions({ withCredentials: true });
    baseUrl = 'http://localhost:8080/user/';

    constructor(public http: Http, private el: ElementRef) {

    }

    // upload() {
    //     const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    //     const fileCount: number = inputEl.files.length;
    //     const formData = new FormData();
    //     if (fileCount > 0) {
    //         for (let i = 0; i < fileCount; i++) {
    //             formData.append('file', inputEl.files.item(i));
    //         }
    //         const headers = new Headers();
    //         headers.append('Accept', 'application/json');
    //         const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    //             this.http.post('http://localhost:8080/product' + token, formData, { headers: Headers }).map(res => res.json())
    //             .catch(error => Observable.throw(error))
    //             .subscribe(
    //                 data => console.log(data),
    //                 error => console.log(error)
    //         );
    //     }
    // }


    ngOnInit() {
        this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            console.log('ImageUpload:uploaded:', item, status, response);
        };
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
