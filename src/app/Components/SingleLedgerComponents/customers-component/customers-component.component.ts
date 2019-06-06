import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers-component',
  templateUrl: './customers-component.component.html',
  styleUrls: ['./customers-component.component.less']
})
export class CustomersComponentComponent implements OnInit {
  title="Customers";
  status= [
    {value: 'Pendind', viewValue: 'Pendind'},
    {value: 'Not Connected', viewValue: 'Not Connected'}
  ];
  constructor() { }
  
  ngOnInit() {
  }

}
