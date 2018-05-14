import { Component, OnInit, NgModule} from '@angular/core';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
@NgModule({
  imports: [
    Ng2GoogleChartsModule,
  ],
})
export class StatisticsComponent {
  usernumber = 200;
  productnumber = 700;
  buyernumber = 1200;
  productprice = 200;
  pieChartData =  {
    chartType: 'PieChart',
    dataTable: [
      ['Work',     11],
      ['Eat',      2],
    ],
  };
}