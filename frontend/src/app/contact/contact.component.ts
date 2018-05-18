import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
declare const google: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  title = 'My first AGM project';
  lat = 47.4977973;
  lng = 19.0403225;

  constructor() { }

  ngOnInit() {
  }

}
