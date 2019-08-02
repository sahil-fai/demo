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
  MatBottomSheet,
  MatBottomSheetRef,
  MatBottomSheetConfig
} from '@angular/material/bottom-sheet';
import {
  BottomSheetOverviewExampleSheetComponent
} from 'src/app/Shared/bottom-sheet-overview-example-sheet/bottom-sheet-overview-example-sheet.component';
import { BusinessService } from '../../../services/business-service/business.service';
import { HelperService } from 'src/app/services/helper-service/helper.service.js';
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
  title = "Invoices";
  status = [{
      value: 'Transfered',
      viewValue: 'transfered'
    },
    {
      value: 'Submitted',
      viewValue: 'Submitted'
    },
    {
      value: 'Accepted',
      viewValue: 'Accepted'
    },
    {
      value: 'Declined',
      viewValue: 'Declined'
    }
  ];
  public dataSource: MatTableDataSource < PeriodicElement > ;

  //ngx pagination setup
  invoices;
  totalRec: number;
  page: number = 1;
  length: number;
  public maxSize: number = 3;
  public directionLinks: boolean = true;
  public autoHide: boolean = true;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: 'Prev',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };
  public pageNumber = 1;
  public numberOfpages: number[];
  public size = 100;
  public pageIndex = 0;
  public config = {
    itemsPerPage: this.size,
    currentPage: 1,
    totalItems: this.totalRec
  };
  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  displayedColumns: string[] = ['Number',
  'BlockchainTransactionID', 'Date', 'DueDate', 'Customer', 'Total', 'Balance', 'star'];
  // displayedColumns: string[] = ['Number',
 // 'BlockchainTransactionID', 'Date', 'DueDate', 'Customer', 'Total', 'Balance', 'BlockchainStatus', 'star'];

  selection = new SelectionModel < PeriodicElement > (true, []);
  invoice: string;
  constructor(private _bottomSheet: MatBottomSheet, public businessService: BusinessService, private helper: HelperService) {
   // this.invoices = json;
   // this.totalRec = this.invoices.length;
  }

  ngOnInit() {
    const companyid = Number(this.helper.getcompanyId());
    this.getinvoices(companyid);
  }

  public getinvoices(companyid:number) {
    this.businessService.getAllInvoices(companyid).subscribe(
      res => {
        this.invoices = res;
        this.totalRec = this.invoices.length;
        this.handlePage({
          pageSize: this.size,
          pageIndex: this.pageIndex
        });
      });
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
  public handlePage(event: any) {
    this.pageIndex = event;
    let data = this.Paginator(this.invoices, this.pageIndex, this.size);
    this.dataSource = new MatTableDataSource < PeriodicElement > (data.data);
  }

  openBottomSheet(res, invoicenumber, companyblockchainid): void {
    const sheetConfig = new MatBottomSheetConfig();
    sheetConfig.panelClass = 'invoicebottomsheet';
    sheetConfig.data = [res, invoicenumber, companyblockchainid];
    this._bottomSheet.open(BottomSheetOverviewExampleSheetComponent, sheetConfig);
  }


}
