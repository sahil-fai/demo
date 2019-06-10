import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendors-component',
  templateUrl: './vendors-component.component.html',
  styleUrls: ['./vendors-component.component.less']
})
export class VendorsComponentComponent implements OnInit {
title="Vendors";
status= [
  {value: 'Pendind', viewValue: 'Pendind'},
  {value: 'Not Connected', viewValue: 'Not Connected'}
];
  constructor() { }

  ngOnInit() {
  }

}
