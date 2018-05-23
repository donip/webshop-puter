import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  d = new Date();
  cY = (this.d.getFullYear());
  constructor() { }

  ngOnInit() {
  }
}
