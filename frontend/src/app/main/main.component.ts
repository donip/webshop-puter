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
  lastTenProducts: any;
  selectedCategory: any;
  options = new RequestOptions({ withCredentials: true });
  constructor(public http: Http) {
    this.getAllC();
    this.getAllProducts();
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
  productErrorHandling(res) {
    res = JSON.parse(res['_body']);
    if (res.error) {
      console.error('API error:' + res.error);
    } else {
      this.lastTenProducts = res;
      this.filterProducts();
    }
  }

  getAllC() {
    this.http.get('http://localhost:8080/category', this.options).subscribe(
      data => {
        this.errorHandling(data);
      });
  }
  /**
   * Lekéri a termékeket
   */
  getAllProducts() {
    this.http.get('http://localhost:8080/product', this.options).subscribe(
      data => {
        this.productErrorHandling(data);
      });
  }
  /**
   * szűri az utolsó 10 legfrissebb productra a módosítás szerint
   */
  filterProducts() {
    this.lastTenProducts.sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);
      if (dateA < dateB) {
        return 1;
      }
      if (dateA > dateB) {
        return -1;
      }
      // a-nak egyenlőnek kell lennie b-vel
      return 0;
    });
  this.lastTenProducts.length = 10;
  console.log(this.lastTenProducts)
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
