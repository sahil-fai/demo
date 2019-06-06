import { Component, OnInit } from '@angular/core';
//var json = require('./res.json');

@Component({
  selector: 'app-single-ledger-business-list',
  templateUrl: './single-ledger-business-list.component.html',
  styleUrls: ['./single-ledger-business-list.component.less']
})
export class SingleLedgerBusinessListComponent implements OnInit {
  title="Business(s) List";
  companylist: any;
  
  constructor() { 
    this.companylist=[];
  }
 
  ngOnInit() {
  }

}
