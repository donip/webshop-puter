import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  usernumber = 200;
  productnumber = 700;
  buyernumber = 1200;
  productprice = 200;
};

Constructor () {

   drawChart() {
    var data = google.visualization.arrayToDataTable([
    ['Felhasználók', this.usernumber],
    ['Rendelt termék', this.productnumber],
    ['Vevők', this.buyernumber]
  ]);
}
};

Constructor ();