
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
  d = new Date();
  currentmonth = this.d.getMonth();
  newDate: any;
  allusers: any;
  allorders: any;
  options = new RequestOptions({ withCredentials: true });
  income: any;
  sumuser: any;
  sumbuyer: any;
  sumsoldstuff: any;
  currentdate = '2018-05-16T13:21:04.430Z';
  ordersofoneday = 0;

  chartData: any = [
    ['0', 'Napra leosztott rendelések'],
    ['1.', 10],
    
  ];

  pieChartData: any = {
    chartType: 'ColumnChart',
    dataTable:
      this.chartData,
    options: {
      'title': 'Havi rendelések',
      hAxis: {title: "Time"},
      legend: 'none'
    },
  };


  constructor(public http: Http) {
    this.getUsers();
    this.getOrders();

  }

  ngOnInit() {
  }

  getUsers() {
    this.http.get('http://localhost:8080/useradmin', this.options)
      .subscribe(getUsers => {
        this.allusers = JSON.parse(getUsers['_body']);
        this.sumuser = this.Lengthening(this.allusers);
      });
      console.log(typeof this.chartData);
  }

  getOrders() {
    this.http.get('http://localhost:8080/order', this.options)
      .subscribe(getOrders => {
        this.allorders = JSON.parse(getOrders['_body']);
        this.Income(this.allorders);
        console.log(this.allorders);
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
          
        this.newDate = new Date(adat[i].createdAt);
        if (this.newDate.getMonth() === this.currentmonth) {
          this.ordersofoneday += adat[i].products[j].quantity;
          
        }
        (this.chartData).push([`${i+1}`, 6 + i]);
      }
      this.sumsoldstuff += sumsold;
      this.income += sumprice;
    }

  }
  Lengthening(array) {
    return array.length;
  }
  populateChart(data) {
    for (let i = 0; i < data.length; i++) {
      this.pieChartData.dataTable.push(data[i]);
    }
  }
}
