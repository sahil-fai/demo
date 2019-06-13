import { Component, OnInit } from '@angular/core';
import json from './res.json';

@Component({
  selector: 'app-single-ledger-business-list',
  templateUrl: './single-ledger-business-list.component.html',
  styleUrls: ['./single-ledger-business-list.component.less']
})
export class SingleLedgerBusinessListComponent implements OnInit {
  title="Business(s) List";
  companylist: Array<any>;
  totalRec : number;
  page: number = 1;
  length:number;
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = true;
  public responsive: boolean = true;
  public selectedValue = 3;
  public labels: any = {
      previousLabel: 'Prev',
      nextLabel: 'Next',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };

  public config = {
    itemsPerPage: this.selectedValue,
    currentPage: 1,
    totalItems: this.totalRec,
    id:"companylis"
  };

  public pageNumber = 1;
  public pageSizeOptions: number[] = [3,15,25];
  public numberOfpages: number[];
  
  constructor() { 
    this.companylist=json;
    this.totalRec = this.companylist.length;
    console.log(this.companylist.length);
    console.log(this.page);
  }
 
  ngOnInit() {
    
  }

}
