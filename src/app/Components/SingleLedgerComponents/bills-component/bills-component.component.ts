import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit, ViewChild, } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import json from './res.json';
import { MatPaginator } from '@angular/material/paginator';
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
const bills: PeriodicElement[]=json;
@Component({
  selector: 'app-bills-component',
  templateUrl: './bills-component.component.html',
  styleUrls: ['./bills-component.component.less']
})
export class BillsComponentComponent implements OnInit {
  title="Bills";
  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
   
  }
  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  displayedColumns: string[] = ['select',"Number","Date","DueDate","Vendor","Total", "Balance","Status","Action", 'star'];
  dataSource = new MatTableDataSource<PeriodicElement>(bills); 
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

}
