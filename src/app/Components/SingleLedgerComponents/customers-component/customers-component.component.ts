import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-customers-component',
  templateUrl: './customers-component.component.html',
  styleUrls: ['./customers-component.component.less']
})
export class CustomersComponentComponent implements OnInit {
  title="Customers";
  selected = ['Active'];

  status= [
    {value: 'Active', viewValue: 'Active'},
    {value: 'Inactive', viewValue: 'Inactive'}
  ];
  StatusList= ['Active','Inactive'];
  constructor() { }
  
  ngOnInit() {
  }

}
