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
  a = Math.floor(Math.random() * Math.floor(200));
  b = Math.floor(Math.random() * Math.floor(200));
  c = Math.floor(Math.random() * Math.floor(200));
  d = Math.floor(Math.random() * Math.floor(this.a));
  pieChartData =  {
    chartType: 'ColumnChart',
    dataTable: [
      ['0', '0'],
      ['Felhasználók',     this.a],
      ['Eladott termék',      this.b],
      ['Termék ára',  this.d],
      ['Nem vásárló felhasználók', (this.b-this.a)*(-1)],
      ['SEgy főre eső átlagos bevétel',    (this.c*this.d)/this.b]
    ],
    options: {'title': 'Statisztika',
    legend: 'none'},
  };
  pieChartData2 =  {
    chartType: 'ColumnChart',
    dataTable: [
      ['0', '0'],
      ['Felhasználók',     this.a],
      ['Eladott termék',      this.b],
      ['Termék ára',  this.d],
      ['Nem vásárló felhasználók', (this.b-this.a)*(-1)],
      ['SEgy főre eső átlagos bevétel',    (this.c*this.d)/this.b*2]
    ],
    options: {'title': 'Statisztika',
    legend: 'none'},
  };

  constructor() {
    
   }

  ngOnInit() {
  
    }
  }



