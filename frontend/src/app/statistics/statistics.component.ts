import { Component, OnInit, NgModule} from '@angular/core';


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
  usernumber = 400;
  productnumber = 300;
  buyernumber = 200;
  productprice = 40;
  pieChartData =  {
    chartType: 'ColumnChart',
    dataTable: [
      ['', ''],
      ['Felhasználók',     this.usernumber],
      ['Eladott termék',      this.productnumber],
      ['Termék ára',  this.productprice],
      ['Nem vásárló felhasználók', (this.buyernumber-this.usernumber)*(-1)],
      ['SEgy főre eső átlagos bevétel',    (this.productnumber*this.productprice)/this.buyernumber]
    ],
    options: {'title': 'Statisztika'},
  };

  constructor() {
    
   }

  ngOnInit() {
    
  }

}

