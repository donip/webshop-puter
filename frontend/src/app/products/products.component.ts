import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as faker from 'faker';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  title = 'Final Countdown';
  categories = ['Hűtő', 'Kávéfőző', 'Légkondi', 'Mosogatógép', 'Mosógép', 'Porszívó'];
  brands = ['AEG', 'Bosch', 'Indesit', 'Samsung', 'Siemens', 'Whirlpool'];
  adat = {
    productname: '',
    brand: '',
    price: '',
    category: ''
  };
  uploadFile: File = null;
  checker: any;
  datas: any;
  selectedProduct: any;
  options = new RequestOptions({ withCredentials: true });
  constructor(public http: Http) {
    this.getAll();
  }

  ngOnInit() {
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
    this.http.get('http://localhost:8080/product', this.options).subscribe(
      data => {
        this.errorHandling(data);
      });
  }
  /**
   * Egy adott lekért adatot ad vissza, későbbiekben szükséges lesz.
   * @param id Az egyedi azonosító, ami speciálisan a keresett adatra mutat.
   */
  getOne(id) {
    this.http.get('http://localhost:8080/product/url/' + id, this.options).subscribe(
      data => {
        this.errorHandling(data);
      });
  }
  /**
   * Egy adott termék oldalára navigál át - még folyamatban van, későbbiekben lesz rá szükség.
   * @param product A termék, aminek az oldalára navigálunk.
   */
  navigate(product) {
    this.selectedProduct = product;
    this.http.get('http://localhost:8080/product/url/' + this.selectedProduct['producturl'], this.options).subscribe(
      data => {
        console.log(data);
      });
  }
  /**
   * A file uploadhoz esszenciális függvény.
   * @param event Az esemény amit figyel.
   */
  onFileSelected(event) {
    this.uploadFile = <File>event.target.files[0];
  }
  /**
   * A file uploadhoz esszenciális függvény, ami átadja a szükséges adatokat egy új FormData példánynak,
   * majd visszatér azzal a példánnyal.
   * @param param Az átadáshoz szükséges adatokat ebből a paraméterből nyeri ki.
   */
  bodyCreator(param) {
    const body = new FormData();
    body.append('productname', param.productname);
    body.append('category', param.category);
    body.append('price', param.price);
    body.append('brand', param.brand);
    if (this.uploadFile) {
      body.append('uploadimg', this.uploadFile, this.uploadFile.name);
    }
    return body;
  }
  /**
   * Új terméket hoz létre.
   */
  creator() {
    const body = this.bodyCreator(this.adat);
    this.http.post('http://localhost:8080/product', body, this.options).subscribe(
      data => {
        console.log(data);
        this.getAll();
        if (!JSON.parse(data['_body']).errors) {
          alert('A termék hozzáadásra került.');
        } else {
          alert('Hozzáadás sikertelen.');
        }
      });
  }
  /**
   * Meglévő terméket frissít.
   * @param product Maga a frissítendő termék.
   */
  updater(product) {
    this.selectedProduct = product;
    const body = this.bodyCreator(product);
    this.checker = prompt('Biztosan frissíted a terméket?');
    if (this.checker === 'y') {
      this.http.put('http://localhost:8080/product/' + this.selectedProduct['_id'], body, this.options).subscribe(
        data => {
          console.log(data);
          this.getAll();
          alert('A termék sikeresen frissítve.');
        });
    } else {
        this.getAll();
        alert('Sikertelen frissítés.');
    }
  }
  /**
   * Egy terméket töröl az adatbázisból.
   * @param product Maga a törlendő termék.
   */
  rowDeleter(product) {
    this.selectedProduct = product;
    this.checker = prompt('Biztosan törlöd a terméket? y/n');
    if (this.checker === 'y') {
      this.http.delete('http://localhost:8080/product/' + this.selectedProduct['_id'], this.options).subscribe(
        data => {
          console.log(data);
          this.getAll();
          alert('A termék sikeresen törölve!');
        });
    } else {
      this.getAll();
      alert('Sikertelen törlés.');
    }
  }
  /**
  * Fake product generator
  * @param {string} brand - random brand from predefined list
  * @param {string} category - random category from predefined list
  * @param {string} productname - initial letters of brand and category + random number
  * @param {string} price - random number toString!
  * @todo Comment this out after testing, as this feature is only for developers.
  */
  createFakeProduct() {
    this.adat.brand = this.brands[Math.floor(Math.random() * this.brands.length)];
    this.adat.category = this.categories[Math.floor(Math.random() * this.categories .length)];
    this.adat.productname = this.adat.brand.split('')[0] + this.adat.category.split('')[0] + Math.ceil(Math.random() * 10) * 100;
    this.adat.price = (faker.commerce.price().toString());
    console.log(this.adat.productname);
    this.creator();
  }
}
