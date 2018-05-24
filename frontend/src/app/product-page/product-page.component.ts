import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
error = false;
comments: Array<object>;
userId: string;
productData = {
  productname: '',
  brand: '',
  price: '',
  imgurl: '',
  comments: [],
  category: '',
  _id: '',
};
actualComment = {
  post: '',
};
newComment = {
  post: '',
};
cats = [];
chosenOne: any;
url: any;
canComment: boolean;
options = new RequestOptions({ withCredentials: true });
  constructor(private route: ActivatedRoute, public http: Http, public cart: CartService) {
    this.route.params.subscribe(params =>  {
      this.url = params;
      this.cart.getQuantity();
    });
   }
   navigate() {
    this.http.get('http://localhost:8080/product/url/' + this.url.url, this.options).subscribe(
      data => {
        const body = JSON.parse(data['_body']);
        this.productData = body;
        console.log(this.productData);
        this.getCat();
        if (body === null || body.error ) {
           this.error = true;
        }
      });
  }
   toTheCart(product) {
    this.cart.addToCart(product);
    this.cart.getQuantity();
  }
  getCat() {
    this.http.get('http://localhost:8080/category', this.options).subscribe(
      data => {
        this.cats = JSON.parse(data['_body']);
        for (let i = 0; i < this.cats.length; i++) {
          if (this.productData.category === this.cats[i]['_id']) {
            this.chosenOne = this.cats[i].title;
          }
        }
      }
    );
  }
  /**
   * Lekéri a commenteket majd szűri a product id alapján
   */
  getComment() {
    this.http.get('http://localhost:8080/comment', this.options).subscribe(
      data => {
        this.comments = JSON.parse(data['_body']);
        this.comments = this.comments.filter(el => el['productid'] === this.productData._id);
        console.log('comment', this.comments);
      }
    );
  }
  /**
   * Generál egy commentet, a body-t a newCommentből a lekért userId-ból és a productid-ból rakja össze
   */
  createComment() {
    const body = {post: this.newComment.post, userid: this.userId, productid: this.productData._id};
    this.newComment.post = '';
    this.http.post(`http://localhost:8080/comment/`, body, this.options).subscribe(
      data => {
        if (!JSON.parse(data['_body']).errors && !JSON.parse(data['_body']).errmsg) {
          this.getComment();
          alert('Az értékelés hozzáadásra került.');
        } else if (JSON.parse(data['_body']).errmsg) {
          alert(`Hozzáadás sikertelen. Hiba: ${JSON.parse(data['_body']).errmsg}`);
        } else {
          alert('Hozzáadás sikertelen.');
        }
      }
    );
  }
  /**
   * Mododítja a commentet
   * @param {object} comment modosított comment body-ja
   */
  modifyComment(comment) {
    this.http.put(`http://localhost:8080/comment/${comment._id}`, comment, this.options).subscribe(
      data => {
        if (!JSON.parse(data['_body']).errors && !JSON.parse(data['_body']).errmsg) {
          this.getComment();
          alert('Az értékelés módosítva.');
        } else if (JSON.parse(data['_body']).errmsg) {
          alert(`Módosítás sikertelen. Hiba: ${JSON.parse(data['_body']).errmsg}`);
        } else {
          alert('Módosítás sikertelen.');
        }
      }
    );
  }
  /**
   * Kitörli id alapján a commentet
   * @param {object} comment , az id miatt kell
   */
  deleteComment(comment) {
    this.http.delete(`http://localhost:8080/comment/${comment._id}`, this.options).subscribe(
      data => {
        if (!JSON.parse(data['_body']).errors && !JSON.parse(data['_body']).errmsg) {
          this.getComment();
          alert('Az értékelés törölve.');
        } else if (JSON.parse(data['_body']).errmsg) {
          alert(`Törlés sikertelen. Hiba: ${JSON.parse(data['_body']).errmsg}`);
        } else {
          alert('Törlés sikertelen.');
        }
      }
    );
  }
  /**
   * Lekéri a megrendeléseket
   */
  getOrders() {
    this.http.get('http://localhost:8080/order/', this.options)
      .subscribe(data => {
        const d = (JSON.parse(data['_body'])).filter(element => element.customer._id === this.userId);
          for (let i = 0; i < d.length; i++) {
            for (let j = 0; j < d[i].products.length; j++) {
              if (d[i].products[j]['product']._id === this.productData._id) {
                this.canComment = true;
                console.log(this.canComment);
                return;
              }
            }
          }
      });
  }
  /**
   * Lekéri a bejelentkezett felhasználót, majd menti a userId-ba az id-ját
   */
  profile() {
    this.http.get('http://localhost:8080/user/profile/', this.options)
      .subscribe(data => {
        const userData = JSON.parse(data['_body']);
        this.userId = userData['user']._id;
      });
  }
  ngOnInit() {
    this.profile();
    this.getOrders();
    this.navigate();
    this.getComment();
    }
}
