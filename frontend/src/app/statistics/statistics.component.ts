
import { Component, OnInit, NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { ProductsComponent } from '../products/products.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
@NgModule({
  imports: [
    ,
  ],
})

export class StatisticsComponent implements OnInit {
  b = Math.floor(Math.random() * Math.floor(200));
  c = Math.floor(Math.random() * Math.floor(200));
  d = Math.floor(Math.random() * Math.floor(200));
  productcat: any;
  allusers: any;
  allorders: any;
  options = new RequestOptions({ withCredentials: true });
  income: number;
  sumuser: number;
  sumbuyer: number;
  sumsoldstuff: number;
  pieChartData = {
    chartType: 'ColumnChart',
    dataTable: [
      ['0', '0'],
      ['Felhasználók', this.allusers],
      ['Eladott termék', this.b],
      ['Termék ára', this.d],
      ['Nem vásárló felhasználók', (this.b - this.allusers) * (-1)],
      ['SEgy főre eső átlagos bevétel', (this.c * this.d) / this.b]
    ],
    options: {
      'title': 'Statisztika',
      legend: 'none'
    },
  };

  constructor(public http: Http) {
    this.getUsers();
    this.getProducts();
    this.getOrders();
  }

  ngOnInit() {
  }
  getProducts() {
    this.http.get('http://localhost:8080/product', this.options)
      .subscribe(getProducts => {
        this.productcat = JSON.parse(getProducts['_body']);
      });
  }
  getUsers() {
    this.http.get('http://localhost:8080/useradmin', this.options)
      .subscribe(getUsers => {
        this.allusers = JSON.parse(getUsers['_body']);
        this.sumuser = this.Lengthening(this.allusers);
      });
  }

  getOrders() {
    this.http.get('http://localhost:8080/order', this.options)
  .subscribe(getOrders => {
    this.allorders = JSON.parse(getOrders['_body']);
  this.Income(this.allorders);
  });
}

  Income(adat) {
    this.income = 0;
    this.sumsoldstuff = 0;
    let sumprice = 0;
    let sumsold = 0;
    this.sumbuyer = this.Lengthening(adat);
    for (let i = 0; i < adat.length; i++) {
      for (let j = 0; j < adat[i].products.length; j++) {
        sumprice += adat[i].products[j].product.price * adat[i].products[j].quantity;
        sumsold += adat[i].products[j].quantity;
      }
      this.sumsoldstuff += sumsold;
      this.income += sumprice;
    }
  }
  Lengthening(array) {
    return array.length;
  }

}
