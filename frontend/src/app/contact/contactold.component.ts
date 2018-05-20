import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  @ViewChild('f') form: any = {
    email: '',
    message: ''
  };
  form1: any = {
    email: '',
    message: ''
  };
  baseUrl = 'http://localhost:8080/send/';
  constructor() { }


  ngOnInit() {
  }

  onSubmit() {
    console.log('Form submitted');
    console.log(this.form1.email);
    this.form.reset();
  }

}

