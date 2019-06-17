import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit, ViewChild, } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import json from './res.json';
import { MatPaginator } from '@angular/material/paginator';
import {MatBottomSheet, MatBottomSheetRef, MatBottomSheetConfig} from '@angular/material/bottom-sheet';
import { BottomSheetOverviewExampleSheetComponent } from 'src/app/Shared/bottom-sheet-overview-example-sheet/bottom-sheet-overview-example-sheet.component';
export interface PeriodicElement {
  Number: string;
  Date: string;
  DueDate: string;
  Vendor: string;
  Total: string;
  Balance: string;
  Status: string;
  Action: string;
  position: number;
}

@Component({
  selector: 'app-invoices-component',
  templateUrl: './invoices-component.component.html',
  styleUrls: ['./invoices-component.component.less']
})
export class InvoicesComponentComponent implements OnInit {
  title="Invoices";
  status= [
    {value: 'Transfered', viewValue: 'transfered'},
    {value: 'Submitted', viewValue: 'Submitted'},
    {value: 'Accepted', viewValue: 'Accepted'},
    {value: 'Declined', viewValue: 'Declined'}
  ];
  public dataSource: MatTableDataSource<PeriodicElement>;
  constructor(private _bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    
    this.handlePage({pageSize:"10",pageIndex:"0"});
   
   //this.dataSource.paginator = this.paginator;
  }
  
  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  displayedColumns: string[] = ["Number","BlockchainTransactionID","Date","DueDate","Customer","Total", "Balance", 'BlockchainStatus','star'];
  //bills: PeriodicElement[]=this.Paginator(json,1,4).data;
  //dataSource = new MatTableDataSource<PeriodicElement>(this.bills); 
  
  selection = new SelectionModel<PeriodicElement>(true, []);
 
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  Paginator(items, page, per_page) { 
    var page = page || 1,
    per_page = per_page || 10,
    offset = (page - 1) * per_page,
   
    paginatedItems = items.slice(offset).slice(0, per_page),
    total_pages = Math.ceil(items.length / per_page);
    return {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: (total_pages > page) ? page + 1 : null,
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems
    };
  }

  public handlePage(e: any) {
    let pagesize = e.pageSize;
    let pagenumber = e.pageIndex + 1;
    let data = this.Paginator(json,pagenumber,pagesize);
    this.dataSource = new MatTableDataSource<PeriodicElement>(data.data);
  }
  openBottomSheet(): void {
    
    const sheetConfig = new MatBottomSheetConfig();
    sheetConfig.panelClass="invoicebottomsheet";

    this._bottomSheet.open(BottomSheetOverviewExampleSheetComponent,sheetConfig);
  }

}
