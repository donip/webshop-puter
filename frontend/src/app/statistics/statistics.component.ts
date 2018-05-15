import { Component, OnInit, NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { ProductsComponent } from '../products/products.component';

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
  options = new RequestOptions({ withCredentials: true });
  income: number;
  sumuser: any;
  pieChartData = {
    chartType: 'ColumnChart',
    dataTable: [
      ['0', '0'],
      ['Felhasználók', this.sumuser],
      ['Eladott termék', this.b],
      ['Termék ára', this.d],
      ['Nem vásárló felhasználók', (this.b - this.sumuser) * (-1)],
      ['SEgy főre eső átlagos bevétel', (this.c * this.d) / this.b]
    ],
    options: {
      'title': 'Statisztika',
      legend: 'none'
    },
  };
  pieChartData2 = {
    chartType: 'ColumnChart',
    dataTable: [
      ['0', '0'],
      ['Felhasználók', this.sumuser],
      ['Eladott termék', this.b],
      ['Termék ára', this.d],
      ['Nem vásárló felhasználók', (this.b - this.sumuser) * (-1)],
      ['SEgy főre eső átlagos bevétel', (this.c * this.d) / this.b * 2]
    ],
    options: {
      'title': 'Statisztika',
      legend: 'none'
    },
  };

  constructor(public http: Http) {
    this.getUsers();
    this.getProducts();
  }

  ngOnInit() {
  }
  getProducts() {
    this.http.get('http://localhost:8080/product', this.options)
      .subscribe(getProducts => {
        this.productcat = JSON.parse(getProducts['_body']);
        console.log(this.productcat);
        this.Income();
      });
  }
  getUsers() {
    this.http.get('http://localhost:8080/useradmin', this.options)
      .subscribe(getUsers => {
        this.allusers = JSON.parse(getUsers['_body']);
        this.sumuser = this.Lengthening(this.allusers);
      });
  }
  Income() {
    this.income = 0;
    for (let i = 0; i < (this.productcat).length; i++) {
      this.income += ((this.productcat)[i]).price;
    }
    console.log(this.income);
  }
  Lengthening(array) {
    return array.length;
  }
}
