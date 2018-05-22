import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  adat = {
    title: '',
    rank: ''
  };
  datas: any;
  selectedCategory: any;
  options = new RequestOptions({ withCredentials: true });
  constructor(public http: Http) {
    this.getAllC();
  }

  ngOnInit() {
  }

  errorHandling(res) {
    res = JSON.parse(res['_body']);
    if (res.error) {
      console.error('API error:' + res.error);
    } else {
      this.datas = res;
    }
  }

  getAllC() {
    this.http.get('http://localhost:8080/category', this.options).subscribe(
      data => {
        this.errorHandling(data);
      });
  }

  creator() {
    this.http.post('http://localhost:8080/category', this.adat, this.options).subscribe(
      data => {
        console.log(data);
        this.getAllC();
      }
    );
  }

  updater(category) {
    this.selectedCategory = category;
    this.http.put('http://loalhost:8080/category/' + this.selectedCategory['_id'], this.selectedCategory, this.options).subscribe(
      data => {
        console.log(data);
        this.getAllC();
      }
    );
  }

  deleter(category) {
    this.selectedCategory = category;
    this.http.delete('http://localhost:8080/category/' + this.selectedCategory['_id'], this.options).subscribe(
      data => {
        console.log(data);
        this.getAllC();
      }
    );
  }
}
