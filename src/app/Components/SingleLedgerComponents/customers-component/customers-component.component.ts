import {
  SelectionModel
} from '@angular/cdk/collections';
import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatTableDataSource
} from '@angular/material/table';
import json from './res.json';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  BusinessService
} from '../../../services/business-service/business.service';
import {
  HelperService
} from '../../../services/helper-service/helper.service';
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
  selector: 'app-customers-component',
  templateUrl: './customers-component.component.html',
  styleUrls: ['./customers-component.component.less']
})
export class CustomersComponentComponent implements OnInit {
  title = 'Customers';
  public dataSource: MatTableDataSource < PeriodicElement > ;
  selected = ['Active'];

  status = [{
      value: 'Active',
      viewValue: 'Active'
    },
    {
      value: 'Inactive',
      viewValue: 'Inactive'
    }
  ];
  StatusList = ['Invite', 'Resend Mail'];
  customers: any;
  Totalrec: any;
  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  constructor(public BusinessService: BusinessService, private helper: HelperService) {}
  ngOnInit() {
    const companyid = Number(this.helper.getcompanyId());
    this.BusinessService.getAllCustomers(companyid).subscribe(res => {
      this.Totalrec = res.length;
      if (res.length > 0) {
        this.customers = res;
        this.handlePage({
          pageSize: '10',
          pageIndex: '0'
        });
      }
    });
  }

  displayedColumns: string[] = ['select', "CustomerName", "ContactEmail", "RegisterDate", "Organizaton", "Status", "BlockChainID", "Invite", 'star'];
  selection = new SelectionModel < PeriodicElement > (true, []);
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if (this.dataSource && this.dataSource.data.length > 0) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
    return null;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row ?: PeriodicElement): string {
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
    console.log(e)
    let pagesize = e.pageSize;
    let pagenumber = e.pageIndex + 1;
    let data = this.Paginator(this.customers, pagenumber, pagesize);
    this.dataSource = new MatTableDataSource < PeriodicElement > (this.customers);
  }

}
