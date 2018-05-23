import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  selectedCategory: any;
  datas: any;
  adat: Object = {
    category: '',
    rank: '',
  };
  category: Array<any>;
  options = new RequestOptions({ withCredentials: true });

  constructor(public http: Http, public cart: CartService) {
    this.getAll();
    this.cart.getQuantity();
  }

  /**
   * A szerverről lekért adatokat parse-olja a megjelenítés érdekében.
   * @param res Maga a data, amit a szerverről lekérünk.
   */
  errorHandling(res) {
    res = JSON.parse(res['_body']);
    if (res.error) {
      console.error('API error:' + res.error);
    } else {
      this.datas = res;
    }
  }
  /**
   * Az összes lekért adatot listázza.
   */
  getAll() {
    this.http.get('http://localhost:8080/category/', this.options).subscribe(
      data => {
        this.errorHandling(data);
      });
  }
  /**
   * Egy adott lekért adatot ad vissza, későbbiekben szükséges lesz.
   * @param id Az egyedi azonosító, ami speciálisan a keresett adatra mutat.
   */
  getOne(id) {
    this.http.get('http://localhost:8080/category/' + id, this.options).subscribe(
      data => {
        this.errorHandling(data);
      });
  }

  /**
   * Új terméket hoz létre.
   */
  creator() {
    const body = this.adat;
    this.http.post('http://localhost:8080/category', body, this.options).subscribe(
      data => {
        console.log(data);
        this.getAll();
        if (!JSON.parse(data['_body']).errors && !JSON.parse(data['_body']).errmsg) {
          alert('A kategoria hozzáadásra került.');
        } else if (JSON.parse(data['_body']).errmsg) {
          alert(`Hozzáadás sikertelen. Hiba: ${JSON.parse(data['_body']).errmsg}`);
        } else {
          alert('Hozzáadás sikertelen.');
        }
      });
  }
  /**
   * Meglévő terméket frissít.
   * @param category Maga a frissítendő termék.
   */
  updater(category) {
    this.selectedCategory = category;
    const body = {
      title: category.title,
      rank: category.rank,
    };
    console.log(body);
      this.http.put('http://localhost:8080/category/' + this.selectedCategory['_id'], body, this.options).subscribe(
        data => {
          console.log(data);
          this.getAll();
          alert('A kategória sikeresen frissítve.');
        });
  }
  /**
   * Egy terméket töröl az adatbázisból.
   * @param product Maga a törlendő termék.
   */
  rowDeleter(category) {
    this.selectedCategory = category;
      this.http.delete('http://localhost:8080/category/' + this.selectedCategory['_id'], this.options).subscribe(
        data => {
          console.log(data);
          this.getAll();
          alert('A kategória sikeresen törölve!');
        });
  }
  ngOnInit() {
  }

}
