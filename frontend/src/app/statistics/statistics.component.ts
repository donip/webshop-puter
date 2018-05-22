
import { Component, NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { ProductsComponent } from '../products/products.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})


export class StatisticsComponent {
  pieChartData: any = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Nap', 'Bevétel'],
    ],
    options: {
      'title': 'Havi bevétel napokra leosztva',
      is3D: true,
      legend: 'none',
      height: 500
    },
  };
  d = new Date();
  currentmonth = this.d.getMonth();
  equalday;
  newDate: any;
  allusers: any;
  allorders: Array<Object>;
  options = new RequestOptions({ withCredentials: true });
  income: any;
  sumuser: any;
  sumbuyer: any;
  sumsoldstuff: any;
  currentdate = '2018-05-16T13:21:04.430Z';
  ordersofoneday = 0;

  selectedYear = '2018';
  selectedMonth = '05';
  dataToPush: [String, Number];
  displayChart: Boolean = false;

  chartData = [];

  constructor(public http: Http) {
    this.getUsers();
    this.getOrders();
    // this.pieChartData.dataTable = [['Rendelések', 'Napra leosztott rendelések'], ];

  }
  /**
   * Felhasználó adatok lekérése és betöltése
   */
  getUsers() {
    this.http.get('http://localhost:8080/useradmin', this.options)
      .subscribe(getUsers => {
        this.allusers = JSON.parse(getUsers['_body']);
        this.sumuser = this.Lengthening(this.allusers);
      });
      console.log(typeof this.chartData);
  }
  /**
   * Rendelési adatok lekérése és betöltése
   */
  getOrders() {
    this.http.get('http://localhost:8080/order', this.options)
      .subscribe(getOrders => {
        this.allorders = JSON.parse(getOrders['_body']);
        this.Income(this.allorders);
        this.filterOrdersBySelectedMonth();
      });
  }
  /**
   * selectedYear változóban megadott évre szűrés
   * majd selectedMonth változóban tárolt hónapra szűrés
   * Szűrés filter beépített tömb metódussal
   * Az évek és hónapok adatai a dátum String állapotában Substring metódussal kiemelve
   *
   * Hónapra leszűrt tömb átadása paraméterként sumIncomeByDay() függvénynek
   */
  filterOrdersBySelectedMonth() {
    const ordersThisYear = this.allorders.filter(order => order['createdAt'].substring(0, 4) === this.selectedYear);
    const ordersThisMonth = ordersThisYear.filter(order => order['createdAt'].substring(5, 7) === this.selectedMonth);
    this.sumIncomeByDay(ordersThisMonth);
  }
  /**
   * daysThisMonth() függvény meghívása - return: a kiválasztott hónap napjainak száma
   * Annyi mező létrehozása dinamikusan az x tengelyen, ahány nap van ebben a hónapban (szökőév is figyelembevéve)
   * Aaponként külön filter szűrés a tömbön
   * Az egyes redelések termékeinek (egységára * mennyisége) sum-ban összeadódik, így adva az adott napi bevételt
   * Adott nap és napi összbevétel átadása generateChartData()-nak
   * Ha minden nap megvan populateChart() feltölti a grafikont.
   * @param filteredOrders: Array - kiválasztott hónapra szűrt megrendeléseket tartalmazó tömb
   *
   */
  sumIncomeByDay(filteredOrders) {
    const days = this.daysInMonth(this.selectedYear, this.selectedMonth);
    let sum = 0;
    // this.pieChartData.dataTable = [['Rendelések', 'Napra leosztott rendelések']];
    for (let i = 1; i <= days; i++) {
      sum = 0;
      // tslint:disable-next-line:triple-equals
      const oneDay = filteredOrders.filter(order => order['createdAt'].substring(8, 10) == i);
      if (oneDay.length > 0) {
        for (let j = 0; j < oneDay.length; j++) {
          for (let k = 0; k < oneDay[j].products.length; k++) {
            sum += (oneDay[j].products[k].product.price * oneDay[j].products[k].quantity);
          }
        }
      }
      this.generateChartData(i, sum);
    }
    this.populateChart(this.chartData);
  }
  /**
   * Nap és bevétel adat dataToPush tömb értékadása
   * Fontos - nap Stringgé alakítása
   * Majd chartData gyűjtőtömbbe betöltés
   * @param day : Number - nap (1-31)
   * @param income : Number - bevétel összege
   */
  generateChartData(day, income) {
    day = day.toString();
    this.dataToPush = [day, income];
    this.chartData.push(this.dataToPush);
  }
  /**
   * Feltölti a Google Chart-ot a kigyűjtött adatokkal
   * Ha kész újra assign-olja a pieChartData objektumot, hogy az Angular frissítse a chartot
   * @param data : Array - Grafikon összegyűjtött előzetes adatai
   */
  populateChart(data) {
    for (let i = 0; i < data.length; i++) {
      this.pieChartData.dataTable.push(data[i]);
    }
    const clone = JSON.parse(JSON.stringify(this.pieChartData));
    this.pieChartData = clone;
    this.displayChart = true;
  }
  /**
   * Visszaadja adot év adott hónapjában a napok számát
   * Figyelembe veszi a szökőéveket is
   * @param year ÉV
   * @param month Hónap
   * @returns : Number - adott év kiválasztott hónapjában lévő napok száma
   */
  daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  Lengthening(array) {
    return array.length;
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
      }
      this.sumsoldstuff += sumsold;
      this.income += sumprice;
    }
  }
}
