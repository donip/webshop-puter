
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
  allusers: any;
  allorders: any;
  options = new RequestOptions({ withCredentials: true });
  income: number;
  sumuser: number;
  sumbuyer: number;
  sumsoldstuff: number;
  chartData: any = [
    ['Task', 'Forint']
  ];
  pieChartData = {
    chartType: 'ColumnChart',
    dataTable:
      this.chartData,
    options: {
      'title': 'Statisztika',
      legend: 'none'
    },
  };

  constructor(public http: Http) {
    this.getUsers();
    this.getOrders();
    this.createDataForChart(this.allorders);
  }

  ngOnInit() {
  }
  createDataForChart(data) {

    const now = new Date();
    for (let i = 1; i <= now.getDate(); i++) {
      this.chartData.push([i, 0]);
    }
    console.log(this.chartData);
    this.formatChartData();
  }
  formatChartData() {
    this.chartData.sort((a, b) => a[0] - b[0]);
    for (let i = 1; i < this.chartData.length; i++) {
      this.chartData[i][0] += '.';
    }
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
/** https://github.com/peterbanfi/Lighting-Foo-bar/blob/chart/frontend/src/app/statistics/statistics.component.ts
*/