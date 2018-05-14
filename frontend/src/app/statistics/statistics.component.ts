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
  usernumber = 200;
  productnumber = 700;
  buyernumber = 1200;
  productprice = 200;
  pieChartData =  {
    chartType: 'ColumnChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ],
    options: {'title': 'Tasks'},
  };

  constructor() {
    
   }

  ngOnInit() {
    
  }

}

