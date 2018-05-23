import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as faker from 'faker';
import { validateConfig } from '@angular/router/src/config';
import { Body } from '@angular/http/src/body';
import { Router } from '@angular/router';

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
    category: { _id: '', title: '' },
  };
  uploadFile: File = null;
  checker: any;
  datas: any;
  cats: any;
  catData: any;
  selectedProduct: any;
  options = new RequestOptions({ withCredentials: true });
  constructor(public http: Http, public router: Router) {
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
      console.log(this.datas);
    }
  }
  /**
   * Az összes lekért adatot listázza.
   */
  getAll() {
    this.http.get('http://localhost:8080/product', this.options).subscribe(
      data => {
        const d = JSON.parse(data['_body']);
        if (d.err) {
          this.router.navigate(['/main']);
        } else {
          this.errorHandling(data);
          this.getCategory();
        }
      });
  }

  getCategory() {
    this.http.get('http://localhost:8080/category', this.options).subscribe(
      data => {
        this.catData = JSON.parse(data['_body']);
        console.log(this.catData);
      }
    );
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
    body.append('category', param.category['_id']);
    body.append('price', param.price);
    body.append('brand', param.brand);
    if (this.uploadFile) {
      body.append('uploadimg', this.uploadFile, this.uploadFile.name);
    }
    console.log(param.category['_id']);
    return body;
  }
  /**
   * Új terméket hoz létre.
   */
  creator() {
    const body = this.bodyCreator(this.adat);
    console.log(this.adat);
    this.http.post('http://localhost:8080/product', body, this.options).subscribe(
      data => {
        console.log(data);
        this.getAll();
        if (!JSON.parse(data['_body']).errors && !JSON.parse(data['_body']).errmsg) {
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
          // this.catUpdater(this.selectedProduct);
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
    this.adat.category._id = '5b03eafd02ec481b405812d7'; // this.categories[Math.floor(Math.random() * this.categories .length)];
    this.adat.productname = 'def'; // this.adat.brand.split('')[0] + this.adat.category.split('')[0] + Math.ceil(Math.random() * 10) * 100;
    this.adat.price = (faker.commerce.price().toString());
    console.log(this.adat.productname);
    this.creator();
  }
  /**
   * Comment írás termékhez (abban az esetben jogosult erre a felhasználó, ha már rendelt)
   */
  comment(product) {
    const body = { 'productname': 'újnév' };
    this.http.patch('http://localhost:8080/product/5b04758301bc500fa4e3267e', body, this.options).subscribe(
      data => {
        console.log(data);
        this.getAll();
        alert('Patch ok');
      });
  }
}
