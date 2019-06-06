import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoices-component',
  templateUrl: './invoices-component.component.html',
  styleUrls: ['./invoices-component.component.less']
})
export class InvoicesComponentComponent implements OnInit {
  title="Invoices";
  status= [
    {value: 'Pendind', viewValue: 'Pendind'},
    {value: 'Not Connected', viewValue: 'Not Connected'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
